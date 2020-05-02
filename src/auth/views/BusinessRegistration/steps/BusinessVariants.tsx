import placeholderImg from '@assets/images/placeholder255x255.png';
import DialogContentText from '@material-ui/core/DialogContentText';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import ActionDialog from '@saleor/components/ActionDialog';
import { WindowTitle } from '@saleor/components/WindowTitle';
import useBulkActions from '@saleor/hooks/useBulkActions';
import useNotifier from '@saleor/hooks/useNotifier';
import { commonMessages } from '@saleor/intl';
import { getMutationState, maybe } from '@saleor/misc';
import ProductUpdateOperations from '@saleor/products/containers/ProductUpdateOperations';
import { TypedProductDetailsQuery } from '@saleor/products/queries';
import { ProductImageCreate, ProductImageCreateVariables } from '@saleor/products/types/ProductImageCreate';
import { ProductUpdate as ProductUpdateMutationResult } from '@saleor/products/types/ProductUpdate';
import { ProductVariantBulkCreate } from '@saleor/products/types/ProductVariantBulkCreate';
import { ProductVariantBulkDelete } from '@saleor/products/types/ProductVariantBulkDelete';
import { ProductUrlQueryParams } from '@saleor/products/urls';
import { createImageReorderHandler, createImageUploadHandler } from '@saleor/products/views/ProductUpdate/handlers';
import { ProductVariantBulkCreateInput } from '@saleor/types/globalTypes';
import React, { useEffect } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import * as AdminClient from '../../../../fetch/adminClient';
import { BusinessVariantsPage } from '../components/BusinessVariantsPage';
import CardVariantCreateDialog from '../components/CardVariantCreateDialog';

interface BusinessVariantsProps {
  id: string;
  adminBusinessId: string;
  params?: ProductUrlQueryParams;
  moveNextPage: () => void;
}

export const BusinessVariants: React.StatelessComponent<BusinessVariantsProps> = ({
  id,
  params,
  adminBusinessId,
  moveNextPage
}) => {
  const notify = useNotifier();
  const intl = useIntl();

  const [ dialogState, setDialogState ] = React.useState<'create-variants' | 'remove-variants' | ''>('');
  const [ loadingState, setLoadingState ] = React.useState(false);
  const [ discountValue, selectDiscountValue ] = React.useState(0);
  const { isSelected, listElements, reset, toggle, toggleAll } = useBulkActions(
    params.ids
  );
  useEffect(() => {
    setTimeout(() => {
      document.querySelector("#content-panel").scrollTo({ top: 0, behavior: 'smooth'});
    }, 100);
  }, []);

  return (
    <TypedProductDetailsQuery 
      displayLoader 
      require={["product"]} 
      variables={{ id }}>
      {({ data, loading, refetch } ) => {
        const handleUpdate = (data: ProductUpdateMutationResult) => {
          if (data.productUpdate.errors.length === 0) {
            notify({
              text: intl.formatMessage(commonMessages.savedChanges)
            });
          } else {
            const attributeError = data.productUpdate.errors.find(
              err => err.field === "attributes"
            );
            if (!!attributeError) {
              notify({ text: attributeError.message });
            }
          }
        }

        const handleImageCreate = (data: ProductImageCreate) => {
          const imageError = data.productImageCreate.errors.find(
            error =>
              error.field ===
              ("image" as keyof ProductImageCreateVariables)
          );
          if (imageError) {
            notify({
              text: imageError.message
            });
          }
        };

        const handleImageDeleteSuccess = () =>
          notify({
            text: intl.formatMessage(commonMessages.savedChanges)
          });

        const handleVariantAdd = () =>
          setDialogState('create-variants');
        
        const handleBulkProductVariantCreate = (
          data: ProductVariantBulkCreate
        ) => {
          if (data.productVariantBulkCreate.errors.length === 0) {
            refetch();
          }
        };

        const handleBulkProductVariantDelete = (
          data: ProductVariantBulkDelete
        ) => {
          if (data.productVariantBulkDelete.errors.length === 0) {
            reset();
            refetch();
          }
        };

        const handleVariantCreatorOpen = () =>
          setDialogState('create-variants');

        const product = data ? data.product : null;

        return (
          <ProductUpdateOperations
            product={product}
            onBulkProductVariantCreate={handleBulkProductVariantCreate}
            onBulkProductVariantDelete={handleBulkProductVariantDelete}
            onImageCreate={handleImageCreate}
            onImageDelete={handleImageDeleteSuccess}
            onUpdate={handleUpdate}
          >
            {({ 
              bulkProductVariantCreate,
              bulkProductVariantDelete,
              createProductImage,
              deleteProduct,
              deleteProductImage,
              reorderProductImages,
              updateProduct,
              updateSimpleProduct
            }) => {
              const handleImageDelete = (id: string) => () =>
                deleteProductImage.mutate({ id });

              const handleSubmit = async () => {
                const images = maybe(() => product.images, []);
                const variants = maybe(() => product.variants, [])
                const voucherOptions = variants.map((variant) => {
                  return {
                    value: variant.priceOverride.amount,
                    variantId: variant.id,
                    discount: discountValue / 100,
                    createdAt: Date.now()
                  }
                });
                const imageUrls = images.map((img) => img.url);

                const patchBody = { 
                  body: [
                    { op: 'add', value: imageUrls, field: 'images'}, 
                    { op: 'add', value: voucherOptions, field: 'voucherOptions'}
                  ]
                };
                setLoadingState(true);
                await AdminClient.put(`business/${adminBusinessId}`, patchBody);
                setLoadingState(false);
                moveNextPage();
              };

              const handleCreateVariants = (inputs: ProductVariantBulkCreateInput[]) => {

                if (!inputs || inputs.length === 0) {
                  notify({ text: 'Por favor crea tus Tarjetas Bacán para continuar'});
                  return;
                }
                const images = maybe(() => product.images, []);

                if (images.length === 0) {
                  notify({ text: 'Por favor carga por lo menos una imagen de tu negocio'});
                  return;
                }

                bulkProductVariantCreate.mutate({
                  id,
                  inputs
                });
              }
              const handleImageUpload = createImageUploadHandler(
                id,
                createProductImage.mutate
              );
              const handleImageReorder = createImageReorderHandler(
                product,
                reorderProductImages.mutate
              );
              const disableFormSave =
                createProductImage.opts.loading ||
                deleteProduct.opts.loading ||
                reorderProductImages.opts.loading ||
                updateProduct.opts.loading ||
                loading;

              const formTransitionState = getMutationState(
                  updateProduct.opts.called ||
                    updateSimpleProduct.opts.called ||
                    bulkProductVariantCreate.opts.called,
                  updateProduct.opts.loading ||
                    updateSimpleProduct.opts.loading ||
                    bulkProductVariantCreate.opts.loading || loadingState,
                  maybe(
                    () => updateProduct.opts.data.productUpdate.errors
                  ),
                  maybe(
                    () =>
                      updateSimpleProduct.opts.data.productUpdate.errors
                  ),
                  maybe(
                    () =>
                      updateSimpleProduct.opts.data.productVariantUpdate
                        .errors
                  )
              );
              const errors = maybe(
                () => updateProduct.opts.data.productUpdate.errors,
                []
              );
              const bulkProductVariantDeleteTransitionState = getMutationState(
                bulkProductVariantDelete.opts.called,
                bulkProductVariantDelete.opts.loading,
                maybe(
                  () =>
                    bulkProductVariantDelete.opts.data
                      .productVariantBulkDelete.errors
                )
              );

              return (
                <>
                  <WindowTitle title={maybe(() => data.product.name)} />
                  <BusinessVariantsPage 
                    disabled={disableFormSave}
                    errors={errors}
                    saveButtonBarState={formTransitionState}
                    images={maybe(() => data.product.images)}
                    header={maybe(() => product.name)}
                    placeholderImage={placeholderImg}
                    product={product}
                    variants={maybe(() => product.variants)}
                    onImageReorder={handleImageReorder}
                    onSubmit={() => {
                      handleSubmit();
                    }}
                    onVariantAdd={handleVariantAdd}
                    onVariantsAdd={handleVariantCreatorOpen}
                    onImageUpload={handleImageUpload}
                    onImageEdit={() => null}
                    onImageDelete={handleImageDelete}
                    toolbar={
                      <IconButton
                        color="primary"
                        onClick={() =>
                          setDialogState('remove-variants')
                        }
                      >
                        <DeleteIcon />
                      </IconButton>
                    }
                    isChecked={isSelected}
                    selected={listElements.length}
                    toggle={toggle}
                    toggleAll={toggleAll}
                  />
                  <ActionDialog
                    open={dialogState === "remove-variants"}
                    onClose={() => setDialogState('')}
                    confirmButtonState={
                      bulkProductVariantDeleteTransitionState
                    }
                    onConfirm={() =>
                      bulkProductVariantDelete.mutate({
                        ids: params.ids
                      })
                    }
                    variant="delete"
                    title={intl.formatMessage({
                      defaultMessage: "Delete Product Variants",
                      description: "dialog header"
                    })}
                  >
                    <DialogContentText>
                      <FormattedMessage
                        defaultMessage="Estás seguro que quieres eliminar {counter, plural, esta {this variant} otra {{displayQuantity} tarjetas}}?"
                        description="dialog content"
                        values={{
                          counter: maybe(() => params.ids.length),
                          displayQuantity: (
                            <strong>
                              {maybe(() => params.ids.length)}
                            </strong>
                          )
                        }}
                      />
                    </DialogContentText>
                  </ActionDialog>
                  <CardVariantCreateDialog 
                    errors={maybe(
                      () =>
                        bulkProductVariantCreate.opts.data
                          .productVariantBulkCreate.bulkProductErrors,
                      []
                    )}
                    saveButtonBarState={formTransitionState}
                    onSelectDiscountValue={selectDiscountValue}
                    productId={id}
                    open={dialogState === "create-variants"}
                    attributes={maybe(
                      () => data.product.productType.variantAttributes,
                      []
                    )}
                    onClose={() => setDialogState('')}
                    onSubmit={handleCreateVariants}
                  />
                </>
              )
            }}
          </ProductUpdateOperations>
        );
      }}

    </TypedProductDetailsQuery>
  )
}
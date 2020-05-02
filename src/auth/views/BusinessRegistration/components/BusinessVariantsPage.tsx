import { createStyles, Theme, WithStyles, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AppHeader from '@saleor/components/AppHeader';
import CardSpacer from '@saleor/components/CardSpacer';
import ConfirmButton, { ConfirmButtonTransitionState } from '@saleor/components/ConfirmButton';
import Container from '@saleor/components/Container';
import Form from '@saleor/components/Form';
import Grid from '@saleor/components/Grid';
import PageHeader from '@saleor/components/PageHeader';
import { sectionNames } from '@saleor/intl';
import { maybe } from '@saleor/misc';
import ProductImages from '@saleor/products/components/ProductImages';
import ProductVariants from '@saleor/products/components/ProductVariants';
import {
  ProductDetails_product,
  ProductDetails_product_images,
  ProductDetails_product_variants,
} from '@saleor/products/types/ProductDetails';
import { getProductUpdatePageFormData, ProductUpdatePageFormData } from '@saleor/products/utils/data';
import { ListActions, UserError } from '@saleor/types';
import React from 'react';
import { useIntl } from 'react-intl';

export interface BusinessVariantsPageProps extends ListActions, WithStyles<typeof styles> {
  errors: UserError[];
  placeholderImage: string;
  disabled: boolean;
  variants: ProductDetails_product_variants[];
  images: ProductDetails_product_images[];
  product: ProductDetails_product;
  header: string;
  saveButtonBarState: ConfirmButtonTransitionState;
  onVariantsAdd: () => void;
  onImageDelete: (id: string) => () => void;
  onBack?();
  onImageEdit?(id: string);
  onImageReorder?(event: { oldIndex: number; newIndex: number });
  onImageUpload(file: File);
  onSeoClick?();
  onSubmit?(data: ProductUpdatePageFormData);
  onVariantAdd?();
}

const styles = (theme: Theme) =>
  createStyles({
    buttonContainer: {
      display: "flex",
      justifyContent: "space-between",
      paddingTop: theme.spacing.unit * 2,
      paddingBottom: theme.spacing.unit * 2
    },
    nexButton: {
      width: 140
    }
  });


const BusinessVariantsPageComp: React.FC<BusinessVariantsPageProps> = ({
  classes,
  disabled,
  errors: userErrors,
  images,
  header,
  placeholderImage,
  product,
  saveButtonBarState,
  variants,
  onBack,
  onImageDelete,
  onImageEdit,
  onImageReorder,
  onImageUpload,
  onSubmit,
  onVariantAdd,
  onVariantsAdd,
  isChecked,
  selected,
  toggle,
  toggleAll,
  toolbar,
}) => {
  const intl = useIntl();
  const initialData = { 
    ...getProductUpdatePageFormData(product, variants), 
    discountValue: 0.1
  };

  const handleSubmit = (data: ProductUpdatePageFormData) => {
    onSubmit({
      ...data
    });
  }
  const hasVariants = maybe(() => product.productType.hasVariants, false);

  return (
    <Form
      onSubmit={handleSubmit}
      errors={userErrors}
      initial={initialData}
    >
      {({
        submit,
      }) => {
        return (
          <>
            <Container>
              <AppHeader onBack={onBack}>
                {intl.formatMessage(sectionNames.products)}
              </AppHeader>
              <PageHeader title={header} />
              <Grid>
                <div>
                  <ProductImages
                    images={images}
                    placeholderImage={placeholderImage}
                    onImageDelete={onImageDelete}
                    onImageReorder={onImageReorder}
                    onImageEdit={onImageEdit}
                    onImageUpload={onImageUpload}
                    title={"Imágenes"}
                  />
                  <CardSpacer />
                  <Typography variant="subtitle1">
                   Tu logo y las fotos que subas te ayudarán a promocionar tu negocio en la plataforma. 
                   Procura subir fotos de alta calidad y tu logo en formato png. 
                   Te sugerimos subir fotos de tus locales, productos y del equipo que hace tu Negocio Bacán. 
                   Necesitamos logos en alta resolución y con fondo transparente, fotos de tus puntos de venta y fotos geniales que nos muestren el Equipo Bacán que está detras de todo.
                  </Typography>
                  <CardSpacer />
                  {hasVariants && <ProductVariants
                    disabled={disabled}
                    variants={variants}
                    fallbackPrice={product ? product.basePrice : undefined}
                    onRowClick={() => null}
                    onVariantAdd={onVariantAdd}
                    onVariantsAdd={onVariantsAdd}
                    toolbar={toolbar}
                    isChecked={isChecked}
                    selected={selected}
                    toggle={toggle}
                    toggleAll={toggleAll}
                  /> }
                </div>
              </Grid>
              <div className={classes.buttonContainer}>
                <div/>
                  <ConfirmButton
                    className={classes.nexButton}
                    transitionState={saveButtonBarState}
                    data-tc="submit"
                    onClick={submit}
                    disabled={disabled}
                  >
                    Siguiente
                  </ConfirmButton>
              </div>
            </Container>
          </>
        )
      }}
    </Form>
  )
}

export const BusinessVariantsPage = withStyles(styles, { name: 'BusinessVariantsPageComp'})(BusinessVariantsPageComp);
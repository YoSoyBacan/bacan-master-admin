import { WindowTitle } from '@saleor/components/WindowTitle';
import SearchCategories from '@saleor/containers/SearchCategories';
import SearchProductTypes from '@saleor/containers/SearchProductTypes';
import useNotifier from '@saleor/hooks/useNotifier';
import useShop from '@saleor/hooks/useShop';
import { TypedProductCreateMutation } from '@saleor/products/mutations';
import { ProductCreate } from '@saleor/products/types/ProductCreate';
import React from 'react';
import { useIntl } from 'react-intl';

import { DEFAULT_INITIAL_SEARCH_DATA } from '../../../../config';
import { decimal, getMutationState, maybe } from '../../../../misc';
import CreateBusinessComponent, { CreateBusinessSubmitData } from '../components/CreateBusiness';

// Globals
const SAMPLE_STOCK_QUANTITY = 100000;
const SAMPLE_PRICE = 100;
interface BusinessDetailsProps {
  moveNextPage: () => void;
  moveBackPage: () => void;
}

export const BusinessDetailsStep: React.StatelessComponent<
  BusinessDetailsProps
> = ({ moveNextPage, moveBackPage }) => {
  const notify = useNotifier();
  const shop = useShop();
  const intl = useIntl();


  return (
    <SearchCategories variables={DEFAULT_INITIAL_SEARCH_DATA}>
      {({
        loadMore: loadMoreCategories,
        search: searchCategory,
        result: searchCategoryOpts
      }) => (
        <SearchProductTypes variables={DEFAULT_INITIAL_SEARCH_DATA}>
          {({
            search: searchProductTypes,
            result: searchProductTypesOpts
          }) => {
            const handleSuccess = (data: ProductCreate) => {
              if (data.productCreate.errors.length === 0) {
                notify({
                  text: intl.formatMessage({
                    defaultMessage: "Esblecimiento creado"
                  })
                });
                moveNextPage();
              } else {
                const attributeError = data.productCreate.errors.find(
                  err => err.field === "attributes"
                );
                if (!!attributeError) {
                  notify({ text: attributeError.message });
                }
              }
            };

            return (
              <TypedProductCreateMutation onCompleted={handleSuccess}>
                {(
                  productCreate,
                  {
                    called: productCreateCalled,
                    data: productCreateData,
                    loading: productCreateDataLoading
                  }
                ) => {
                  const handleSubmit = (
                    formData: CreateBusinessSubmitData
                  ) => {
                    const productTypes = maybe(() =>
                      searchProductTypesOpts.data.search.edges.map(
                        edge => edge.node
                      )
                    );
                    // TODO[sebastian]: This is only choosing one product type now.
                    const chosenProduct = productTypes.find((product) => product.name === 'Tarjeta de Consumo');

                    productCreate({
                      variables: {
                        attributes: formData.attributes.map(attribute => ({
                          id: attribute.id,
                          values: attribute.value
                        })),                        
                        basePrice: decimal(SAMPLE_PRICE),
                        category: formData.category,
                        chargeTaxes: true,
                        collections: [],
                        descriptionJson: JSON.stringify(
                          formData.description
                        ),
                        isPublished: false,
                        name: formData.name,
                        productType: chosenProduct.id,
                        publicationDate: null,
                        sku: Math.random().toString(36).substr(2, 15),
                        stockQuantity: SAMPLE_STOCK_QUANTITY
                      }
                    });
                  };

                  const formTransitionState = getMutationState(
                    productCreateCalled,
                    productCreateDataLoading,
                    maybe(() => productCreateData.productCreate.errors)
                  );
                  return (
                    <>
                      <WindowTitle
                        title={"Nuevo Establecimiento"}
                      />
                      <CreateBusinessComponent
                        currency={maybe(() => shop.defaultCurrency)}
                        categories={maybe(
                          () => searchCategoryOpts.data.search.edges,
                          []
                        ).map(edge => edge.node)}
                        disabled={productCreateDataLoading}
                        errors={maybe(
                          () => productCreateData.productCreate.errors,
                          []
                        )}
                        fetchCategories={searchCategory}
                        fetchProductTypes={searchProductTypes}
                        header={intl.formatMessage({
                          defaultMessage: "Nuevo Establecimiento",
                          description: "page header"
                        })}
                        productTypes={maybe(() =>
                          searchProductTypesOpts.data.search.edges.map(
                            edge => edge.node
                          )
                        )}
                        onBack={moveBackPage}
                        onSubmit={handleSubmit}
                        saveButtonBarState={formTransitionState}
                        fetchMoreCategories={{
                          hasMore: maybe(
                            () =>
                              searchCategoryOpts.data.search.pageInfo
                                .hasNextPage
                          ),
                          loading: searchCategoryOpts.loading,
                          onFetchMore: loadMoreCategories
                        }}
                      />
                    </>
                  );
                }}
              </TypedProductCreateMutation>
            );
          }}
        </SearchProductTypes>
      )}
    </SearchCategories>
  );
};
export default BusinessDetailsStep;

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
import { generateProductUrl } from '../../../../core/utils';
import * as AdminClient from '../../../../fetch/adminClient';
import { decimal, getMutationState, maybe } from '../../../../misc';
import CreateBusinessComponent, { CreateBusinessSubmitData } from '../components/CreateBusiness';

// Globals
const SAMPLE_STOCK_QUANTITY = 100000;
const SAMPLE_PRICE = 100;
interface BusinessDetailsProps {
  moveNextPage: () => void;
  moveBackPage: () => void;
  businessId: string;
  buenPlanBusinessId: string;
  setProductId: (id: string) => void;
  setBusinessLink: (link: string) => void;
}

export const BusinessDetailsStep: React.StatelessComponent<
  BusinessDetailsProps
> = ({ moveNextPage, moveBackPage, businessId, buenPlanBusinessId, setBusinessLink, setProductId }) => {
  const notify = useNotifier();
  const shop = useShop();
  const intl = useIntl();

  const [salesObjective, setSalesObjective ] = React.useState(0);
  const [industry, setIndustry ] = React.useState('');
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
            const handleSuccess = async (data: ProductCreate) => {
              if (data.productCreate.errors.length === 0) {
                notify({
                  text: intl.formatMessage({
                    defaultMessage: "Negocio Bacán Creado"
                  })
                });
                const patchBody = {
                  body: [
                    { op: 'add', field: 'buenPlanProviderId', value: buenPlanBusinessId }, 
                    { op: 'add', field: 'shopProviderId', value: businessId}, 
                    { op: 'add', field: 'salesObjective', value: salesObjective}, 
                    { op: 'add', field: 'industry', value: industry },
                    { op: 'add', field: 'businessLink', value: `${window.location.protocol}//${window.location.host}${generateProductUrl(data.productCreate.product.id, data.productCreate.product.name)}`},
                  ]
                };
                try {
                  const response = await AdminClient.put<{ businessLink: string }>(`business/${businessId}`, patchBody);
                  setProductId(data.productCreate.product.id);
                  setBusinessLink(response.data.businessLink);
                  moveNextPage();
                } catch(apiError) {
                  notify({ text: 'Bacán ha tenido un error inesperado, por favor intenta mas tarde' });
                }
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

                  const handleSubmit = async(
                    formData: CreateBusinessSubmitData
                  ) => {
                    const productTypes = maybe(() =>
                      searchProductTypesOpts.data.search.edges.map(
                        edge => edge.node
                      )
                    );
                    // TODO[sebastian]: This is only choosing one product type now.
                    const chosenProduct = productTypes.find((product) => product.name === 'Tarjeta de Consumo');
                    // TODO: Add BuenPlan Business ID and Bacan Admin ID
                    
                    // Create Product on Saleor
                    await productCreate({
                      variables: {
                        attributes: formData.attributes.map(attribute => ({
                          id: attribute.id,
                          values: attribute.value
                        })),                        
                        paymentPlatformId: buenPlanBusinessId,
                        adminPlatformId: businessId,
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
                        onSubmit={(formData: CreateBusinessSubmitData) => {
                          setSalesObjective(formData.salesObjective);
                          const categories = maybe(() => searchCategoryOpts.data.search.edges, []);
                          const chosenCategory = categories.find((cat) => cat.node.id === formData.category);
                          if (chosenCategory) {
                            setIndustry(chosenCategory.node.name);
                          }
                          handleSubmit(formData);
                        }}
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

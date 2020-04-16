import AppHeader from '@saleor/components/AppHeader';
import CardSpacer from '@saleor/components/CardSpacer';
import { ConfirmButtonTransitionState } from '@saleor/components/ConfirmButton';
import Container from '@saleor/components/Container';
import Form from '@saleor/components/Form';
import Grid from '@saleor/components/Grid';
import PageHeader from '@saleor/components/PageHeader';
import { SearchCategories_search_edges_node } from '@saleor/containers/SearchCategories/types/SearchCategories';
import useFormset from '@saleor/hooks/useFormset';
import useStateFromProps from '@saleor/hooks/useStateFromProps';
import { sectionNames } from '@saleor/intl';
import { ProductAttributeInput, ProductAttributeInputData } from '@saleor/products/components/ProductAttributes';
import ProductDetailsForm from '@saleor/products/components/ProductDetailsForm';
import ProductOrganization from '@saleor/products/components/ProductOrganization';
import { getChoices } from '@saleor/products/utils/data';
import createSingleAutocompleteSelectHandler from '@saleor/utils/handlers/singleAutocompleteSelectChangeHandler';
import { ContentState, convertToRaw, RawDraftContentState } from 'draft-js';
import React from 'react';
import { useIntl } from 'react-intl';

import { FetchMoreProps, UserError } from '../../../../types';


interface FormData {
  basePrice: number;
  category: string;
  description: RawDraftContentState;
  name: string;
}

export interface CreateBusinessSubmitData extends FormData {
  attributes: ProductAttributeInput[];
}

export interface CreateBusinessProps {
  errors: UserError[];
  categories: SearchCategories_search_edges_node[];
  currency: string;
  disabled: boolean;
  fetchMoreCategories: FetchMoreProps;
  productTypes?: Array<{
    id: string;
    name: string;
    hasVariants: boolean;
  }>;
  header: string;
  saveButtonBarState: ConfirmButtonTransitionState;
  fetchCategories: (data: string) => void;
  fetchProductTypes: (data: string) => void;
  onBack?();
  onSubmit?(data: FormData);
}

export const CreateBusinessComponent: React.StatelessComponent<
  CreateBusinessProps
> = ({
  disabled,
  categories: categoryChoiceList,
  errors: userErrors,
  fetchCategories,
  fetchMoreCategories,
  header,
  productTypes: productTypeChoiceList,
  onBack,
  onSubmit
}: CreateBusinessProps) => {
  const intl = useIntl();
  
  // Form values
  const {
    data: attributes,
  } = useFormset<ProductAttributeInputData>([]);

  const initialDescription = convertToRaw(ContentState.createFromText(""));
  const initialData: FormData = {
    basePrice: 0,
    category: "",
    description: {} as any,
    name: ""
  };

  // Display values

  const [selectedCategory, setSelectedCategory] = useStateFromProps("");


  const categories = getChoices(categoryChoiceList);
  const productTypes = getChoices(productTypeChoiceList);

  const handleSubmit = (data: CreateBusinessSubmitData) =>
    onSubmit({
      attributes,
      ...data
    });

  return (
    <Form
      onSubmit={handleSubmit}
      errors={userErrors}
      initial={initialData}
      confirmLeave
    >
      {({
        change,
        data,
        errors
      }) => {
        const handleCategorySelect = createSingleAutocompleteSelectHandler(
          change,
          setSelectedCategory,
          categories
        );

        return (
          <Container>
            <AppHeader onBack={onBack}>
              {intl.formatMessage(sectionNames.products)}
            </AppHeader>
            <PageHeader title={header} />
            <Grid>
              <div>
                <ProductDetailsForm
                  data={data}
                  disabled={disabled}
                  errors={errors}
                  initialDescription={initialDescription}
                  onChange={change}
                />
                <CardSpacer />
              </div>
              <div>
                <ProductOrganization
                  canChangeType={false}
                  categories={categories}
                  categoryInputDisplayValue={selectedCategory}
                  data={data}
                  disabled={disabled}
                  errors={errors}
                  fetchCategories={fetchCategories}
                  fetchMoreCategories={fetchMoreCategories}
                  productType={{ hasVariants: false, id: '15', name: 'Tarjeta de Consumo'}} // FIXME: This is fucking hard coded
                  productTypeInputDisplayValue={'Tarjeta de Consumo'}
                  productTypes={productTypes}
                  onCategoryChange={handleCategorySelect}
                />
                <CardSpacer />
              </div>
            </Grid>
          </Container>
        );
      }}
    </Form>
  );
};
CreateBusinessComponent.displayName = "CreateBusinessComponent";
export default CreateBusinessComponent;

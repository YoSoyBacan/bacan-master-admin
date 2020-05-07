import { createStyles, Theme, WithStyles, withStyles } from '@material-ui/core/styles';
import AppHeader from '@saleor/components/AppHeader';
import CardSpacer from '@saleor/components/CardSpacer';
import ConfirmButton, { ConfirmButtonTransitionState } from '@saleor/components/ConfirmButton';
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

import { FetchMoreProps } from '../../../../types';
import { SalesObjectiveCard } from './SalesObjectiveCard';


interface FormData {
  basePrice: number;
  category: string;
  description: RawDraftContentState;
  name: string;
  salesObjective: number;
}

export interface CreateBusinessSubmitData extends FormData {
  attributes: ProductAttributeInput[];
  
}

const styles = (theme: Theme) =>
  createStyles({
    buttonContainer: {
      display: "flex",
      justifyContent: "space-between",
      paddingTop: theme.spacing() * 2,
      paddingBottom: theme.spacing() * 2
    },
    nexButton: {
      width: 140
    }
  });

export interface CreateBusinessProps extends WithStyles<typeof styles>{
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

const CreateBusiness: React.StatelessComponent<
  CreateBusinessProps
> = ({
  disabled,
  categories: categoryChoiceList,
  fetchCategories,
  fetchMoreCategories,
  header,
  productTypes: productTypeChoiceList,
  onBack,
  saveButtonBarState,
  onSubmit,
  classes
}: CreateBusinessProps) => {
  const intl = useIntl();
  const [ errors ] = React.useState<Array<{field: string, message: string}>>([]);
  const [ salesObjective, setSalesObjective] = React.useState(0);
  
  // Form values
  const {
    data: attributes,
  } = useFormset<ProductAttributeInputData>([]);

  // Ensures that it will not change after component rerenders, because it
  // generates different block keys and it causes editor to lose its content.
  const initialDescription = React.useRef(
    convertToRaw(ContentState.createFromText(""))
  );  
  const initialData: FormData = {
    basePrice: 0,
    category: "",
    description: {} as any,
    name: "",
    salesObjective: 0
  };

  // Display values

  const [selectedCategory, setSelectedCategory] = useStateFromProps("");


  const categories = getChoices(categoryChoiceList);
  const productTypes = getChoices(productTypeChoiceList);

  const handleSubmit = (data: CreateBusinessSubmitData) =>
    onSubmit({
      attributes,
      ...data,
      salesObjective,
    });
  return (
    <Form
      onSubmit={handleSubmit}
      errors={errors}
      initial={initialData}
    >
      {({
        change,
        data,
        errors,
        submit
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
                <SalesObjectiveCard 
                  data={{ salesObjective }}
                  setSalesObjective={setSalesObjective}
                  errors={errors}
                />
                <CardSpacer />
                <ProductDetailsForm
                  data={data}
                  disabled={disabled}
                  errors={errors}
                  initialDescription={initialDescription.current}
                  onChange={change}
                />
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
              <div className={classes.buttonContainer}>
                <div/>
                  <ConfirmButton
                    className={classes.nexButton}
                    transitionState={saveButtonBarState}
                    data-tc="submit"
                    onClick={submit}
                  >
                    Siguiente
                  </ConfirmButton>
              </div>
          </Container>
        );
      }}
    </Form>
  );
};
const CreateBusinessComponent = withStyles(styles, { name: 'CreateBusinessComponent'})(CreateBusiness);
export default CreateBusinessComponent;

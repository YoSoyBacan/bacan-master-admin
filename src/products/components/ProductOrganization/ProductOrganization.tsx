import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { createStyles, Theme, WithStyles, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CardSpacer from '@saleor/components/CardSpacer';
import CardTitle from '@saleor/components/CardTitle';
import { FormSpacer } from '@saleor/components/FormSpacer';
import Hr from '@saleor/components/Hr';
import MultiAutocompleteSelectField, { MultiAutocompleteChoiceType } from '@saleor/components/MultiAutocompleteSelectField';
import SingleAutocompleteSelectField, {
  SingleAutocompleteChoiceType,
} from '@saleor/components/SingleAutocompleteSelectField';
import { ChangeEvent } from '@saleor/hooks/useForm';
import { maybe } from '@saleor/misc';
import { FetchMoreProps, FormErrors } from '@saleor/types';
import React from 'react';
import { useIntl } from 'react-intl';

interface ProductType {
  hasVariants: boolean;
  id: string;
  name: string;
}

const styles = (theme: Theme) =>
  createStyles({
    card: {
      overflow: "visible"
    },
    cardSubtitle: {
      fontSize: "1rem",
      marginBottom: theme.spacing() / 2
    },
    label: {
      marginBottom: theme.spacing() / 2
    }
  });

interface ProductOrganizationProps extends WithStyles<typeof styles> {
  canChangeType: boolean;
  categories?: SingleAutocompleteChoiceType[];
  categoryInputDisplayValue: string;
  collections?: MultiAutocompleteChoiceType[];
  collectionsInputDisplayValue?: MultiAutocompleteChoiceType[];
  data: {
    category: string;
    collections?: string[];
    productType?: string;
  };
  disabled: boolean;
  errors: FormErrors<"productType" | "category">;
  productType?: ProductType;
  productTypeInputDisplayValue?: string;
  productTypes?: SingleAutocompleteChoiceType[];
  fetchCategories: (query: string) => void;
  fetchCollections?: (query: string) => void;
  fetchMoreCategories: FetchMoreProps;
  fetchMoreCollections?: FetchMoreProps;
  fetchMoreProductTypes?: FetchMoreProps;
  fetchProductTypes?: (data: string) => void;
  onCategoryChange: (event: ChangeEvent) => void;
  onCollectionChange?: (event: ChangeEvent) => void;
  onProductTypeChange?: (event: ChangeEvent) => void;
}

const ProductOrganization = withStyles(styles, { name: "ProductOrganization" })(
  ({
    canChangeType,
    categories,
    categoryInputDisplayValue,
    classes,
    collections,
    collectionsInputDisplayValue,
    data,
    disabled,
    errors,
    fetchCategories,
    fetchCollections,
    fetchMoreCategories,
    fetchMoreCollections,
    fetchMoreProductTypes,
    fetchProductTypes,
    productType,
    productTypeInputDisplayValue,
    productTypes,
    onCategoryChange,
    onCollectionChange,
    onProductTypeChange
  }: ProductOrganizationProps) => {
    const intl = useIntl();

    return (
      <Card className={classes.card}>
        <CardTitle
          title={intl.formatMessage({
            defaultMessage: "Tipo de Establecimiento",
            description: "section header"
          })}
        />
        <CardContent>
          {canChangeType ? (
            <SingleAutocompleteSelectField
              displayValue={productTypeInputDisplayValue}
              error={!!errors.productType}
              helperText={errors.productType}
              name="productType"
              disabled={disabled}
              label={"Tipo de Establecimiento"}
              choices={productTypes}
              value={data.productType}
              onChange={onProductTypeChange}
              fetchChoices={fetchProductTypes}
              data-tc="product-type"
              {...fetchMoreProductTypes}
            />
          ) : (
            <>
              <Typography className={classes.label} variant="caption">
                Tipo de Producto
              </Typography>
              <Typography>{maybe(() => productType.name, "...")}</Typography>
              <CardSpacer />
              <Typography className={classes.label} variant="caption">
                Variación
              </Typography>
              <Typography>
                {maybe(
                  () =>
                    productType.hasVariants
                      ? intl.formatMessage({
                          defaultMessage: "Configurable",
                          description: "product is configurable"
                        })
                      : intl.formatMessage({
                          defaultMessage: "Simple",
                          description: "product is not configurable"
                        }),
                  "..."
                )}
              </Typography>
            </>
          )}
          <FormSpacer />
          <Hr />
          <FormSpacer />
          <SingleAutocompleteSelectField
            displayValue={categoryInputDisplayValue}
            error={!!errors.category}
            helperText={errors.category}
            disabled={disabled}
            label={intl.formatMessage({
              defaultMessage: "Industria"
            })}
            choices={disabled ? [] : categories}
            name="category"
            value={data.category}
            onChange={onCategoryChange}
            fetchChoices={fetchCategories}
            data-tc="category"
            {...fetchMoreCategories}
          />
          <FormSpacer />
          <Hr />
          <FormSpacer />
          {
            !!collections && 
            <MultiAutocompleteSelectField
              displayValues={collectionsInputDisplayValue}
              label={intl.formatMessage({
                defaultMessage: "Colecciones"
              })}
              choices={disabled ? [] : collections}
              name="collections"
              value={data.collections}
              helperText={intl.formatMessage({
                defaultMessage:
                  "*Optional. Adding product to collection helps users find it.",
                description: "field is optional"
              })}
              onChange={onCollectionChange}
              fetchChoices={fetchCollections}
              data-tc="collections"
              {...fetchMoreCollections}
            />
          }
        </CardContent>
      </Card>
    );
  }
);
ProductOrganization.displayName = "ProductOrganization";
export default ProductOrganization;

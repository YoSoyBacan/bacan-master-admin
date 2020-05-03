import { Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/styles/makeStyles';
import ControlledCheckbox from '@saleor/components/ControlledCheckbox';
import Debounce from '@saleor/components/Debounce';
import Hr from '@saleor/components/Hr';
import { ProductDetails_product_productType_variantAttributes } from '@saleor/products/types/ProductDetails';
import { isSelected } from '@saleor/utils/lists';
import React from 'react';

import { CardVariantCreateFormData } from './form';

const useStyles = makeStyles((theme: Theme) => ({
    hr: {
      marginBottom: theme.spacing.unit,
      marginTop: theme.spacing.unit / 2
    },
    valueContainer: {
      display: "grid",
      gridColumnGap: theme.spacing.unit * 3 + "px",
      gridTemplateColumns: "repeat(3, 1fr)",
      marginBottom: theme.spacing.unit * 3
    }
}));

export interface CardVariantCreateValuesProps {
  attributes: ProductDetails_product_productType_variantAttributes[];
  data: CardVariantCreateFormData;
  onValueClick: (attributeId: string, valueId: string) => void;
}
const CardVariantCreateValues: React.FC<
  CardVariantCreateValuesProps
> = (props) => {
  const { attributes, data, onValueClick } = props;
  const classes = useStyles(props);

  const attribute = attributes[0];
  const { id, values } = attribute;
  return (
    <React.Fragment>
      <Typography color="textSecondary" variant="h5">
        Valores de Tarjetas Bacán
      </Typography>
      <Hr className={classes.hr} />
      <Typography color="textSecondary" variant="subtitle1">
        Máximo 5 Opciones
      </Typography>
      <div className={classes.valueContainer}>
        {
          values.map((value) => (
            <Debounce
              debounceFn={() => onValueClick(id, value.slug)}
            >
              {change => (
                <ControlledCheckbox 
                checked={isSelected(
                  value.slug,
                  data.attributes.find(
                    dataAttribute => attribute.id === dataAttribute.id
                  ).values,
                  (a, b) => a === b
                )}
                name={`value:${value.slug}`}
                label={`$${value.name}`}
                onChange={change}
              />
              )}
          </Debounce>
          ))
        }
      </div>
      <Hr className={classes.hr} />
    </React.Fragment>
  )

}

CardVariantCreateValues.displayName = "CardVariantCreateValuesProps";
export default CardVariantCreateValues;
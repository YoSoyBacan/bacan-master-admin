import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/styles/makeStyles';
import ControlledCheckbox from '@saleor/components/ControlledCheckbox';
import Debounce from '@saleor/components/Debounce';
import Hr from '@saleor/components/Hr';
import { TypedSaleList } from '@saleor/discounts/queries';
import { ChangeEvent } from '@saleor/hooks/useForm';
import { maybe } from '@saleor/misc';
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
  onSaleSelect: (saleId: string, saleName: string, saleValue: string) => void;
}
const CardVariantCreateValues: React.FC<
  CardVariantCreateValuesProps
> = (props) => {
  const { attributes, data, onValueClick, onSaleSelect } = props;
  const classes = useStyles(props);

  const attribute = attributes[0];
  const { id, values } = attribute;
  return (
    <>
      <TypedSaleList>
        {({ data: saleListData}) => {
          const sales = maybe(() => saleListData.sales.edges.map(edge => edge.node));
          return (
            <React.Fragment>
              <Typography color="textSecondary" variant="h5">
                Valores de Tarjetas Bacán
              </Typography>
              <Hr className={classes.hr} />
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
              <Typography color="textSecondary" variant="h5">
                Descuento Seleccionado
              </Typography>
              <Hr className={classes.hr} />
              <div className={classes.valueContainer}>

                <Select
                  fullWidth
                  id="sale-select"
                  value={data.sale.id}
                  onChange={(evt: ChangeEvent) => {
                    const { value } = evt.target;
                    const selectedSale = sales.find((sel) => sel.id === value);
                    if (selectedSale) {
                      onSaleSelect(selectedSale.id, selectedSale.name, String(selectedSale.value));
                    }
                  }}
                >
                  {
                    sales.map(({ id, name }) => (
                      <MenuItem value={id} key={id}>
                        {name}
                      </MenuItem>
                    ))
                  }
                </Select>
              </div>
          </React.Fragment>
          )
        }}
      </TypedSaleList>
    </>
  )

}

CardVariantCreateValues.displayName = "CardVariantCreateValuesProps";
export default CardVariantCreateValues;
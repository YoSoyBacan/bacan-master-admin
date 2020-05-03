import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/styles/makeStyles';
import Hr from '@saleor/components/Hr';
import { TypedSaleList } from '@saleor/discounts/queries';
import { ChangeEvent } from '@saleor/hooks/useForm';
import { maybe } from '@saleor/misc';
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


export interface CardVariantSelectDiscountProps {
  onSaleSelect: (saleId: string, saleName: string, saleValue: string) => void;
  data: CardVariantCreateFormData;
};

const CardVariantSelectDiscount: React.FC<CardVariantSelectDiscountProps> = (props) => {
  const classes = useStyles(props);
  const {  data, onSaleSelect } = props;
  return (
    <>
      <TypedSaleList displayLoader variables={{ first: 20 }}>
        {({ data: saleListData }) => {
          const sales = maybe(() => saleListData.sales.edges.map(edge => edge.node), []);
          return (
            <React.Fragment>
              <Typography color="textSecondary" variant="h5">
                Descuento
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

CardVariantSelectDiscount.displayName = "CardVariantSelectDiscount";
export default CardVariantSelectDiscount;
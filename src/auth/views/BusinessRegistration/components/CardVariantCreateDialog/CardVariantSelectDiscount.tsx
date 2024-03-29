import { Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/styles/makeStyles';
import Hr from '@saleor/components/Hr';
import SingleSelectField from '@saleor/components/SingleSelectField';
import { TypedSaleList } from '@saleor/discounts/queries';
import { ChangeEvent } from '@saleor/hooks/useForm';
import { maybe } from '@saleor/misc';
import React from 'react';

import { CardVariantCreateFormData } from './form';

const useStyles = makeStyles((theme: Theme) => ({
  hr: {
    marginBottom: theme.spacing(),
    marginTop: theme.spacing() / 2,
    paddingBottom: theme.spacing()
  },
  title: {
    paddingBottom: theme.spacing() * 2
  },
  valueContainer: {
    display: "grid",
    gridColumnGap: theme.spacing() * 3 + "px",
    gridTemplateColumns: "repeat(2, 1fr)",
    marginBottom: theme.spacing() * 3
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
              <Typography color="textSecondary" variant="h5" className={classes.title}>
                Descuento
              </Typography>
              <Hr className={classes.hr} />
              <div className={classes.valueContainer}>

                <SingleSelectField
                  value={data.sale.id}
                  onChange={(evt: ChangeEvent) => {
                    const { value } = evt.target;
                    const selectedSale = sales.find((sel) => sel.id === value);
                    if (selectedSale) {
                      onSaleSelect(selectedSale.id, selectedSale.name, String(selectedSale.value));
                    }
                  }}
                  required
                  choices={sales.map((saleItem) => ({ value: saleItem.id, label: saleItem.name }))}
                />
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
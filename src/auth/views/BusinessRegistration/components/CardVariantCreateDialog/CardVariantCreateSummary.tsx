import IconButton from '@material-ui/core/IconButton';
import { Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/styles';
import Hr from '@saleor/components/Hr';
import { maybe } from '@saleor/misc';
import {
  ProductVariantBulkCreate_productVariantBulkCreate_bulkProductErrors,
} from '@saleor/products/types/ProductVariantBulkCreate';
import classNames from 'classnames';
import React from 'react';

import { CardVariantCreateFormData } from './form';
import { VariantField } from './reducer';


const useStyles = makeStyles(
  (theme: Theme) => ({
    attributeValue: {
      display: "inline-block",
      marginRight: theme.spacing()
    },
    col: {
      ...theme.typography.body2,
      fontSize: 14,
      paddingLeft: theme.spacing(),
      paddingRight: theme.spacing()
    },
    colHeader: {
      ...theme.typography.body2,
      fontSize: 14
    },
    colName: {
      "&&": {
        paddingLeft: "0 !important"
      },
      "&:not($colHeader)": {
        paddingTop: theme.spacing() * 2
      }
    },
    colPrice: {},
    colSku: {},
    colStock: {},
    delete: {
      marginTop: theme.spacing() / 2
    },
    errorRow: {},
    hr: {
      marginBottom: theme.spacing(),
      marginTop: theme.spacing() / 2
    },
    input: {
      "& input": {
        padding: "16px 12px 17px",
        color: "black"
      },
      marginTop: theme.spacing() / 2
    },
    row: {
      borderBottom: `1px solid ${theme.palette.divider}`,
      display: "grid",
      gridTemplateColumns: "1fr 200px 220px 80px",
      padding: `${theme.spacing()}px 0`
    }
  }),
  {
    name: "CardVariantCreateSummary"
  }
);

export interface CardVariantCreateSummaryProps {
  saleValue: number;
  currencySymbol: string;
  data: CardVariantCreateFormData;
  errors: ProductVariantBulkCreate_productVariantBulkCreate_bulkProductErrors[];
  onVariantDataChange: (
    variantIndex: number,
    field: VariantField,
    value: string
  ) => void;
  onVariantDelete: (variantIndex: number) => void;
}

const CardVariantCreateSummary: React.FC<CardVariantCreateSummaryProps> = props => {
  const {
    saleValue,
    currencySymbol,
    data,
    errors,
    onVariantDataChange,
    onVariantDelete
  } = props;
  const classes = useStyles(props);
  return (
    <>
      <Typography color="textSecondary" variant="h5">
        Tus Tarjetas Bacán
      </Typography>
      <Hr className={classes.hr} />
      <div>
        <div className={classes.row}>
          <div
            className={classNames(
              classes.col,
              classes.colHeader,
              classes.colName
            )}
          >
            Valor Tarjeta
          </div>
          <div
            className={classNames(
              classes.col,
              classes.colHeader,
              classes.colName
            )}
          >
            {`Precio (-${saleValue}%)`}
          </div>
          <div
            className={classNames(
              classes.col,
              classes.colHeader,
              classes.colName
            )}
          >
            Código de Tarjeta
          </div>
        </div>
        {data.variants.map((variant, variantIndex) => {
          const variantErrors = errors.filter(
            error => error.index === variantIndex
          );

          const price = maybe(() => `${Number(variant.priceOverride).toFixed(2)}`, '0');
          return (
            <div
              className={classNames(classes.row, {
                [classes.errorRow]: variantErrors.length > 0
              })}
              key={variant.attributes
                .map(attribute => attribute.values[0])
                .join(":")}
            >
              <div className={classNames(classes.col, classes.colPrice)}>
                <TextField
                  InputProps={{
                    endAdornment: currencySymbol
                  }}
                  className={classes.input}
                  error={
                    !!variantErrors.find(
                      error => error.field === "priceOverride"
                    )
                  }
                  fullWidth
                  helperText={"Cliente Redime"}
                  value={`$${price}`}
                  onChange={event =>
                    onVariantDataChange(
                      variantIndex,
                      "price",
                      event.target.value
                    )
                  }
                  disabled
                />
              </div>
              <div className={classNames(classes.col, classes.colPrice)}>
                <TextField
                  InputProps={{
                    endAdornment: currencySymbol
                  }}
                  className={classes.input}
                  error={
                    !!variantErrors.find(
                      error => error.field === "priceOverride"
                    )
                  }
                  helperText={"Cliente Paga"}
                  fullWidth
                  value={maybe(() => `$${(Number(price) * (1 - (saleValue / 100))).toFixed(2)}`, '0')}
                  disabled
                />
              </div>
              <div className={classNames(classes.col, classes.colSku)}>
                <TextField
                  className={classes.input}
                  error={!!variantErrors.find(error => error.field === "sku")}
                  helperText={"SKU"}
                  fullWidth
                  value={variant.sku}
                  disabled
                />
              </div>
              <div className={classes.col}>
                <IconButton
                  className={classes.delete}
                  color="primary"
                  onClick={() => onVariantDelete(variantIndex)}
                >
                  <DeleteIcon />
                </IconButton>
              </div>
            </div>
          );
        })}
      </div>
    </>
  )
}

CardVariantCreateSummary.displayName = "CardVariantCreateSummary";
export default CardVariantCreateSummary;
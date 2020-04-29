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
      marginRight: theme.spacing.unit
    },
    col: {
      ...theme.typography.body2,
      fontSize: 14,
      paddingLeft: theme.spacing.unit,
      paddingRight: theme.spacing.unit
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
        paddingTop: theme.spacing.unit * 2
      }
    },
    colPrice: {},
    colSku: {},
    colStock: {},
    delete: {
      marginTop: theme.spacing.unit / 2
    },
    errorRow: {},
    hr: {
      marginBottom: theme.spacing.unit,
      marginTop: theme.spacing.unit / 2
    },
    input: {
      "& input": {
        padding: "16px 12px 17px"
      },
      marginTop: theme.spacing.unit / 2
    },
    row: {
      borderBottom: `1px solid ${theme.palette.divider}`,
      display: "grid",
      gridTemplateColumns: "1fr 180px 120px 180px 64px",
      padding: `${theme.spacing.unit}px 0`
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
            Precio Tarjeta Bacán
          </div>
          <div
            className={classNames(
              classes.col,
              classes.colHeader,
              classes.colName
            )}
          >
            {`Precio a Pagar -${saleValue}%`}
          </div>
          <div
            className={classNames(
              classes.col,
              classes.colHeader,
              classes.colSku
            )}
          >
            Código de Tarjeta
          </div>
        </div>
        {data.variants.map((variant, variantIndex) => {
          const variantErrors = errors.filter(
            error => error.index === variantIndex
          );

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
                  helperText={maybe(
                    () =>
                      variantErrors.find(
                        error => error.field === "priceOverride"
                      ).message
                  )}
                  inputProps={{
                    min: 0,
                    type: "number"
                  }}
                  fullWidth
                  value={variant.priceOverride}
                  onChange={event =>
                    onVariantDataChange(
                      variantIndex,
                      "price",
                      event.target.value
                    )
                  }
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
                  helperText={"Precio que pagará el cliente"}
                  inputProps={{
                    min: 0,
                    type: "number"
                  }}
                  fullWidth
                  value={`${(Number(variant.priceOverride) * (1.0 - saleValue)).toFixed(2)}`}
                  disabled
                />
              </div>
              <div className={classNames(classes.col, classes.colSku)}>
                <TextField
                  className={classes.input}
                  error={!!variantErrors.find(error => error.field === "sku")}
                  helperText={maybe(
                    () =>
                      variantErrors.find(error => error.field === "sku").message
                  )}
                  fullWidth
                  value={variant.sku}
                  onChange={event =>
                    onVariantDataChange(variantIndex, "sku", event.target.value)
                  }
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
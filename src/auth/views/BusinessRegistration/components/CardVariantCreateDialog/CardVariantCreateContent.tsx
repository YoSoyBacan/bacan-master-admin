import { Theme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';
import { ProductDetails_product_productType_variantAttributes } from '@saleor/products/types/ProductDetails';
import {
  ProductVariantBulkCreate_productVariantBulkCreate_bulkProductErrors,
} from '@saleor/products/types/ProductVariantBulkCreate';
import { isSelected } from '@saleor/utils/lists';
import React from 'react';

import CardVariantCreateSummary from './CardVariantCreateSummary';
import CardVariantCreateTabs from './CardVariantCreateTabs';
import CardVariantCreateValues from './CardVariantCreateValues';
import CardVariantCreteDiscount from './CardVariantSelectDiscount';
import { CardVariantCreateFormData } from './form';
import { CardVariantCreateReducerAction } from './reducer';
import { CardVariantCreateStep } from './types';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    maxHeight: 400,
    overflowX: "hidden",
    overflowY: "scroll",
    paddingLeft: theme.spacing() * 3,
    paddingRight: theme.spacing() * 2,
    position: "relative",
    right: theme.spacing() * 3,
    width: `calc(100% + ${theme.spacing() * 3}px)`
  }
}));

export interface CardVariantCreateContentProps {
  attributes: ProductDetails_product_productType_variantAttributes[];
  data: CardVariantCreateFormData;
  dispatchFormDataAction: React.Dispatch<CardVariantCreateReducerAction>;
  errors: ProductVariantBulkCreate_productVariantBulkCreate_bulkProductErrors[];
  step: CardVariantCreateStep;
  onStepClick: (step: CardVariantCreateStep) => void;
}

const CardVariantCreateContent: React.FC<CardVariantCreateContentProps> = ({
  attributes,
  data,
  dispatchFormDataAction,
  errors,
  step,
  onStepClick
}) => {
  const classes = useStyles({});
  const selectedAttributes = attributes.filter(attribute =>
    isSelected(
      attribute.id,
      data.attributes.map(dataAttribute => dataAttribute.id),
      (a, b) => a === b
    )
  );
  return (
    <div>
      <CardVariantCreateTabs step={step} onStepClick={onStepClick} />
      <div className={classes.root}>
        {
          step === "values" && (
            <CardVariantCreateValues 
              attributes={selectedAttributes}
              data={data}
              onValueClick={(attributeId, valueId) => (
                dispatchFormDataAction({
                  attributeId,
                  type: "selectValue",
                  valueId
                })
              )}

            />
          )
        }
        {
          step === "discount" && (
            <CardVariantCreteDiscount
              data={data}
              onSaleSelect={(attributeId, valueId, value) => (
                dispatchFormDataAction({
                  attributeId,
                  type: "selectSale",
                  valueId,
                  value
                })
              )}
            />
          )
        }
        
        {step === "summary" && (
          <CardVariantCreateSummary
            saleValue={data.sale.value}
            data={data}
            currencySymbol={"$"}
            errors={errors}
            onVariantDataChange={(variantIndex, field, value) =>
              dispatchFormDataAction({
                field,
                type: "changeVariantData",
                value,
                variantIndex
              })
            }
            onVariantDelete={variantIndex =>
              dispatchFormDataAction({
                type: "deleteVariant",
                variantIndex
              })
            }
          />
        )}
      </div>
    </div>
  )
}

CardVariantCreateContent.displayName = "CardVariantCreateContent";
export default CardVariantCreateContent;
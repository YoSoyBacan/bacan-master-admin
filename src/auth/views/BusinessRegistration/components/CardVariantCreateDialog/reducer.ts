//#region
import { add, remove, removeAtIndex, toggle, updateAtIndex } from '@saleor/utils/lists';

import { createVariants } from './createVariants';
import { CardVariantCreateFormData } from './form';

export type ProductVariantCreateReducerActionType =
  | "changeApplyPriceToAttributeId"
  | "changeVariantData"
  | "deleteVariant"
  | "reload"
  | "selectValue"
  | "selectSale";

export type VariantField = "price" | "sku";


export interface CardVariantCreateReducerAction {
  all?: boolean;
  attributeId?: string;
  data?: CardVariantCreateFormData;
  field?: VariantField;
  type: ProductVariantCreateReducerActionType;
  value?: string;
  valueId?: string;
  variantIndex?: number;
}
//#endregion
function selectValue(
  prevState: CardVariantCreateFormData,
  attributeId: string,
  valueSlug: string
): CardVariantCreateFormData {
  const attribute = prevState.attributes.find(
    attribute => attribute.id === attributeId
  );
  

  // This reducer will be called once every time a Voucher Option is clicked

  const values = toggle(valueSlug, attribute.values, (a, b) => a === b);
  const updatedAttributes = add(
    {
      id: attributeId,
      values
    },
    remove(attribute, prevState.attributes, (a, b) => a.id === b.id)
  );

  const priceValues = toggle(
          {
            slug: valueSlug,
            value: valueSlug
          },
          prevState.price.values,
          (a, b) => a.slug === b.slug
        );


  const data = {
    ...prevState,
    attributes: updatedAttributes,
    price: {
      ...prevState.price,
      attribute: attributeId,
      values: priceValues
    }
  };
  const completeData = {
    ...data,
    variants: createVariants(data)
  }
  return completeData;
}


function changeVariantData(
  state: CardVariantCreateFormData,
  field: VariantField,
  value: string,
  variantIndex: number
): CardVariantCreateFormData {
  const variant = state.variants[variantIndex];
  if (field === "price") {
    variant.priceOverride = value;
  } else if (field === "sku") {
    variant.sku = value;
  } else {
    variant.quantity = parseInt(value, 10);
  }

  return {
    ...state,
    variants: updateAtIndex(variant, state.variants, variantIndex)
  };
}

function deleteVariant(
  state: CardVariantCreateFormData,
  variantIndex: number
): CardVariantCreateFormData {
  return {
    ...state,
    variants: removeAtIndex(state.variants, variantIndex)
  };
}

function selectSale(
  state: CardVariantCreateFormData,
  id: string,
  name: string,
  value: string
): CardVariantCreateFormData {
  return {
    ...state,
    sale: {
      id,
      name,
      value: Number(value)
    }
  }
};


function reduceProductVariantCreateFormData(
  prevState: CardVariantCreateFormData,
  action: CardVariantCreateReducerAction
) {
  switch (action.type) {
    case "selectValue":
      return selectValue(prevState, action.attributeId, action.valueId);
    case "selectSale":
      return selectSale(prevState, action.attributeId, action.valueId, action.value);
    case "changeVariantData":
      return changeVariantData(
        prevState,
        action.field,
        action.value,
        action.variantIndex
      );
    case "deleteVariant":
      return deleteVariant(prevState, action.variantIndex);
    case "reload":
      return action.data;
    default:
      return prevState;
  }
}

export default reduceProductVariantCreateFormData;

import { ProductDetails_product_productType_variantAttributes } from '@saleor/products/types/ProductDetails';
import { ProductVariantBulkCreateInput } from '@saleor/types/globalTypes';

export interface AttributeValue {
  slug: string;
  value: string;
}

export interface Attribute {
  id: string;
  values: string[];
}
export interface AllOrAttribute {
  all: boolean;
  attribute: string;
  value: string;
  values: AttributeValue[];
}

export interface CardVariantCreateFormData {
  attributes: Attribute[];
  price: AllOrAttribute;
  sku: string;
  variants: ProductVariantBulkCreateInput[]
  sale: {
    id: string;
    name: string;
    value: number;
  }
}

export const createInitialForm = (
  attributes: ProductDetails_product_productType_variantAttributes[],
): CardVariantCreateFormData => ({
  attributes: attributes.map(attribute => ({
    id: attribute.id,
    values: []
  })),
  variants: [],
  price: {
    all: true,
    attribute: undefined,
    value: "",
    values: []
  },
  sku: '',
  sale: {
    id: '',
    name: '',
    value: 0
  }
});
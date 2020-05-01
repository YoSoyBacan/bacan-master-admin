import { ProductVariantBulkCreateInput } from '@saleor/types/globalTypes';

import { AllOrAttribute, Attribute, CardVariantCreateFormData } from './form';

const QUANTITY_STOCK = 100000;

interface CreateVariantAttributeValueInput {
  attributeId: string;
  attributeValueSlug: string;
}
type CreateVariantInput = CreateVariantAttributeValueInput[];

function getAttributeValuePrice(
  attributes: CreateVariantInput,
  price: AllOrAttribute
): string {
  const attribute = attributes.find(
    attribute => attribute.attributeId === price.attribute
  );

  const attributeValue = price.values.find(
    attributeValue => attribute.attributeValueSlug === attributeValue.slug
  );

  return attributeValue.value;
}
function createVariant(
  data: CardVariantCreateFormData,
  attributes: CreateVariantInput
): ProductVariantBulkCreateInput {
  const priceOverride = data.price && data.price.value
    ? data.price.value
    : getAttributeValuePrice(attributes, data.price);

  return {
    attributes: attributes.map(attribute => ({
      id: attribute.attributeId,
      values: [attribute.attributeValueSlug]
    })),
    priceOverride,
    quantity: QUANTITY_STOCK,
    sku: `TB-${Math.random().toString(36).substr(2, 15).toUpperCase()}`
  };
}

function addAttributeToVariant(
  attribute: Attribute,
  variant: CreateVariantInput
): CreateVariantInput[] {
  return attribute.values.map(attributeValueSlug => [
    ...variant,
    {
      attributeId: attribute.id,
      attributeValueSlug
    }
  ]);
}
function addVariantAttributeInput(
  data: CreateVariantInput[],
  attribute: Attribute
): CreateVariantInput[] {
  const variants = data
    .map(variant => addAttributeToVariant(attribute, variant))
    .reduce((acc, variantInput) => [...acc, ...variantInput]);

  return variants;
}

export function createVariantFlatMatrixDimension(
  variants: CreateVariantInput[],
  attributes: Attribute[]
): CreateVariantInput[] {
  if (attributes.length > 0) {
    return createVariantFlatMatrixDimension(
      addVariantAttributeInput(variants, attributes[0]),
      attributes.slice(1)
    );
  } else {
    return variants;
  }
}

export function createVariants(
  data: CardVariantCreateFormData
): ProductVariantBulkCreateInput[] {
  if (
    (!data.price)
  ) {
    return [];
  }
  const variants = createVariantFlatMatrixDimension([[]], data.attributes).map(
    variant => createVariant(data, variant)
  );

  return variants;
}
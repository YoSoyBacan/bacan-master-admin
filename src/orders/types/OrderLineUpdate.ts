/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { OrderLineInput, OrderEventsEmailsEnum, OrderEventsEnum, FulfillmentStatus, PaymentChargeStatusEnum, OrderStatus, OrderAction } from "./../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: OrderLineUpdate
// ====================================================

export interface OrderLineUpdate_draftOrderLineUpdate_errors {
  __typename: "Error";
  field: string | null;
  message: string | null;
}

export interface OrderLineUpdate_draftOrderLineUpdate_order_billingAddress_country {
  __typename: "CountryDisplay";
  code: string;
  country: string;
}

export interface OrderLineUpdate_draftOrderLineUpdate_order_billingAddress {
  __typename: "Address";
  city: string;
  cityArea: string;
  companyName: string;
  country: OrderLineUpdate_draftOrderLineUpdate_order_billingAddress_country;
  countryArea: string;
  firstName: string;
  id: string;
  lastName: string;
  phone: string | null;
  postalCode: string;
  streetAddress1: string;
  streetAddress2: string;
}

export interface OrderLineUpdate_draftOrderLineUpdate_order_events_user {
  __typename: "User";
  id: string;
  email: string;
}

export interface OrderLineUpdate_draftOrderLineUpdate_order_events {
  __typename: "OrderEvent";
  id: string;
  amount: number | null;
  date: any | null;
  email: string | null;
  emailType: OrderEventsEmailsEnum | null;
  message: string | null;
  quantity: number | null;
  type: OrderEventsEnum | null;
  user: OrderLineUpdate_draftOrderLineUpdate_order_events_user | null;
}

export interface OrderLineUpdate_draftOrderLineUpdate_order_fulfillments_lines_orderLine_unitPrice_gross {
  __typename: "Money";
  amount: number;
  currency: string;
}

export interface OrderLineUpdate_draftOrderLineUpdate_order_fulfillments_lines_orderLine_unitPrice_net {
  __typename: "Money";
  amount: number;
  currency: string;
}

export interface OrderLineUpdate_draftOrderLineUpdate_order_fulfillments_lines_orderLine_unitPrice {
  __typename: "TaxedMoney";
  gross: OrderLineUpdate_draftOrderLineUpdate_order_fulfillments_lines_orderLine_unitPrice_gross;
  net: OrderLineUpdate_draftOrderLineUpdate_order_fulfillments_lines_orderLine_unitPrice_net;
}

export interface OrderLineUpdate_draftOrderLineUpdate_order_fulfillments_lines_orderLine_thumbnail {
  __typename: "Image";
  url: string;
}

export interface OrderLineUpdate_draftOrderLineUpdate_order_fulfillments_lines_orderLine {
  __typename: "OrderLine";
  id: string;
  isShippingRequired: boolean;
  productName: string;
  productSku: string;
  quantity: number;
  quantityFulfilled: number;
  unitPrice: OrderLineUpdate_draftOrderLineUpdate_order_fulfillments_lines_orderLine_unitPrice | null;
  thumbnail: OrderLineUpdate_draftOrderLineUpdate_order_fulfillments_lines_orderLine_thumbnail | null;
}

export interface OrderLineUpdate_draftOrderLineUpdate_order_fulfillments_lines {
  __typename: "FulfillmentLine";
  id: string;
  quantity: number;
  orderLine: OrderLineUpdate_draftOrderLineUpdate_order_fulfillments_lines_orderLine | null;
}

export interface OrderLineUpdate_draftOrderLineUpdate_order_fulfillments {
  __typename: "Fulfillment";
  id: string;
  lines: (OrderLineUpdate_draftOrderLineUpdate_order_fulfillments_lines | null)[] | null;
  fulfillmentOrder: number;
  status: FulfillmentStatus;
  trackingNumber: string;
}

export interface OrderLineUpdate_draftOrderLineUpdate_order_lines_unitPrice_gross {
  __typename: "Money";
  amount: number;
  currency: string;
}

export interface OrderLineUpdate_draftOrderLineUpdate_order_lines_unitPrice_net {
  __typename: "Money";
  amount: number;
  currency: string;
}

export interface OrderLineUpdate_draftOrderLineUpdate_order_lines_unitPrice {
  __typename: "TaxedMoney";
  gross: OrderLineUpdate_draftOrderLineUpdate_order_lines_unitPrice_gross;
  net: OrderLineUpdate_draftOrderLineUpdate_order_lines_unitPrice_net;
}

export interface OrderLineUpdate_draftOrderLineUpdate_order_lines_thumbnail {
  __typename: "Image";
  url: string;
}

export interface OrderLineUpdate_draftOrderLineUpdate_order_lines {
  __typename: "OrderLine";
  id: string;
  isShippingRequired: boolean;
  productName: string;
  productSku: string;
  quantity: number;
  quantityFulfilled: number;
  unitPrice: OrderLineUpdate_draftOrderLineUpdate_order_lines_unitPrice | null;
  thumbnail: OrderLineUpdate_draftOrderLineUpdate_order_lines_thumbnail | null;
}

export interface OrderLineUpdate_draftOrderLineUpdate_order_shippingAddress_country {
  __typename: "CountryDisplay";
  code: string;
  country: string;
}

export interface OrderLineUpdate_draftOrderLineUpdate_order_shippingAddress {
  __typename: "Address";
  city: string;
  cityArea: string;
  companyName: string;
  country: OrderLineUpdate_draftOrderLineUpdate_order_shippingAddress_country;
  countryArea: string;
  firstName: string;
  id: string;
  lastName: string;
  phone: string | null;
  postalCode: string;
  streetAddress1: string;
  streetAddress2: string;
}

export interface OrderLineUpdate_draftOrderLineUpdate_order_shippingMethod {
  __typename: "ShippingMethod";
  id: string;
}

export interface OrderLineUpdate_draftOrderLineUpdate_order_shippingPrice_gross {
  __typename: "Money";
  amount: number;
  currency: string;
}

export interface OrderLineUpdate_draftOrderLineUpdate_order_shippingPrice {
  __typename: "TaxedMoney";
  gross: OrderLineUpdate_draftOrderLineUpdate_order_shippingPrice_gross;
}

export interface OrderLineUpdate_draftOrderLineUpdate_order_subtotal_gross {
  __typename: "Money";
  amount: number;
  currency: string;
}

export interface OrderLineUpdate_draftOrderLineUpdate_order_subtotal {
  __typename: "TaxedMoney";
  gross: OrderLineUpdate_draftOrderLineUpdate_order_subtotal_gross;
}

export interface OrderLineUpdate_draftOrderLineUpdate_order_total_gross {
  __typename: "Money";
  amount: number;
  currency: string;
}

export interface OrderLineUpdate_draftOrderLineUpdate_order_total_tax {
  __typename: "Money";
  amount: number;
  currency: string;
}

export interface OrderLineUpdate_draftOrderLineUpdate_order_total {
  __typename: "TaxedMoney";
  gross: OrderLineUpdate_draftOrderLineUpdate_order_total_gross;
  tax: OrderLineUpdate_draftOrderLineUpdate_order_total_tax;
}

export interface OrderLineUpdate_draftOrderLineUpdate_order_totalAuthorized {
  __typename: "Money";
  amount: number;
  currency: string;
}

export interface OrderLineUpdate_draftOrderLineUpdate_order_totalCaptured {
  __typename: "Money";
  amount: number;
  currency: string;
}

export interface OrderLineUpdate_draftOrderLineUpdate_order_user {
  __typename: "User";
  id: string;
  email: string;
}

export interface OrderLineUpdate_draftOrderLineUpdate_order_availableShippingMethods_price {
  __typename: "Money";
  amount: number;
  currency: string;
}

export interface OrderLineUpdate_draftOrderLineUpdate_order_availableShippingMethods {
  __typename: "ShippingMethod";
  id: string;
  name: string;
  price: OrderLineUpdate_draftOrderLineUpdate_order_availableShippingMethods_price | null;
}

export interface OrderLineUpdate_draftOrderLineUpdate_order {
  __typename: "Order";
  id: string;
  billingAddress: OrderLineUpdate_draftOrderLineUpdate_order_billingAddress | null;
  canFinalize: boolean;
  created: any;
  customerNote: string;
  events: (OrderLineUpdate_draftOrderLineUpdate_order_events | null)[] | null;
  fulfillments: (OrderLineUpdate_draftOrderLineUpdate_order_fulfillments | null)[];
  lines: (OrderLineUpdate_draftOrderLineUpdate_order_lines | null)[];
  number: string | null;
  paymentStatus: PaymentChargeStatusEnum | null;
  shippingAddress: OrderLineUpdate_draftOrderLineUpdate_order_shippingAddress | null;
  shippingMethod: OrderLineUpdate_draftOrderLineUpdate_order_shippingMethod | null;
  shippingMethodName: string | null;
  shippingPrice: OrderLineUpdate_draftOrderLineUpdate_order_shippingPrice | null;
  status: OrderStatus;
  subtotal: OrderLineUpdate_draftOrderLineUpdate_order_subtotal | null;
  total: OrderLineUpdate_draftOrderLineUpdate_order_total | null;
  actions: (OrderAction | null)[];
  totalAuthorized: OrderLineUpdate_draftOrderLineUpdate_order_totalAuthorized | null;
  totalCaptured: OrderLineUpdate_draftOrderLineUpdate_order_totalCaptured | null;
  user: OrderLineUpdate_draftOrderLineUpdate_order_user | null;
  userEmail: string | null;
  availableShippingMethods: (OrderLineUpdate_draftOrderLineUpdate_order_availableShippingMethods | null)[] | null;
}

export interface OrderLineUpdate_draftOrderLineUpdate {
  __typename: "DraftOrderLineUpdate";
  errors: OrderLineUpdate_draftOrderLineUpdate_errors[] | null;
  order: OrderLineUpdate_draftOrderLineUpdate_order | null;
}

export interface OrderLineUpdate {
  draftOrderLineUpdate: OrderLineUpdate_draftOrderLineUpdate | null;
}

export interface OrderLineUpdateVariables {
  id: string;
  input: OrderLineInput;
}

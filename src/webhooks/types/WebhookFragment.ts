/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: WebhookFragment
// ====================================================

export interface WebhookFragment_serviceAccount {
  __typename: "ServiceAccount";
  id: string;
  name: string | null;
}

export interface WebhookFragment {
  __typename: "Webhook";
  id: string;
  name: string | null;
  isActive: boolean;
  serviceAccount: WebhookFragment_serviceAccount;
}

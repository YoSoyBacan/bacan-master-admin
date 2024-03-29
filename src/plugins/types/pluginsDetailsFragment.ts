/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ConfigurationTypeFieldEnum } from "./../../types/globalTypes";

// ====================================================
// GraphQL fragment: PluginsDetailsFragment
// ====================================================

export interface PluginsDetailsFragment_configuration {
  __typename: "ConfigurationItem";
  name: string;
  type: ConfigurationTypeFieldEnum | null;
  value: string;
  helpText: string | null;
  label: string | null;
}

export interface PluginsDetailsFragment {
  __typename: "Plugin";
  id: string;
  name: string;
  description: string;
  active: boolean;
  configuration: (PluginsDetailsFragment_configuration | null)[] | null;
}

import Card from '@material-ui/core/Card';
import AppHeader from '@saleor/components/AppHeader';
import Container from '@saleor/components/Container';
import FilterSearch from '@saleor/components/Filter/FilterSearch';
import PageHeader from '@saleor/components/PageHeader';
import { ShopInfo_shop_languages } from '@saleor/components/Shop/types/ShopInfo';
import FilterTabs, { FilterTab } from '@saleor/components/TableFilter';
import { maybe } from '@saleor/misc';
import { SearchPageProps } from '@saleor/types';
import React from 'react';
import { IntlShape, useIntl } from 'react-intl';

import { TranslatableEntities } from '../../urls';

// tslint:disable no-submodule-imports
export interface TranslationsEntitiesListPageProps extends SearchPageProps {
  children: React.ReactNode;
  filters: TranslationsEntitiesFilters;
  language: ShopInfo_shop_languages;
  onBack: () => void;
}

export interface TranslationsEntitiesFilters {
  current: TranslationsEntitiesListFilterTab;
  onCategoriesTabClick: () => void;
  onCollectionsTabClick: () => void;
  onProductsTabClick: () => void;
  onSalesTabClick: () => void;
  onVouchersTabClick: () => void;
  onPagesTabClick: () => void;
  onProductTypesTabClick: () => void;
}

export type TranslationsEntitiesListFilterTab = keyof typeof TranslatableEntities;

function getSearchPlaceholder(
  tab: TranslationsEntitiesListFilterTab,
  intl: IntlShape
): string {
  switch (tab) {
    case "categories":
      return intl.formatMessage({
        defaultMessage: "Search Category"
      });

    case "collections":
      return intl.formatMessage({
        defaultMessage: "Search Collection"
      });

    case "products":
      return intl.formatMessage({
        defaultMessage: "Search Product"
      });

    case "sales":
      return intl.formatMessage({
        defaultMessage: "Search Sale"
      });

    case "vouchers":
      return intl.formatMessage({
        defaultMessage: "Search Voucher"
      });

    case "pages":
      return intl.formatMessage({
        defaultMessage: "Search Page"
      });

    case "productTypes":
      return intl.formatMessage({
        defaultMessage: "Search Product Type"
      });

    default:
      return "...";
  }
}

const tabs: TranslationsEntitiesListFilterTab[] = [
  "categories",
  "collections",
  "products",
  "sales",
  "vouchers",
  "pages",
  "productTypes"
];

const TranslationsEntitiesListPage: React.StatelessComponent<
  TranslationsEntitiesListPageProps
> = ({ filters, language, onBack, children, ...searchProps }) => {
  const intl = useIntl();
  const currentTab = tabs.indexOf(filters.current);

  return (
    <Container>
      <AppHeader onBack={onBack}>
        {intl.formatMessage({
          defaultMessage: "Languages"
        })}
      </AppHeader>
      <PageHeader
        title={intl.formatMessage(
          {
            defaultMessage: "Translations to {language}",
            description: "header"
          },
          {
            language: maybe(() => language.language, "...")
          }
        )}
      />
      <Card>
        <FilterTabs currentTab={currentTab}>
          <FilterTab
            label={intl.formatMessage({
              defaultMessage: "Categories"
            })}
            onClick={filters.onCategoriesTabClick}
          />
          <FilterTab
            label={intl.formatMessage({
              defaultMessage: "Collections"
            })}
            onClick={filters.onCollectionsTabClick}
          />
          <FilterTab
            label={intl.formatMessage({
              defaultMessage: "Negocios"
            })}
            onClick={filters.onProductsTabClick}
          />
          <FilterTab
            label={intl.formatMessage({
              defaultMessage: "Ventas"
            })}
            onClick={filters.onSalesTabClick}
          />
          <FilterTab
            label={intl.formatMessage({
              defaultMessage: "Cupones"
            })}
            onClick={filters.onVouchersTabClick}
          />
          <FilterTab
            label={intl.formatMessage({
              defaultMessage: "Páginas"
            })}
            onClick={filters.onPagesTabClick}
          />
          <FilterTab
            label={intl.formatMessage({
              defaultMessage: "Product Types"
            })}
            onClick={filters.onProductTypesTabClick}
          />
        </FilterTabs>
        <FilterSearch
          displaySearchAction={null}
          searchPlaceholder={getSearchPlaceholder(filters.current, intl)}
          {...searchProps}
        />
        {children}
      </Card>
    </Container>
  );
};
TranslationsEntitiesListPage.displayName = "TranslationsEntitiesListPage";
export default TranslationsEntitiesListPage;

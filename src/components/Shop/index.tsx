import appleTouchIcon from '@assets/favicons/apple-touch-icon.png';
import safariPinnedTab from '@assets/favicons/safari-pinned-tab.svg';
import favicon16 from '@assets/images/favicon.svg';
import React from 'react';
import Helmet from 'react-helmet';

import { TypedShopInfoQuery } from './query';
import { ShopInfo_shop } from './types/ShopInfo';

type ShopContext = ShopInfo_shop;

export const ShopContext = React.createContext<ShopContext>(undefined);

export const ShopProvider: React.FC = ({ children }) => (
  <TypedShopInfoQuery>
    {({ data }) => (
      <>
        <Helmet>
          <link rel="apple-touch-icon" sizes="180x180" href={appleTouchIcon} />
          <link rel="icon" type="image/png" sizes="16x16" href={favicon16} />
          <link rel="mask-icon" href={safariPinnedTab} />
        </Helmet>
        <ShopContext.Provider value={data ? data.shop : undefined}>
          {children}
        </ShopContext.Provider>
      </>
    )}
  </TypedShopInfoQuery>
);
export const Shop = ShopContext.Consumer;
export default Shop;

import { ProductUrlQueryParams } from '@saleor/products/urls';
import { parse as parseQs } from 'qs';
import React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router-dom';

import Layout from './components/Layout';
import { User } from './types/User';
import { newPasswordPath, passwordResetPath, passwordResetSuccessPath, registerBusinessPath } from './urls';
import { BusinessRegistration } from './views/BusinessRegistration';
import LoginView from './views/Login';
import NewPassword from './views/NewPassword';
import ResetPassword from './views/ResetPassword';
import ResetPasswordSuccess from './views/ResetPasswordSuccess';

interface UserContext {
  login: (username: string, password: string) => void;
  loginByToken: (token: string, user?: User) => void;
  logout: () => void;
  tokenAuthLoading: boolean;
  tokenVerifyLoading: boolean;
  user?: User;
}

export const UserContext = React.createContext<UserContext>({
  login: undefined,
  loginByToken: undefined,
  logout: undefined,
  tokenAuthLoading: false,
  tokenVerifyLoading: false
});

const BusinessRegistrationView: React.StatelessComponent<RouteComponentProps<any>> = ({
  location
}) => {
  const qs = parseQs(location.search.substr(1));
  const params: ProductUrlQueryParams = qs;

  return (
    <BusinessRegistration 
      params={params}
    />
  )
}

const AuthRouter: React.FC = () => (
  <Layout>
    <Switch>
      <Route path={passwordResetSuccessPath} component={ResetPasswordSuccess} />
      <Route path={passwordResetPath} component={ResetPassword} />
      <Route path={newPasswordPath} component={NewPassword} />
      <Route path={registerBusinessPath} component={BusinessRegistrationView}/>
      <Route component={LoginView} />
    </Switch>
  </Layout>
);

AuthRouter.displayName = "AuthRouter";
export default AuthRouter;

export * from "./utils";

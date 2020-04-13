import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { createStyles, Theme, WithStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Form from '@saleor/components/Form';
import { FormSpacer } from '@saleor/components/FormSpacer';
import { commonMessages } from '@saleor/intl';
import React from 'react';
import { useIntl } from 'react-intl';


enum Countries {
  ECUADOR = 'Ecuador',
  COLOMBIA = 'Colombia'
};

export interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  country: Countries;
}

const styles = (theme: Theme) =>
  createStyles({
    buttonContainer: {
      display: "flex",
      justifyContent: "flex-end"
    },
    link: {
      color: theme.palette.primary.main,
      cursor: "pointer",
      textAlign: "center"
    },
    loginButton: {
      width: 140
    },
    title: {
        flex: 1,
        paddingBottom: theme.spacing.unit * 2
      },
    panel: {
      "& span": {
        color: theme.palette.error.contrastText
      },
      background: theme.palette.error.main,
      borderRadius: theme.spacing.unit,
      marginBottom: theme.spacing.unit * 3,
      padding: theme.spacing.unit * 1.5
    }
  });

export interface UserAccountProps extends WithStyles<typeof styles> {

}

const UserAccount = withStyles(styles, { name: "LoginCard" })(
  ({
    classes
  }: UserAccountProps) => {

    const intl = useIntl();

    return (
        <>
        <Form initial={{ email: "", password: "", firstName: "", lastName: "", confirmPassword: "", phoneNumber: "", country: Countries.ECUADOR }}>
            {({ change: handleChange, data }) => (
            <>
                <TextField
                autoFocus
                fullWidth
                autoComplete="name"
                label={'Nombre'}
                name="firstName"
                onChange={handleChange}
                value={data.firstName}
                inputProps={{
                    "data-tc": "firstName"
                }}
                />
                <FormSpacer />
                <TextField
                autoFocus
                fullWidth
                autoComplete="name"
                label={'Apellido'}
                name="lastName"
                onChange={handleChange}
                value={data.lastName}
                inputProps={{
                    "data-tc": "lastName"
                }}
                />
                <FormSpacer />
                <TextField
                autoFocus
                fullWidth
                autoComplete="phone"
                label={'Teléfono / WhatsApp'}
                name="phoneNumber"
                onChange={handleChange}
                value={data.phoneNumber}
                inputProps={{
                    "data-tc": "phoneNumber"
                }}
                />
                <FormSpacer />
                <TextField
                autoFocus
                fullWidth
                autoComplete="username"
                label={intl.formatMessage(commonMessages.email)}
                name="email"
                onChange={handleChange}
                value={data.email}
                inputProps={{
                    "data-tc": "email"
                }}
                />
                <FormSpacer />
                <>
                  <InputLabel>País</InputLabel>
                  <Select
                  fullWidth
                  id="pais-select"
                  value={data.country}
                  name="country"
                  onChange={handleChange}
                  required
                  >
                    <MenuItem value={Countries.ECUADOR}>Ecuador</MenuItem>
                    <MenuItem value={Countries.COLOMBIA}>Colombia</MenuItem>
                  </Select>
                </>
                <FormSpacer />
                <TextField
                fullWidth
                autoComplete="password"
                label={intl.formatMessage({
                    defaultMessage: "Contraseña"
                })}
                name="password"
                onChange={handleChange}
                type="password"
                value={data.password}
                inputProps={{
                    "data-tc": "password"
                }}
                />
                <FormSpacer />
                <TextField
                  fullWidth
                  autoComplete="password"
                  label={"Confirma tu Contraseña"}
                  name="confirmPassword"
                  onChange={handleChange}
                  type="password"
                  value={data.confirmPassword}
                  inputProps={{
                      "data-tc": "confirmPassword"
                  }}
                />
            </>
            )}
        </Form>
        </>
    );
  }
);
UserAccount.displayName = "UserAccount";
export default UserAccount;

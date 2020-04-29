import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { createStyles, Theme, WithStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import ConfirmButton from '@saleor/components/ConfirmButton';
import Form from '@saleor/components/Form';
import { FormSpacer } from '@saleor/components/FormSpacer';
import { commonMessages } from '@saleor/intl';
import React from 'react';
import { useIntl } from 'react-intl';

import * as AdminClient from '../../../../fetch/adminClient';

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
      justifyContent: "space-between",
      paddingTop: theme.spacing.unit * 2,
      paddingBottom: theme.spacing.unit * 2
    },
    nexButton: {
      width: 140
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
  handleNext: () => void;
  setUserId: (id: string) => void;
}

// const FAKE = true;
const UserAccount = withStyles(styles, { name: "UserAccount" })(
  ({
    handleNext,
    classes,
    setUserId
  }: UserAccountProps) => {

    const intl = useIntl();
    const [ loading, setLoading ] = React.useState(false);
    const [ errors, setErrors ] = React.useState<Array<{field: string, message: string}>>([])

    const setNewError = (field: string, message: string) => {
      const newErrors = [...errors];
      newErrors.push({ field, message});
      setErrors(newErrors);
    }

    const handleSubmit = async (data: FormData) => {
      setLoading(true);
      // if (FAKE === true) {
      //   handleNext();
      //   return;
      // }
      if (data.password !== data.confirmPassword) {
        setNewError('password', 'Contraseñas no coinciden, intenta otra vez.');
        setLoading(false);
        return;
      }
      try {
        const newUser = await AdminClient.post<{ uid: string }>('user', {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          countryCode: data.country === Countries.ECUADOR ? '593' : '57',
          type: 'Negocio',
          authMethod: 'Email',
          password: data.password,
          phoneNumber: data.phoneNumber
        });
        setUserId(newUser.data.uid);
        handleNext();
      } catch(error) {
        // TODO: Add error to the form state
        setLoading(false);
      }

    }
    // TODO: Add validation to the form to disable the Next button
    const initialData = {
      email: "", 
      password: "", 
      firstName: "", 
      lastName: "", 
      confirmPassword: "", 
      phoneNumber: "", 
      country: Countries.ECUADOR
    }

    const getErrorField = (field: string) => {
      const errorFound = errors.find(err => err.field === field);
      const finalResult = {
        hasError: false,
        errorText: ''
      };
      if (!errorFound) {
        return finalResult;
      }
      finalResult.hasError = true;
      finalResult.errorText = errorFound.message;
      return finalResult;
    };
    const tranState = loading ? 'loading' : 'default';
    return (
        <>
        <Form initial={initialData} onSubmit={handleSubmit} errors={errors}>
            {({ change: handleChange, data, submit }) => (
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
                  error={getErrorField('phoneNumber').hasError}
                  helperText={getErrorField('phoneNumber').errorText}
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
                error={getErrorField('password').hasError}
                helperText={getErrorField('password').errorText}
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
                  error={getErrorField('confirmPassword').hasError}
                  helperText={getErrorField('confirmPassword').errorText}
                />
                <div className={classes.buttonContainer}>
                <div/>
                  <ConfirmButton
                    className={classes.nexButton}
                    transitionState={tranState}
                    data-tc="submit"
                    onClick={submit}
                  >
                    Regístrate
                  </ConfirmButton>
                </div>
            </>
            )}
        </Form>

        </>
    );
  }
);
UserAccount.displayName = "UserAccount";
export default UserAccount;

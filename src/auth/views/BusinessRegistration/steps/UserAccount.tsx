import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { createStyles, Theme, WithStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import CardSpacer from '@saleor/components/CardSpacer';
import Checkbox from '@saleor/components/Checkbox';
import ConfirmButton from '@saleor/components/ConfirmButton';
import Container from '@saleor/components/Container';
import Form from '@saleor/components/Form';
import { FormSpacer } from '@saleor/components/FormSpacer';
import useNotifier from '@saleor/hooks/useNotifier';
import { commonMessages } from '@saleor/intl';
import React, { useEffect } from 'react';
import { useIntl } from 'react-intl';

import { Firebase } from '../../../../analytics';
import * as AdminClient from '../../../../fetch/adminClient';
import { WelcomeCard } from '../components/WelcomeCard';

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
      paddingTop: theme.spacing() * 2,
      paddingBottom: theme.spacing() * 2
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
    formTitle: {
      fontSize: "2rem",
      fontWeight: 600
    },
    title: {
        flex: 1,
        paddingBottom: theme.spacing() * 2
    },
    checkboxContainer: {
      display: 'flex',
      paddingTop: '5%'
    },
    termsTitle: {
      paddingTop: '1%'
    },
    panel: {
      "& span": {
        color: theme.palette.error.contrastText
      },
      background: theme.palette.error.main,
      borderRadius: theme.spacing(),
      marginBottom: theme.spacing() * 3,
      padding: theme.spacing() * 1.5
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
    const notify = useNotifier();
    const [ loading, setLoading ] = React.useState(false);
    const [ acceptedTerms, setTerms ] = React.useState(false);
    const [ errors, setErrors ] = React.useState<Array<{field: string, message: string}>>([])

    const setNewError = (field: string, message: string) => {
      const newErrors = [...errors];
      newErrors.push({ field, message});
      setErrors(newErrors);
    }

    const handleCheckBox = (checked) => {
      if (checked === true){
          setTerms(false);
      } else {
          setTerms(true);
      }
  }

    useEffect(() => {
      Firebase.analytics().logEvent('reg_sign_up', {
        content_type: 'action',
        content_id: 'user_page'
      });
      setTimeout(() => {
        document.querySelector("#content-panel").scrollTo({ top: 0, behavior: 'smooth'});
      }, 100);
    }, []);
      
    const handleSubmit = async (data: FormData) => {
      setLoading(true);
      const values = Object.values(data);
      if ( values.includes("") || values.includes(null) || values.length === 0){
        notify({ text: 'Por favor llena todos los campos requeridos.' });
        setLoading(false);
        return;
      }

      if (!/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(data.email)){
        setNewError('email', 'El formato del e-mail es incorrecto.');
        setLoading(false);
        return;
      }
      
      if (data.password !== data.confirmPassword) {
        setNewError('password', 'Contraseñas no coinciden, intenta otra vez.');
        setLoading(false);
        return;
      } 

      if (acceptedTerms !== true){
        notify({ text: 'Por favor acepte terminos y condiciones.' });
        setLoading(false);
        return;
      }

      try{
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
      } catch (error) {
        const response = error.response;
        notify({ text: response.data.message });
      }

      setLoading(false);
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
        <Container>
          <WelcomeCard/>
          <CardSpacer/>
          <Typography className={classes.formTitle}>
            Tu Cuenta
          </Typography>
          <CardSpacer/>
          <Typography variant="subtitle2">
            Te permite acceder al Administrador de tu Negocio Bacán. Puedes ver tus ventas, clientes y Tarjetas Bacán.
          </Typography>
          <CardSpacer/>
          <Form initial={initialData} onSubmit={handleSubmit} errors={errors}>
              {({ change: handleChange, data, submit }) => (
              <>
                  <TextField
                  autoFocus
                  fullWidth
                  autoComplete="name"
                  label={'Nombres'}
                  name="firstName"
                  onChange={handleChange}
                  required={true}
                  value={data.firstName}
                  inputProps={{
                      "data-tc": "firstName"
                  }}
                  error={getErrorField('nextError').hasError}
                  helperText={getErrorField('nextError').errorText}
                  />
                  <FormSpacer />
                  <TextField
                  autoFocus
                  fullWidth
                  autoComplete="name"
                  label={'Apellidos'}
                  required={true}
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
                    required={true}
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
                    required={true}
                    value={data.email}
                    inputProps={{
                        "data-tc": "email"
                    }}
                    error={getErrorField('email').hasError}
                    helperText={getErrorField('email').errorText}
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
                  required={true}
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
                    required={true}
                    label={"Confirma tu Contraseña"}
                    name="confirmPassword"
                    onChange={handleChange}
                    type="password"
                    value={data.confirmPassword}
                    inputProps={{
                        "data-tc": "confirmPassword"
                    }}
                  />
                  <FormSpacer />
                  <div className={classes.checkboxContainer}>
                    <Checkbox
                      checked={acceptedTerms}
                      disableClickPropagation
                      onChange={() => handleCheckBox(acceptedTerms)}
                    /> 
                    <Typography variant="subtitle1" className={classes.termsTitle}>
                        Acepto <a href="https://drive.google.com/file/d/1YXpxE5IAbwFyRKkVbhRWUOAYH5JJFGtM/view?usp=sharing" target="_blank"> Terminos y Condiciones </a>
                    </Typography>
                  </div>
                  <FormSpacer />
                  <div className={classes.buttonContainer}>
                  <div/>
                    <ConfirmButton
                      className={classes.nexButton}
                      transitionState={tranState}
                      data-tc="submit"
                      onClick={submit}
                    >
                      Siguiente
                    </ConfirmButton>
                  </div>
                  <Typography variant="subtitle2" className={classes.title}>Tienes problemas al registrarte? Contáctanos! <br/> contacto@yosoybacan.com </Typography>
              </>
              )}
          </Form>
        </Container>
        </>
    );
  }
);
UserAccount.displayName = "UserAccount";
export default UserAccount;

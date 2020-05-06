import Button from '@material-ui/core/Button';
import { createStyles, Theme, WithStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Form from '@saleor/components/Form';
import { FormSpacer } from '@saleor/components/FormSpacer';
import { commonMessages } from '@saleor/intl';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';


export interface FormData {
  email: string;
  password: string;
}

const styles = (theme: Theme) =>
  createStyles({
    buttonContainer: {
      display: "flex",
      justifyContent: "flex-end"
    },
    title: {
      flex: 1,
      fontSize: 24,
      paddingBottom: theme.spacing() * 2
    },
    link: {
      color: theme.palette.primary.main,
      cursor: "pointer",
      textAlign: "center"
    },
    loginButton: {
      width: 140
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

export interface LoginCardProps extends WithStyles<typeof styles> {
  error: boolean;
  disableLoginButton: boolean;
  onPasswordRecovery: () => void;
  onSubmit?(event: FormData);
}

const LoginCard = withStyles(styles, { name: "LoginCard" })(
  ({
    classes,
    error,
    disableLoginButton,
    onPasswordRecovery,
    onSubmit
  }: LoginCardProps) => {
    const intl = useIntl();

    return (
      <>
        <Typography className={classes.title} variant="h5">
          Bienvenido/a, ingresa a tu cuenta
        </Typography> 
        <Form initial={{ email: "", password: "" }} onSubmit={onSubmit}>
          {({ change: handleChange, data, submit: handleSubmit }) => (
            <>
              {error && (
                <div className={classes.panel}>
                  <Typography variant="caption">
                    <FormattedMessage defaultMessage="Lo sentimos, tu email y/o contraseña son incorrectas. Por favor vuelve a intentar." />
                  </Typography>
                </div>
              )}
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
              <div className={classes.buttonContainer}>
                <Button
                  className={classes.loginButton}
                  color="primary"
                  disabled={disableLoginButton}
                  variant="contained"
                  onClick={handleSubmit}
                  type="submit"
                  data-tc="submit"
                >
                  <FormattedMessage defaultMessage="Ingresa" description="button" />
                </Button>
              </div>
              <FormSpacer />
              <Typography className={classes.link} onClick={onPasswordRecovery}>
                <FormattedMessage
                  defaultMessage="Olvide mi Contraseña"
                  description="button"
                />
              </Typography>
            </>
          )}
        </Form>
      </>
    );
  }
);
LoginCard.displayName = "LoginCard";
export default LoginCard;

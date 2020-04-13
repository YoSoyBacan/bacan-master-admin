import Button from '@material-ui/core/Button';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import { createStyles, Theme, WithStyles, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';

import BusinessLegal from './steps/BusinessLegal';
import UserAccount from './steps/UserAccount';

export interface FormData {
  email: string;
  password: string;
}

const styles = (theme: Theme) =>
  createStyles({
    buttonContainer: {
      display: "flex",
      justifyContent: "space-between",
      paddingTop: theme.spacing.unit * 2,
      paddingBottom: theme.spacing.unit * 2
    },
    link: {
      color: theme.palette.primary.main,
      cursor: "pointer",
      textAlign: "center"
    },
    nexButton: {
      width: 140
    },
    title: {
        flex: 1,
        paddingBottom: theme.spacing.unit * 2
    }
  });

export interface BusinessRegistrationProps extends WithStyles<typeof styles> {
  error: boolean;
  disableLoginButton: boolean;
  onPasswordRecovery: () => void;
  onSubmit?(event: FormData);
}

const BusinessRegistration = withStyles(styles, { name: "LoginCard" })(
  ({
    classes,
    error,
  }: BusinessRegistrationProps) => {

    const getSteps = () => {
        return ['Tu Perfil', 'Tu Empresa', 'Tu Negocio', 'Tus Tarjetas'];
    }

    const [ activeStep, setActiveStep ] = React.useState(0);

    const getFormComponent = () => {
        switch(activeStep) {
            case 0: {
                return <UserAccount classes={classes}/>;
            }
            case 1: {
                return <BusinessLegal classes={classes}/>
            }
            default: {
                return <UserAccount classes={classes}/>;
            }
        }
    }

    const getStepText = () => {
        switch(activeStep) {
            case 0: {
                return 'Regístrate';
            }
            case 1: {
                return 'Siguiente';
            }
            default: {
                return 'Siguiente';
            }
        }
    }

    const steps = getSteps();
    const handleNext = () => {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
    }
    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    }
    return (
        <>
        <Typography variant="h3" className={classes.title}>Registra tu Negocio</Typography>
        <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((step) => (
                <Step key={step}>
                    <StepLabel>{step}</StepLabel>
                </Step>
            ))}
        </Stepper>
        {getFormComponent()}
        <div className={classes.buttonContainer}>
            {activeStep !== 0 && <Button onClick={handleBack}>
                Atrás
            </Button>}
            {activeStep === 0 && <div/>}
            <Button
                className={classes.nexButton}
                color="primary"
                variant="contained"
                type="submit"
                data-tc="submit"
                onClick={handleNext}
            >
                {getStepText()}
            </Button>
        </div>
        </>
    );
  }
);
BusinessRegistration.displayName = "BusinessRegistration";
export default BusinessRegistration;

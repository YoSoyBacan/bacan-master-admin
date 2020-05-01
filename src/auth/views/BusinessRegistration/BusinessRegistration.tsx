import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import { createStyles, Theme, WithStyles, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import useUser from '@saleor/hooks/useUser';
import { ProductUrlQueryParams } from '@saleor/products/urls';
import React from 'react';

import BusinessDetails from './steps/BusinessDetails';
import BusinessLegal from './steps/BusinessLegal';
import { BusinessVariants } from './steps/BusinessVariants';
import UserAccount from './steps/UserAccount';
import RegistrationComplete from './steps/RegistrationComplete';

export interface FormData {
  email: string;
  password: string;
}

const TOKEN = process.env.SERVICE_ACCOUNT_TOKEN;

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
  params: ProductUrlQueryParams;
  onSubmit?(event: FormData);
}

const BusinessRegistration = withStyles(styles, { name: "BusinessRegistration" })(
  ({ classes, params }: BusinessRegistrationProps) => {

    const getSteps = () => {
        return ['Perfil', 'Empresa', 'Negocio Bacán', 'Tarjetas Bacán', 'Listo!'];
    }

    const [ businessId, setBusinessId ] = React.useState('ADMIN-ID');
    const [ buenPlanBusinessId, setBuenPlanBusinessId ] = React.useState('BUEN-PLAN-ID');
    const [ userId, setUserId ] = React.useState('');
    const [ activeStep, setActiveStep ] = React.useState(0);
    const [productId, setProductId] = React.useState('');
    const [ businessLink, setBusinessLink ] = React.useState('');
    const { loginByToken } = useUser();
    const handleNext = async () => {
        if (activeStep === 1) {
            loginByToken(TOKEN);
        }
        setActiveStep(prevActiveStep => prevActiveStep + 1);
    }
    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    }

    const getFormComponent = () => {
        switch(activeStep) {    
            case 0: {
                return <UserAccount classes={classes} setUserId={setUserId} handleNext={handleNext} />;
            }
            case 1: {
              return <BusinessLegal classes={classes} userId={userId} setBusinessId={setBusinessId} handleNext={handleNext} setBuenPlanBusinessId={setBuenPlanBusinessId}/>
            }
            case 2: {
              return <BusinessDetails moveNextPage={handleNext} moveBackPage={handleBack} businessId={businessId} buenPlanBusinessId={buenPlanBusinessId} setProductId={setProductId} setBusinessLink={setBusinessLink}/>
            }
            case 3: {
              return <BusinessVariants id={productId} moveNextPage={handleNext} params={params}/>
            }
            case 4: {
              return <RegistrationComplete classes={classes} businessLink={businessLink}/>;
            }
            default: {
                return <UserAccount classes={classes} setUserId={setUserId} handleNext={handleNext}/>;
            }
        }
    }


    const steps = getSteps();
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
        </>
    );
  }
);
BusinessRegistration.displayName = "BusinessRegistration";
export default BusinessRegistration;

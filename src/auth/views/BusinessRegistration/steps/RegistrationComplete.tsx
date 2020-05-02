import { createStyles, Theme, WithStyles, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';

import Container from '../../../../components/Container';

const styles = (theme: Theme) =>
  createStyles({
    title: {
        flex: 1,
        textAlign: "center",
        paddingBottom: theme.spacing.unit * 2
      },
    svg: {
      margin: 0
    }
  });

export interface RegistrationCompleteProps extends WithStyles<typeof styles> {
  businessLink: string;
}

const RegistrationComplete = withStyles(styles, { name: "RegistrationComplete" })(
  ({classes, businessLink}: RegistrationCompleteProps) => {
    return (
        <>
        <Typography variant="h5" className={classes.title}>Gracias por registrar tu negocio y hacerlo más Bacán!</Typography>
          <Container>
            <Typography variant="subtitle2">
              Quieres recibir más ingresos? Comparte este link <a href={businessLink}>{businessLink}</a> en tus redes sociales para que tus clientes apoyen tu negocio.
                <br/>
                <br/> 1. Copia el Link <a href={businessLink}>{businessLink}</a> 
                <br/> 2.Pegalo en tu Red Social
                <br/> &emsp; a. En intagram pega el link en tu biografía
                <br/> &emsp; b. Comparte el link en las descripciones de tus imágenes
                <br/> &emsp; c. Comparte el link en tu Muro de Facebook
                <br/> &emsp; d. Envia el link a tus contactos en Whatsapp
                <br/>
                <br/> ¡Es muy fácil! Solo corre la voz y verás que más gente apoyará tu negocio.
            </Typography>
          </Container>
        </>
    );
  }
);

RegistrationComplete.displayName = "RegistrationComplete";
export default RegistrationComplete;

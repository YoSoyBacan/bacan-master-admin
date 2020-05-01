import { createStyles, Theme, WithStyles, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import registration from '@assets/images/registration.svg';
import Container from "../../../../components/Container";
import SVG from 'react-inlinesvg';

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

export interface RegistrationCompleteProps extends WithStyles<typeof styles> {}

// const FAKE = true;
const RegistrationComplete = withStyles(styles, { name: "RegistrationComplete" })(
  ({classes}: RegistrationCompleteProps) => {
    return (
        <>
        <Typography variant="h5" className={classes.title}>Gracias por registar tu negocio y hacerlo más Bacán!</Typography>
          <Container>
            <Typography variant="subtitle2">
              Quieres recibir más ingresos? Comparte este link (insertar link) en tus redes sociales para que tus clientes apoyen tu negocio.
                <br/><br/> 1.    Copia el Link
                <br/> 2.    Pegalo en tu Red Social
                <br/> &emsp; a.    Instagram en Intagram pega el link en tu biografía
                <br/> &emsp; b.    Comparte el link en las descripciones de tus imágenes
                <br/> &emsp; c.    Comparte el link en tu Muro de Facebook
                <br/> &emsp; d.    Envia el link a tus contactos en Whatsapp
                <br/><br/> ¡Es muy fácil! Solo corre la voz y verás que más gente apoyará tu negocio.
            </Typography>
              <SVG
                className={classes.svg}
                src={registration} 
              />
          </Container>
        </>
    );
  }
);

RegistrationComplete.displayName = "RegistrationComplete";
export default RegistrationComplete;

import { createStyles, Theme, WithStyles, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';

const styles = (theme: Theme) =>
  createStyles({
    title: {
        flex: 1,
        textAlign: "center"
      },
    subtitle: {
      marginBottom: "30px"
    }
  });

export interface RegistrationCompleteProps extends WithStyles<typeof styles> {
  businessLink: string;
}

// const FAKE = true;
const RegistrationComplete = withStyles(styles, { name: "RegistrationComplete" })(
  ({classes, businessLink}: RegistrationCompleteProps) => {
    return (
        <>
        <Typography variant="h4" className={classes.title}>&#9989; Ya estas 100% registrado en Bacán &#9989; </Typography>
            <Typography variant="subtitle1" className={classes.subtitle}>
            <br/>
              Qué viene ahora? 
                <br/>
                <br/> El lanzamiento de la tienda Bacán y tu administrador personal <a href="https://www.negocio.yosoybacan.com">negocio.yosoybacan.com</a> séra esta semána &#10024;
                <br/> &#10071;Atento a tu email&#10071;
                <br/><br/> En tu administrador podrás ver la informacíon de tus ventas, clientes, tarjetas y podrás hacer los cambios que quieras. 
                <br/><br/> &#128526; Durante esta semana te enviaremos informacíon sobre:
                <br/> &emsp; &emsp;cómo funcionan los pagos a tu cuenta bancaria de tus ventas
                <br/> &emsp; &emsp;cómo podrás redimir las tarjetas de tus compradores
                <br/><br/>Tambien te mandaremos un video explicativo de como funcionara todo. &#128249;
                <br/> Hemos generado un &#128279; link unico &#128279; el cual podras compartir con tus clientes para que te encuentren en Bacán. 
                <br/> Comparte este link cuando tu tienda este lista y puedas acceder a tu perfil&#10071;
                <br/>
                <br/> 
                &emsp;Tu link es: <strong>{businessLink}</strong>
                <br/>
                <br/> &#128076; Te recomendamos  
                <br/>&emsp;&emsp;Pegar el link en tu biografía de Instragram 
                <br/>&emsp;&emsp;Compartir el link en las descripciones de tus imágenes
                <br/>&emsp;&emsp;Comparte el link en tu muro de Facebook
                <br/>&emsp;&emsp;Envia el link a tus contactos en Whatsapp
                <br/>
                <br/>&#128165;¡Es muy fácil! Solo corre la voz y verás que más gente apoyará tu negocio! &#128165;
                <br/>
                <br/>
                <br/>
                - Bacán &#129321;
            </Typography>
        </>
    );
  }
);

RegistrationComplete.displayName = "RegistrationComplete";
export default RegistrationComplete;

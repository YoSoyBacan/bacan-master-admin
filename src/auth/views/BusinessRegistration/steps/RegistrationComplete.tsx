import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { createStyles, Theme, WithStyles, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CardSpacer from '@saleor/components/CardSpacer';
import CardTitle from '@saleor/components/CardTitle';
import Grid from '@saleor/components/Grid';
import React, { useEffect } from 'react';

const styles = (theme: Theme) =>
  createStyles({
    title: {
        flex: 1,
        textAlign: "center"
      },
    subtitle: {
      marginBottom: "30px"
    },
    sectionTitle: {
      paddingBottom: theme.spacing.unit * 1,
      fontWeight: 600
    },
    sectionSubtitle: {
      paddingBottom: theme.spacing.unit * 1,
      fontWeight: 400
    }
  });

export interface RegistrationCompleteProps extends WithStyles<typeof styles> {
  businessLink: string;
}

const RegistrationComplete = withStyles(styles, { name: "RegistrationComplete" })(
  ({classes, businessLink}: RegistrationCompleteProps) => {
    useEffect(() => {
      setTimeout(() => {
        document.querySelector("#content-panel").scrollTo({ top: 0, behavior: 'smooth'});
      }, 100);
    }, []);
    return (
        <>
          <Typography variant="h4" className={classes.title}>&#9989; Ya estas 100% registrado en Bacán &#9989; </Typography>
            <Grid variant="uniform">
            <Card>
              <CardTitle 
                title="Información Bacán"
              />
              <CardContent>
                <Typography variant="subtitle1" className={classes.sectionTitle}>Más Información en tu E-mail &#128526; : </Typography>
                <Typography variant="body1" className={classes.subtitle}>
                  <br/> ¿ Cómo funcionan los pagos a tu cuenta bancaria de tus ventas ?

                  <br/> <br/> ¿ Cómo podrás redimir las tarjetas de tus compradores ?
                  <br/><br/>También te mandaremos un video explicativo de como funcionará todo. &#128249;
                </Typography>
                <Typography variant="caption"> Esto lo enviaremos en el transcurso de 1 semana. </Typography>
              </CardContent>
            </Card>
            <Card>
              <CardTitle 
                title="Tu Link Bacán"
              />
              <CardContent>
                <Typography variant="subtitle1" className={classes.sectionTitle}>&emsp;&emsp;&emsp;&emsp;<strong>{businessLink}</strong></Typography>
                <CardSpacer/>
                <Typography variant="subtitle1">Te recomendamos &#128076;: </Typography>
                <Typography variant="body1">
                  <ul>
                    <li>Pega el link en tu biografía de Instragram.</li>
                    <li>Comparte el link en las descripciones de tus imágenes.</li>
                    <li>Comparte el link en tu muro de Facebook.</li>
                    <li>Envia el link a tus contactos en Whatsapp</li>
                  </ul>
                </Typography>
                <CardSpacer/>
                <Typography variant="caption" className={classes.sectionTitle}>Recuerda, la Tienda Bacán va estar lista el Martes 5 de Mayo, 2020</Typography>
              </CardContent>
            </Card>
            <Card>
              <CardTitle 
                title="Administrador de Negocio Bacán"
              />
              <CardContent>
                <Typography variant="body1">
                  El lanzamiento de la tienda Bacán y tu administrador personal <a href="https://www.negocio.yosoybacan.com">negocio.yosoybacan.com</a> séra esta semana &#10024;
                </Typography>
                <CardSpacer/>
                <Typography variant="body1">
                  &#10071;Atento a tu email&#10071;
                </Typography>
                <CardSpacer/>
                <Typography variant="body1">
                  Espera nuestro e-mail con información de como usar tu Administrador Bacán y cuando ya esté al aire.
                </Typography>
                <CardSpacer/>
                <Typography variant="body1">
                  En tu perfil podrás ver la informacíon de tus ventas, clientes, tarjetas y podrás hacer los cambios que quieras para personalizar tu negocio.
                </Typography>
              </CardContent>
            </Card>
            <Card>
              <CardTitle
                title="Comparte"
              />
              <CardContent>
                <Typography variant="subtitle1" className={classes.sectionSubtitle}>Bacán Crece Cuando Todos Crecen</Typography>
                <br/>
                <br/>
                <Typography variant="body1">
                  Compartir tu link Bacán es la mejor manera de atraer a tus clientes a tu tienda de Tarjetas Bacan.
                  <br/><br/>
                </Typography>
                <CardSpacer/>
                <Typography variant="body1">
                  Comparte este proyecto con tus familiares, amigos o conocidos que necesitas un canal de ventas on-line.
                </Typography>
                <CardSpacer/>
                <Typography variant="subtitle2">
                  <br/>&#128165;¡Es muy fácil! Solo corre la voz y verás que más gente apoyará tu negocio! &#128165;
                </Typography>
                <Typography variant="subtitle2">
                  <br/>Comparte <a href="https://www.registro.yosoybacan.com">registro.yosoybacan.com</a>.
                  <br/><br/> Al Ecuador lo activamos todos juntos.
                </Typography>
              </CardContent>
            </Card>
            <Typography variant="h5" className={classes.sectionTitle}>- Team Bacán &#129321;</Typography>
          </Grid>
        </>
    );
  }
);

RegistrationComplete.displayName = "RegistrationComplete";
export default RegistrationComplete;

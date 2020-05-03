import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardSpacer from '@saleor/components/CardSpacer';
import { createStyles, Theme, WithStyles, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
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
                title="¿ Qué viene ahora?"
              />
              <CardContent>
                <Typography variant="subtitle1">&#128526; Espera la Siguiente Información: </Typography>
                <Typography variant="body1" className={classes.subtitle}>
                  <br/> &emsp; &emsp;¿ Cómo funcionan los pagos a tu cuenta bancaria de tus ventas

                  <br/> <br/> &emsp; &emsp;¿ Cómo podrás redimir las tarjetas de tus compradores
                  <br/><br/>También te mandaremos un video explicativo de como funcionará todo. &#128249;
                </Typography>
                <Typography variant="caption"> Esto lo enviaremos en el transcurso de 1 semana. </Typography>
              </CardContent>
            </Card>
            <Card>
              <CardTitle 
                title="¿ Cómo empiezo a vender ?"
              />
              <CardContent>
                <Typography variant="h5" className={classes.sectionTitle}>Tu Link Único</Typography>
                <Typography variant="subtitle1" className={classes.sectionTitle}><strong>{businessLink}</strong></Typography>
                <CardSpacer/>
                <Typography variant="subtitle1">&#128076; Te recomendamos: </Typography>
                <Typography variant="body1">
                    &emsp;&emsp;Pegar el link en tu biografía de Instragram. 
                    <br/><br/>
                    &emsp;&emsp;Compartir el link en las descripciones de tus imágenes.
                    <br/><br/>
                    &emsp;&emsp;Comparte el link en tu muro de Facebook.
                    <br/><br/>
                    &emsp;&emsp;Envia el link a tus contactos en Whatsapp.
                    <br/><br/>
                </Typography>
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
                  <br/> <br/> &#10071;Atento a tu email&#10071;
                  <br/><br/> En tu administrador podrás ver la informacíon de tus ventas, clientes, tarjetas y podrás hacer los cambios que quieras. 
                </Typography>
              </CardContent>
            </Card>
            <Card>
              <CardTitle
                title="Comparte"
              />
              <CardContent>
                <Typography variant="subtitle1">Bacán Crece Cuando Todos Crecen</Typography>
                <br/>
                <br/>
                <Typography variant="body1">
                  Comparte este proyecto con tus familiares, amigos o conocidos que necesitan un canal de ventas online.
                  <br/><br/>
                  Entre más Negocios Bacán tengamos, más clientes van a entrar a la plataforma y vas a vender muchos más .
                </Typography>

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

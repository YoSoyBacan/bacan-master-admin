import blueGiftCard from '@assets/images/blue_gift_card.png';
import redGiftCard from '@assets/images/red_gift_card.png';
import yellowGiftCard from '@assets/images/yellow_gift_card.png';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { createStyles, Theme, WithStyles, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CardSpacer from '@saleor/components/CardSpacer';
import React from 'react';


const styles = (theme: Theme) =>
  createStyles({
    illustrationContainer: {
      display: "flex",
      justifyContent: "space-between",
      paddingTop: theme.spacing() * 2,
      paddingBottom: theme.spacing() * 2
    },
    text: {
      flex: 1,
      paddingBottom: theme.spacing() * 2,
    },
    title: {
      fontSize: "1rem",
      fontWeight: 900
    },
    formTitle: {
      fontSize: "2rem",
      fontWeight: 600,
      padding: theme.spacing() * 1,
      paddingLeft: theme.spacing() * 2,
      [theme.breakpoints.down("sm")]: {
        fontSize: "1.5rem",
        fontWeight: 600,
      }
    },
    giftCardImage: { 
      height: "33%",
      objectFit: "contain",
      width: "33%"
    },
  });

interface WelcomeCardProps extends WithStyles<typeof styles> {
}


const WelcomeCardComponent: React.FC<WelcomeCardProps> = ({ classes }: WelcomeCardProps) => {
  return (
    <>
    <Card>
      <Typography className={classes.formTitle}>
          ¿Listo para vender Online?
      </Typography>
      <CardContent>
        <div className={classes.illustrationContainer}>
          <img src={yellowGiftCard} className={classes.giftCardImage} />
          <img src={blueGiftCard} className={classes.giftCardImage} />
          <img src={redGiftCard} className={classes.giftCardImage} />
        </div>
        <CardSpacer/>
        <Typography className={classes.text}>
          Regístrate en menos de 5 minutos en Bacán! <br/> <br/> <br/> Al completar este proceso estarás registrado para vender online en la plataforma de Bacán. <br/> Te ofrecemos una plataforma GRATIS para vender Tarjetas Bacán con descuentos exclusivos a tus clientes.
          Te daremos acceso a un Link ÚNICO para tu negocio, que lo puedes compartir en cualquier canal digital para incrementar tus ventas.
          <br/> <br/>
          Alista logos e imágenes de tu empresa y tus productos para tu perfil en yosoybacan.com
        </Typography>
        <CardSpacer/>
        <Typography className={classes.text}>
          Te pediremos unos datos importantes de tu empresa para asegurarnos que puedas vender y recibir tus pagos efectivamente.
          Recuerda, Bacán es una plataforma digital 100% sin ánimo de lucro así que empieza ya con tu registro!
        </Typography>

      </CardContent>
    </Card>
    </>
  )
}

export const WelcomeCard = withStyles(styles, { name: 'WelcomeCard'})(WelcomeCardComponent)
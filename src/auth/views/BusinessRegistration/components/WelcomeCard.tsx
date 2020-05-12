import blueGiftCard from '@assets/images/blue_gift_card.png';
import redGiftCard from '@assets/images/red_gift_card.png';
import yellowGiftCard from '@assets/images/yellow_gift_card.png';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { createStyles, Theme, WithStyles, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CardSpacer from '@saleor/components/CardSpacer';
import ControlledCheckbox from '@saleor/components/ControlledCheckbox';
import classnames from 'classnames';
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
    formSubtitle: {
      fontSize: "1.5rem",
      fontWeight: 400,
      paddingTop: theme.spacing() * 2,
      [theme.breakpoints.down("sm")]: {
        fontSize: "0.8rem",
        fontWeight: 400,
      }
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
    checkboxContainer: {
      display: 'flex',
      flexDirection: 'column',
      border: `2px solid #1d224c`,
      padding: theme.spacing() * 1,
    }
  });

interface WelcomeCardProps extends WithStyles<typeof styles> {
}


const WelcomeCardComponent: React.FC<WelcomeCardProps> = ({ classes }: WelcomeCardProps) => {
  const [photoSelected, setPhotoSelected] = React.useState(false);
  const [docsSecleted, setDocSelected] = React.useState(false);
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
        <Typography variant="caption">
          Te recomendamos llenar este Registro en una computadora, en Google Chrome Versión 80 o superior.
        </Typography>
        <CardSpacer/>
        <Typography variant="h5" className={classes.text}>
          Regístrarse es rápido y completamente 💥GRATIS 💥
        </Typography>
        <CardSpacer />
        <div className={classes.checkboxContainer}>
          <Typography variant="h5" className={classnames(classes.text, classes.formSubtitle)}>
            ¿ Tienes listos los siguientes datos? 
          </Typography>
          <Typography variant="caption" className={classes.text}>
            Para agilitar el proceso de registro, y que puedas empezar a vender.
          </Typography>
          <ControlledCheckbox 
            name="pictures"
            label="Fotos de tu Empresa 📸"
            checked={photoSelected}
            onChange={() => setPhotoSelected(!photoSelected)}
          />
          <ControlledCheckbox 
            name="legal"
            label="Datos de RUC y Representante Legal 📖"
            checked={docsSecleted}
            onChange={() => setDocSelected(!docsSecleted)}
          />
        </div>
        <CardSpacer />
        <Typography className={classes.text}>
          Al completar este proceso estarás registrado para vender online en la plataforma de Bacán.
        </Typography>
        <CardSpacer />
        <Typography className={classes.text}>
          Te daremos acceso a un Link ÚNICO para tu negocio, que lo puedes compartir en cualquier canal digital para incrementar tus ventas.
        </Typography>
        <Typography className={classes.text}>
          Completa tu registro 👇🏼👇🏼👇🏼👇🏼
        </Typography>
      </CardContent>
    </Card>
    </>
  )
}

export const WelcomeCard = withStyles(styles, { name: 'WelcomeCard'})(WelcomeCardComponent)
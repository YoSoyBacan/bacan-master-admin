import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { createStyles, Theme, WithStyles, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/lab/Slider';
import CardSpacer from '@saleor/components/CardSpacer';
import CardTitle from '@saleor/components/CardTitle';
import React from 'react';




const styles = (theme: Theme) =>
  createStyles({
    buttonContainer: {
      display: "flex",
      justifyContent: "space-between",
      paddingTop: theme.spacing() * 2,
      paddingBottom: theme.spacing() * 2
    },
    nexButton: {
      width: 140
    },
    title: {
      flex: 1,
      paddingBottom: theme.spacing() * 2,
    }
  });
function valuetext(value: number) {
  return `$${value}`;
}

interface SalesObjectiveCardProps extends WithStyles<typeof styles> {
  setSalesObjective: (value: number) => void;
  errors: { [key: string]: string };
  data: {
    salesObjective: number;
  };
}


const SalesObjectiveCardComponent: React.FC<SalesObjectiveCardProps> = ({ setSalesObjective, data, classes}: SalesObjectiveCardProps) => {
  return (
    <Card>
      <CardTitle
        title="Objetivo Mensual de Ventas"
      />
      <CardContent>
        <Typography id="sales-slider" gutterBottom className={classes.title}>
          {`Valor: ${valuetext(data.salesObjective)}`}
        </Typography>
        <Slider 
          value={data.salesObjective}
          onChange={(_: any, value: number) => {
            setSalesObjective(value);
          }}
          max={25000}
          min={0}
          step={500}
        />
        <CardSpacer/>
        <CardSpacer/>
        <Typography className={classes.title} variant="subtitle2">
            Con este monto puedo mantener mi negocio funcionando, pagando la nómina y pagando a mis proveedores cada mes.
        </Typography>
      </CardContent>
    </Card>
  )
}

export const SalesObjectiveCard = withStyles(styles, { name: 'SalesObjectiveCard'})(SalesObjectiveCardComponent)
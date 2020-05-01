import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { createStyles, Theme, WithStyles, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/lab/Slider';
import CardTitle from '@saleor/components/CardTitle';
import React from 'react';




const styles = (theme: Theme) =>
  createStyles({
    buttonContainer: {
      display: "flex",
      justifyContent: "space-between",
      paddingTop: theme.spacing.unit * 2,
      paddingBottom: theme.spacing.unit * 2
    },
    nexButton: {
      width: 140
    },
    title: {
      flex: 1,
      paddingBottom: theme.spacing.unit * 2,
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
        title="Objetivo de Ventas"
      />
      <CardContent>
        <Typography id="sales-slider" gutterBottom className={classes.title}>
          {`Objetivo ${valuetext(data.salesObjective)}`}
        </Typography>
        <Slider 
          value={data.salesObjective}
          onChange={(_: any, value: number) => {
            setSalesObjective(value);
          }}
          max={100000}
          min={0}
          step={1000}
        />
      </CardContent>
    </Card>
  )
}

export const SalesObjectiveCard = withStyles(styles, { name: 'SalesObjectiveCard'})(SalesObjectiveCardComponent)
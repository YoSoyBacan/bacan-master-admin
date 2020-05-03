import { Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';
import classNames from 'classnames';
import React from 'react';

import { CardVariantCreateStep } from './types';

interface Step {
  label: string;
  value: CardVariantCreateStep;
}

const useStyles = makeStyles(
  (theme: Theme) => ({
    label: {
      fontSize: 14,
      textAlign: "center"
    },
    root: {
      borderBottom: `1px solid ${theme.palette.divider}`,
      display: "flex",
      justifyContent: "space-between",
      marginBottom: theme.spacing.unit * 3
    },
    tab: {
      flex: 1,
      paddingBottom: theme.spacing.unit,
      userSelect: "none"
    },
    tabActive: {
      fontWeight: 600
    },
    tabVisited: {
      borderBottom: `3px solid ${theme.palette.primary.main}`,
      cursor: "pointer"
    }
  }),
  {
    name: "CardVariantCreateTabs"
  }
);
function getSteps(): Step[] {
  return [
    {
      label: "Tarjetas Bacán",
      value: "values"
    },
    {
      label: "Descuentos",
      value: "discount"
    },
    {
      label: "Resumen",
      value: "summary"
    }
  ];
}
export interface CardVariantCreateTabsProps {
  step: CardVariantCreateStep;
  onStepClick: (step: CardVariantCreateStep) => void;
}


const CardVariantCreateTabs: React.FC<CardVariantCreateTabsProps> = props => {
  const { step: currentStep, onStepClick } = props;
  const classes = useStyles(props);
  const steps = getSteps();

  return (
    <div className={classes.root}>
      {steps.map((step, stepIndex) => {
        const visitedStep =
          steps.findIndex(step => step.value === currentStep) >= stepIndex;

        return (
          <div
            className={classNames(classes.tab, {
              [classes.tabActive]: step.value === currentStep,
              [classes.tabVisited]: visitedStep
            })}
            onClick={visitedStep ? () => onStepClick(step.value) : undefined}
            key={step.value}
          >
            <Typography className={classes.label} variant="caption">
              {step.label}
            </Typography>
          </div>
        );
      })}
    </div>
  );
}

CardVariantCreateTabs.displayName = "CardVariantCreateTabs";
export default CardVariantCreateTabs;
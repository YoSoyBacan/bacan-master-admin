import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Theme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';
import { TypedSaleCataloguesAdd } from '@saleor/discounts/mutations';
import { SaleCataloguesAdd } from '@saleor/discounts/types/SaleCataloguesAdd';
import useModalDialogErrors from '@saleor/hooks/useModalDialogErrors';
import useModalDialogOpen from '@saleor/hooks/useModalDialogOpen';
import { ProductVariantBulkCreateInput } from '@saleor/types/globalTypes';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import CardVariantCreateContent, { CardVariantCreateContentProps } from './CardVariantCreateContent';
import { CardVariantCreateFormData, createInitialForm } from './form';
import reduceProductVariantCreateFormData from './reducer';
import { CardVariantCreateStep } from './types';

const useStyles = makeStyles((theme: Theme) => ({
  button: {
    marginLeft: theme.spacing.unit * 2
  },
  content: {
    overflowX: "visible",
    overflowY: "hidden",
    width: 800
  },
  spacer: {
    flex: 1
  }
}));

function canHitNext(
  step: CardVariantCreateStep,
  data: CardVariantCreateFormData
): boolean {
  switch (step) {
    case "values":
      return data.attributes.every(attribute => attribute.values.length > 0);
    case "summary":
      return data.variants.every(variant => variant.sku !== "");
    default:
      return false;
  }
}

export interface CardVariantCreateDialogProps
  extends Omit<
    CardVariantCreateContentProps,
    "data" | "dispatchFormDataAction" | "step" | "onStepClick"
  > {
  productId: string;
  open: boolean;
  onClose: () => void;
  onSubmit: (data: ProductVariantBulkCreateInput[]) => void;
}

const CardVariantCreateDialog: React.FC<
  CardVariantCreateDialogProps
> = props => {
  const {
    attributes,
    errors: apiErrors,
    open,
    onClose,
    onSubmit,
    productId,
    ...contentProps
  } = props;
  const classes = useStyles(props);
  const [step, setStep] = React.useState<CardVariantCreateStep>("values");

  function handleNextStep() {
    switch (step) {
      case "values":
        setStep("summary");
        break;
    }
  }

  function handlePrevStep() {
    switch (step) {
      case "summary":
        setStep("values");
        break;
    }
  }

  const [data, dispatchFormDataAction] = React.useReducer(
    reduceProductVariantCreateFormData,
    createInitialForm(attributes)
  );

  const reloadForm = () =>
    dispatchFormDataAction({
      data: createInitialForm(attributes),
      type: "reload"
    });

  React.useEffect(reloadForm, [attributes.length]);

  useModalDialogOpen(open, {
    onClose: () => {
      reloadForm();
      setStep("values");
    }
  });

  const errors = useModalDialogErrors(apiErrors, open);

  const handleCatalogueAdd = (catalogAddData: SaleCataloguesAdd) => {
    if (catalogAddData.saleCataloguesAdd.errors.length === 0) {
      onSubmit(data.variants)
    }
  }
  return (
    <TypedSaleCataloguesAdd onCompleted={handleCatalogueAdd}>
      {(saleCataloguesAdd) => {

        return (
          <Dialog open={open} maxWidth="md">
          <DialogTitle>
            <FormattedMessage
              defaultMessage="Elige tus Tarjetas Bacán"
              description="dialog header"
            />
          </DialogTitle>
          <DialogContent className={classes.content}>
            <CardVariantCreateContent
              {...contentProps}
              attributes={attributes}
              data={data}
              dispatchFormDataAction={dispatchFormDataAction}
              errors={errors}
              step={step}
              onStepClick={step => setStep(step)}
            />
          </DialogContent>
          <DialogActions>
            <Button className={classes.button} onClick={onClose}>
              <FormattedMessage defaultMessage="Cancelar" description="button" />
            </Button>
            <div className={classes.spacer} />
            {step !== "values" && (
              <Button
                className={classes.button}
                color="primary"
                onClick={handlePrevStep}
              >
                <FormattedMessage
                  defaultMessage="Atrás"
                  description="previous step, button"
                />
              </Button>
            )}
            {step !== "summary" ? (
              <Button
                className={classes.button}
                color="primary"
                disabled={!canHitNext(step, data)}
                variant="contained"
                onClick={handleNextStep}
              >
                <FormattedMessage defaultMessage="Siguiente" description="button" />
              </Button>
            ) : (
              <Button
                className={classes.button}
                color="primary"
                disabled={!canHitNext(step, data)}
                variant="contained"
                onClick={() => saleCataloguesAdd({
                  variables: {
                    id: data.sale.id,
                    input: {
                      products: [productId]
                    }
                  }
                })}
              >
                <FormattedMessage
                  defaultMessage="Finalizar"
                  description="create multiple variants, button"
                />
              </Button>
            )}
          </DialogActions>
        </Dialog>
        )
      }}
    </TypedSaleCataloguesAdd>
  );
};

CardVariantCreateDialog.displayName = "CardVariantCreateDialog";
export default CardVariantCreateDialog;

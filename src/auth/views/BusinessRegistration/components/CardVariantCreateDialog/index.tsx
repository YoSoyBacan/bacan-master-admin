import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Theme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';
import ConfirmButton, { ConfirmButtonTransitionState } from '@saleor/components/ConfirmButton';
import { TypedSaleCataloguesAddLean } from '@saleor/discounts/mutations';
import { SaleCataloguesAdd } from '@saleor/discounts/types/SaleCataloguesAdd';
import useModalDialogErrors from '@saleor/hooks/useModalDialogErrors';
import useModalDialogOpen from '@saleor/hooks/useModalDialogOpen';
import useNotifier from '@saleor/hooks/useNotifier';
import { ProductVariantBulkCreateInput } from '@saleor/types/globalTypes';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import CardVariantCreateContent, { CardVariantCreateContentProps } from './CardVariantCreateContent';
import { CardVariantCreateFormData, createInitialForm } from './form';
import reduceProductVariantCreateFormData from './reducer';
import { CardVariantCreateStep } from './types';

const useStyles = makeStyles((theme: Theme) => ({
  button: {
    marginLeft: theme.spacing() * 2
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
    case "discount":
      return !!data.sale && !!data.sale.id;
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
  onSelectDiscountValue: (discValue: number) => void;
  saveButtonBarState: ConfirmButtonTransitionState;
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
    saveButtonBarState,
    onSelectDiscountValue,
    ...contentProps
  } = props;
  const classes = useStyles(props);
  const [step, setStep] = React.useState<CardVariantCreateStep>("values");
  const notify = useNotifier();

  function handleNextStep() {
    switch (step) {
      case "discount":
        setStep("summary");
        break;
      case "values":
        setStep("discount");
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
      onSelectDiscountValue(Number(data.sale.value));
    }
  }
  if (saveButtonBarState === 'success') {
    onClose();
  }
  return (
    <TypedSaleCataloguesAddLean onCompleted={handleCatalogueAdd}>
      {(saleCataloguesAdd) => {

        const handleSubmit = () => {
          if (!data.sale || !data.sale.id) {
            notify( { text: 'Por favor, selecciona un descuento para tus Tarjetas Bacán'});
            return;
          }
          if (!data.variants || data.variants.length === 0) {
            notify( { text: 'Por favor, selecciona por lo menos un valor de Tarjeta Bacán'});
            return;
          }
          saleCataloguesAdd({
            variables: {
              id: data.sale.id,
              input: {
                products: [productId]
              }
            }
          });
          return;
        }
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
              <ConfirmButton
                className={classes.button}
                disabled={!canHitNext(step, data)}
                data-tc="submit"
                transitionState={saveButtonBarState}
                onClick={handleSubmit}
              >
                Finalizar
              </ConfirmButton>
            )}
          </DialogActions>
        </Dialog>
        )
      }}
    </TypedSaleCataloguesAddLean>
  );
};

CardVariantCreateDialog.displayName = "CardVariantCreateDialog";
export default CardVariantCreateDialog;

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { createStyles, Theme, WithStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import ConfirmButton from '@saleor/components/ConfirmButton';
import Form from '@saleor/components/Form';
import { FormSpacer } from '@saleor/components/FormSpacer';
import useNotifier from '@saleor/hooks/useNotifier';
import React, { useEffect } from 'react';

import RadioGroupField from '../../../../components/RadioGroupField';
import * as AdminClient from '../../../../fetch/adminClient';

enum BankAccountType {
  AHORROS = "Ahorros",
  CORRIENTE = "Corriente",
}

export enum BankOptions {
  PRODUBANCO = 'Produbanco',
  PICHINCHA = 'Banco del Pichincha',
  GUAYAQUIL = 'Banco de Guayaquil',
  BANCO_PACIFICO = 'Banco de Pacifico',
  BANCO_INTERNACIONAL = "Banco Internacional",
  BANCO_SOLIDARIO = "Banco Solidario",
  BANCO_DINERS_CLUB = "Banco Diners Club",
  BANCO_PRO_CREDIT = "Banco ProCredit",
  BANCO_BOLIVARIANO = "Banco Bolivariano",
  BIESS = "BIESS",
  BANCO_GENERAL_RUMINAUI = "Banco General Rumiñahui",
  BANCO_LOJA = "Banco de Loja",
  BANCO_MACHALA = "Banco de Machala"
}

const BankOptionsList = [
  BankOptions.PRODUBANCO,
  BankOptions.PICHINCHA,
  BankOptions.GUAYAQUIL,
  BankOptions.BANCO_PACIFICO,
  BankOptions.BANCO_INTERNACIONAL,
  BankOptions.BANCO_SOLIDARIO,
  BankOptions.BANCO_DINERS_CLUB,
  BankOptions.BANCO_PRO_CREDIT,
  BankOptions.BANCO_BOLIVARIANO,
  BankOptions.BIESS,
  BankOptions.BANCO_GENERAL_RUMINAUI,
  BankOptions.BANCO_LOJA,
  BankOptions.BANCO_MACHALA
]

enum EntityType {
  PERSONA_NATURAL = "Persona Natural",
  PERSONA_JURIDICA = "Persona Jurídica",
}

export interface FormData {
  /* Business */
  legalName: string;
  businessLegalId: string;
  numEmployees: number | null;
  businessAddress: string;
  businessCity: string;
  entityType: EntityType | null;
  hasAccounting: string;
  businessPhone: string;
  businessRegisteredAt: string | null;

  /* Bank */
  bankName: BankOptions | null;
  bankBeneficiaryName: string;
  bankAccountType: BankAccountType | null;
  bankAccountNumber: string;

  /* Rep Legal */
  businessEmail: string;
  businessPersonName: string;
  businessPersonId: string;
}

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
    link: {
      color: theme.palette.primary.main,
      cursor: "pointer",
      textAlign: "center",
    },
    loginButton: {
      width: 140,
    },
    title: {
      flex: 1,
      paddingBottom: theme.spacing.unit * 2,
    },
    panel: {
      "& span": {
        color: theme.palette.error.contrastText,
      },
      background: theme.palette.error.main,
      borderRadius: theme.spacing.unit,
      marginBottom: theme.spacing.unit * 3,
      padding: theme.spacing.unit * 1.5,
    },
  });

export interface UserAccountProps extends WithStyles<typeof styles> {
  userId: string;
  setBusinessId: (businessId: string) => void;
  handleNext: () => void;
  setBuenPlanBusinessId: (bizId: string) => void;
}
// const FAKE = true;

const BusinessLegal = withStyles(styles, { name: "LoginCard" })(
  ({ classes, handleNext, userId, setBusinessId, setBuenPlanBusinessId }: UserAccountProps) => {
    const notify = useNotifier();
    const [ loading, setLoading ] = React.useState(false);
    const [ errors, setErrors ] = React.useState<Array<{field: string, message: string}>>([]);
    const setNewError = (field: string, message: string) => {
      const newErrors = [...errors];
      newErrors.push({ field, message});
      setErrors(newErrors);
    }

    useEffect(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);
    const initialData: FormData = {
      legalName: "",
      businessLegalId: "",
      numEmployees: null,
      businessRegisteredAt: null,
      businessAddress: "",
      businessCity: "",
      entityType: null,
      hasAccounting: "",
      businessPhone: "",
      bankName: null,
      bankBeneficiaryName: "",
      bankAccountType: null,
      bankAccountNumber: "",
      businessEmail: "",
      businessPersonName: "",
      businessPersonId: "",

    };

    const getErrorField = (field: string) => {
      const errorFound = errors.find(err => err.field === field);
      const finalResult = {
        hasError: false,
        errorText: ''
      };
      if (!errorFound) {
        return finalResult;
      }
      finalResult.hasError = true;
      finalResult.errorText = errorFound.message;
      return finalResult;
    };


    const handleSubmit = async (data: FormData) => {
      setLoading(true);

      const values = Object.values(data);
      if ( values.includes("") || values.includes(null) ){
        notify({ text: 'Por favor llena todos los campos requeridos.' });
        setLoading(false);
        return;
      }

      if ( data.businessPhone.length < 7){
        notify({ text: 'El telefono de tu empresa tiene que ser mayor de 7 digitos' });
        setLoading(false);
        return;
      }

      if ( data.businessPersonId.length < 9 ){
        notify({ text: 'La cédula del representate legal tiene que se mayor de 9 digitos' });
        setLoading(false);
        return;
      }

      if (!/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(data.businessEmail)){
        setNewError('businessEmail', 'El formato del e-mail es incorrecto.');
        setLoading(false);
        return;
      }
      try {
        const newBusiness = await AdminClient.post<{_id: string, buenPlanProviderId: string}>('business', {
          ...data,
          owner: userId
        });
        setBusinessId(newBusiness.data._id);
        setBuenPlanBusinessId(newBusiness.data.buenPlanProviderId);
        setLoading(false);
        handleNext();
      } catch(error) {
        const newErrors = [...errors];
        newErrors.push({ field: 'legalName', message: 'Información ingresada es incorrecta'});
        setErrors(newErrors);
        setLoading(false);
      }
    }
    const tranState = loading ? 'loading' : 'default';
    return (
      <>
        <Form
          initial={initialData}
          onSubmit={handleSubmit}
        >
          {({ change: handleChange, data, submit }) => (
            <>
              <Typography variant="h5" className={classes.title}>
                Información de la Empresa
              </Typography>
              <TextField
                autoFocus
                fullWidth
                required
                label={"Razón Social"}
                name="legalName"
                onChange={handleChange}
                value={data.legalName}
                inputProps={{
                  "data-tc": "legalName",
                }}
                helperText={"Nombre legal de tu empresa en el SRI."}
              />
              <FormSpacer />
              <TextField
                autoFocus
                fullWidth
                required
                label={"RUC"}
                name="businessLegalId"
                onChange={handleChange}
                value={data.businessLegalId}
                inputProps={{
                  "data-tc": "businessLegalId",
                }}
              />
              <FormSpacer />
              <TextField
                label="Fecha de Constitución"
                name="businessRegisteredAt"
                type="date"
                required
                InputLabelProps={{
                  shrink: true
                }}
                fullWidth
                onChange={handleChange}
                value={data.businessRegisteredAt}
              />
              <FormSpacer />
              <TextField
                autoFocus
                fullWidth
                required
                label={"Número de Empleados"}
                name="numEmployees"
                onChange={handleChange}
                value={data.numEmployees}
                inputProps={{
                  "data-tc": "numEmployees",
                }}
              />
              <FormSpacer />
              <TextField
                autoFocus
                fullWidth
                required
                label={"Dirección de la Empresa"}
                name="businessAddress"
                onChange={handleChange}
                value={data.businessAddress}
                inputProps={{
                  "data-tc": "businessAddress",
                }}
              />
              <FormSpacer />
              <TextField
                autoFocus
                fullWidth
                required
                label={"Ciudad de la Empresa"}
                name="businessCity"
                onChange={handleChange}
                value={data.businessCity}
                inputProps={{
                  "data-tc": "businessCity",
                }}
              />
              <FormSpacer />
              <TextField
                autoFocus
                fullWidth
                required
                label={"Teléfono de la Empresa"}
                name="businessPhone"
                onChange={handleChange}
                value={data.businessPhone}
                inputProps={{
                  "data-tc": "businessPhone",
                }}
              />
              <FormSpacer />
              <>
                <InputLabel>Tipo de Personería</InputLabel>
                <Select
                  fullWidth
                  required
                  id="pais-select"
                  value={data.entityType}
                  name="entityType"
                  onChange={handleChange}
                >
                  <MenuItem value={EntityType.PERSONA_JURIDICA}>
                    Persona Jurídica
                  </MenuItem>
                  <MenuItem value={EntityType.PERSONA_NATURAL}>
                    Persona Natural
                  </MenuItem>
                </Select>
              </>
              <FormSpacer />
              <RadioGroupField
                choices={[
                  {
                    label: "Si",
                    value: "true",
                  },
                  {
                    label: "No",
                    value: "false",
                  },
                ]}
                label="Estás obligado a Llevar Contabilidad?"
                name="hasAccounting"
                onChange={handleChange}
                value={data.hasAccounting}
              />
              <FormSpacer />
              <Typography variant="h5" className={classes.title}>
                Información de Representante Legal
              </Typography>
              <FormSpacer />
              <TextField
                autoFocus
                fullWidth
                required
                label={"Nombre de Representante Legal"}
                name="businessPersonName"
                onChange={handleChange}
                value={data.businessPersonName}
                inputProps={{
                  "data-tc": "businessPersonName",
                }}
              />
              <FormSpacer />
              <TextField
                autoFocus
                fullWidth
                required
                label={"Cédula Representante Legal"}
                name="businessPersonId"
                onChange={handleChange}
                value={data.businessPersonId}
                inputProps={{
                  "data-tc": "businessPersonId",
                }}
              />
              <FormSpacer />
              <TextField
                autoFocus
                fullWidth
                required
                label={"E-mail Representante Legal"}
                name="businessEmail"
                onChange={handleChange}
                value={data.businessEmail}
                inputProps={{
                  "data-tc": "businessEmail",
                }}
                error={getErrorField('nextError').hasError}
                helperText={getErrorField('nextError').errorText}
              />
              <FormSpacer />
              <Typography variant="h5" className={classes.title}>
                Información de Banco
              </Typography>
              
              <Typography variant="subtitle2">
                Necesitamos esta información para depositar las ventas de tus Tarjetas Bacán.
              </Typography>
              <FormSpacer />
              <>
                <InputLabel>Nombre de Banco</InputLabel>
                <Select
                  fullWidth
                  required
                  id="bank-select"
                  value={data.bankName}
                  name="bankName"
                  onChange={handleChange}
                >
                  {
                    BankOptionsList.map((bank) => (
                      <MenuItem value={bank}>
                        {bank}
                      </MenuItem>
                    ))
                  }
                </Select>
              </>
              <FormSpacer />
              <>
                <InputLabel >Tipo de Cuenta</InputLabel>
                <Select
                  fullWidth
                  required
                  id="account-select"
                  value={data.bankAccountType}
                  name="bankAccountType"
                  onChange={handleChange}
                >
                  <MenuItem value={BankAccountType.AHORROS}>Ahorros</MenuItem>
                  <MenuItem value={BankAccountType.CORRIENTE}>
                    Corriente
                  </MenuItem>
                </Select>
              </>
              <FormSpacer />
              <TextField
                autoFocus
                fullWidth
                required
                label={"Beneficiario de Cuenta"}
                name="bankBeneficiaryName"
                onChange={handleChange}
                value={data.bankBeneficiaryName}
                inputProps={{
                  "data-tc": "bankBeneficiaryName",
                }}
              />
              <FormSpacer />
              <TextField
                autoFocus
                fullWidth
                required
                label={"Número de Cuenta"}
                name="bankAccountNumber"
                onChange={handleChange}
                value={data.bankAccountNumber}
                inputProps={{
                  "data-tc": "bankAccountNumber",
                }}
              />
              <div className={classes.buttonContainer}>
                <div/>
                  <ConfirmButton
                    className={classes.nexButton}
                    transitionState={tranState}
                    data-tc="submit"
                    onClick={submit}
                  >
                    Siguiente
                  </ConfirmButton>
              </div>
              <Typography variant="subtitle2" className={classes.title}>Tienes problemas al registrarte? Contáctanos! <br/> contacto@yosoybacan.com </Typography>
            </>
          )}
        </Form>
      </>
    );
  }
);
BusinessLegal.displayName = "BusinessLegal";
export default BusinessLegal;

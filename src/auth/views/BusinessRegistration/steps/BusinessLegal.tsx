import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { createStyles, Theme, WithStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Form from '@saleor/components/Form';
import { FormSpacer } from '@saleor/components/FormSpacer';
import React from 'react';

import RadioGroupField from '../../../../components/RadioGroupField';

enum BankAccounType {
  AHORROS = 'Ahorros',
  CORRIENTE = 'Corriente'
};

export enum BankOptions {
  PRODUBANCO = 'Produbanco',
  PICHINCHA = 'Banco del Pichincha',
  GUAYAQUIL = 'Banco de Guayaquil',
  BANCO_PACIFICO = 'Banco de Pacifico',
  BANCO_INTERNACIONAL = 'Banco Internacional'
};

enum EntityType {
  PERSONA_NATURAL =  'Persona Natural',
  PERSONA_JURIDICA = 'Persona Jurídica'
};

export interface FormData {
  /* Business */
  legalName: string;
  legalId: string;
  numEmployees: number | null;
  businessAddress: string;
  businessCity: string;
  entityType: EntityType | null;
  hasAccounting: string;
  businessPhone: string;

  /* Bank */
  bankName: BankOptions | null;
  bankBeneficiaryName: string;
  bankAccountType: BankAccounType | null;
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
      justifyContent: "flex-end"
    },
    link: {
      color: theme.palette.primary.main,
      cursor: "pointer",
      textAlign: "center"
    },
    loginButton: {
      width: 140
    },
    title: {
        flex: 1,
        paddingBottom: theme.spacing.unit * 2
      },
    panel: {
      "& span": {
        color: theme.palette.error.contrastText
      },
      background: theme.palette.error.main,
      borderRadius: theme.spacing.unit,
      marginBottom: theme.spacing.unit * 3,
      padding: theme.spacing.unit * 1.5
    }
  });

export interface UserAccountProps extends WithStyles<typeof styles> {

}

const BusinessLegal = withStyles(styles, { name: "LoginCard" })(
  ({
    classes
  }: UserAccountProps) => {

    return (
        <>
        <Form initial={{ legalName: "", legalId: "", numEmployees: null, businessAddress: "", businessCity: "", entityType: null, hasAccounting: "", businessPhone: "", bankName: null, bankBeneficiaryName: "", bankAccountType: null, bankAccountNumber: "", businessEmail: "",  businessPersonName: "", businessPersonId: ""}}>
            {({ change: handleChange, data }) => (
            <>
              <Typography variant="h5" className={classes.title}>
                Información de la Empresa
              </Typography>
                <TextField
                  autoFocus
                  fullWidth
                  label={'Razón Social'}
                  name="legalName"
                  onChange={handleChange}
                  value={data.legalName}
                  inputProps={{
                      "data-tc": "legalName"
                  }}
                />
                <FormSpacer />
                <TextField
                  autoFocus
                  fullWidth
                  label={'RUC/NIT'}
                  name="legalId"
                  onChange={handleChange}
                  value={data.legalId}
                  inputProps={{
                      "data-tc": "legalId"
                  }}
                />
                <FormSpacer />
                <TextField
                  autoFocus
                  fullWidth
                  label={'Número de Empleados'}
                  name="numEmployees"
                  onChange={handleChange}
                  value={data.numEmployees}
                  inputProps={{
                      "data-tc": "numEmployees"
                  }}
                />
                <FormSpacer />
                <TextField
                autoFocus
                fullWidth
                label={'Dirección de la Empresa'}
                name="businessAddress"
                onChange={handleChange}
                value={data.businessAddress}
                inputProps={{
                    "data-tc": "businessAddress"
                }}
                />
                <FormSpacer />
                <TextField
                autoFocus
                fullWidth
                label={'Ciudad de la Empresa'}
                name="businessCity"
                onChange={handleChange}
                value={data.businessCity}
                inputProps={{
                    "data-tc": "businessCity"
                }}
                />
                <FormSpacer />
                <>
                  <InputLabel>Tipo de Personería</InputLabel>
                  <Select
                  fullWidth
                  id="pais-select"
                  value={data.entityType}
                  name="entityType"
                  onChange={handleChange}
                  required
                  >
                    <MenuItem value={EntityType.PERSONA_JURIDICA}>Persona Jurídica</MenuItem>
                    <MenuItem value={EntityType.PERSONA_NATURAL}>Persona Natural</MenuItem>
                  </Select>
                </>
                <FormSpacer />
                <RadioGroupField 
                  choices={[{
                    label: "Si",
                    value: "true"
                  }, {
                    label: "No",
                    value: "false"
                  }]}
                  label="Obligado a Llevar Contabilidad"
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
                label={'Nombre de Representante Legal'}
                name="businessPersonName"
                onChange={handleChange}
                value={data.businessPersonName}
                inputProps={{
                    "data-tc": "businessPersonName"
                }}
              />
              <FormSpacer />
              <TextField
                autoFocus
                fullWidth
                label={'Cédula Representante Legal'}
                name="businessPersonId"
                onChange={handleChange}
                value={data.businessPersonId}
                inputProps={{
                    "data-tc": "businessPersonId"
                }}
              />
              <FormSpacer />
              <TextField
                autoFocus
                fullWidth
                label={'E-mail Representante Legal'}
                name="businessEmail"
                onChange={handleChange}
                value={data.businessEmail}
                inputProps={{
                    "data-tc": "businessEmail"
                }}
              />
              <FormSpacer />
              <Typography variant="h5" className={classes.title}>
                Información de Banco
              </Typography>
              <FormSpacer />
              <>
                <InputLabel>Nombre de Banco</InputLabel>
                <Select
                fullWidth
                id="bank-select"
                value={data.bankName}
                name="bankName"
                onChange={handleChange}
                required
                >
                  <MenuItem value={BankOptions.PRODUBANCO}>Produbanco</MenuItem>
                  <MenuItem value={BankOptions.PICHINCHA}>Banco del Pichincha</MenuItem>
                  <MenuItem value={BankOptions.GUAYAQUIL}>Banco de Guayaquil</MenuItem>
                  <MenuItem value={BankOptions.BANCO_PACIFICO}>Banco del Pichincha</MenuItem>
                  <MenuItem value={BankOptions.BANCO_INTERNACIONAL}>Banco Internacional</MenuItem>
                </Select>
              </>
              <FormSpacer />
              <>
                <InputLabel>Tipo de Cuenta</InputLabel>
                <Select
                fullWidth
                id="account-select"
                value={data.bankAccountType}
                name="bankAccountType"
                onChange={handleChange}
                required
                >
                  <MenuItem value={BankAccounType.AHORROS}>Ahorros</MenuItem>
                  <MenuItem value={BankAccounType.CORRIENTE}>Corriente</MenuItem>
                </Select>
            </>
            <FormSpacer />
              <TextField
                autoFocus
                fullWidth
                label={'Beneficiario de Cuenta'}
                name="bankBeneficiaryName"
                onChange={handleChange}
                value={data.bankBeneficiaryName}
                inputProps={{
                    "data-tc": "bankBeneficiaryName"
                }}
              />
              <FormSpacer />
              <TextField
                autoFocus
                fullWidth
                label={'Número de Cuenta'}
                name="bankAccountNumber"
                onChange={handleChange}
                value={data.bankAccountNumber}
                inputProps={{
                    "data-tc": "bankAccountNumber"
                }}
            />
            </>
            )}
        </Form>
        </>
    );
  }
);
BusinessLegal.displayName = "BusinessLegal";
export default BusinessLegal;

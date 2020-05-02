import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import CardTitle from '@saleor/components/CardTitle';
import FormSpacer from '@saleor/components/FormSpacer';
import RichTextEditor from '@saleor/components/RichTextEditor';
import { commonMessages } from '@saleor/intl';
import { RawDraftContentState } from 'draft-js';
import React from 'react';
import { useIntl } from 'react-intl';

interface ProductDetailsFormProps {
  data: {
    description: RawDraftContentState;
    name: string;
  };
  errors: { [key: string]: string };
  initialDescription: RawDraftContentState;
  disabled?: boolean;
  onChange(event: any);
}

export const ProductDetailsForm: React.FC<ProductDetailsFormProps> = ({
  data,
  disabled,
  errors,
  initialDescription,
  onChange
}) => {
  const intl = useIntl();

  return (
    <Card>
      <CardTitle
        title={intl.formatMessage(commonMessages.generalInformations)}
      />
      <CardContent>
        <TextField
          error={!!errors.name}
          helperText={errors.name || 'Este nombre lo van a ver tus clientes en la plataforma.'}
          disabled={disabled}
          fullWidth
          label={intl.formatMessage({
            defaultMessage: "Nombre Comercial",
            description: "product name"
          })}
          name="name"
          value={data.name}
          onChange={onChange}
        />
        <FormSpacer />
        <RichTextEditor
          disabled={disabled}
          error={!!errors.descriptionJson}
          helperText={errors.descriptionJson || "Escribe una pequeña reseña de tu negocio para que los clientes sepan de que se trata. Te recomendamos hacerlo muy visual con las herramientas de edición y menos de 300 caractéres."}
          initial={initialDescription}
          label={intl.formatMessage(commonMessages.description)}
          name="description"
          onChange={onChange}
        />
      </CardContent>
    </Card>
  );
};
export default ProductDetailsForm;

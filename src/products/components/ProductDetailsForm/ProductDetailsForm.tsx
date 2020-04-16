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
  disabled?: boolean;
  errors: { [key: string]: string };
  // Draftail isn't controlled - it needs only initial input
  // because it's autosaving on its own.
  // Ref https://github.com/mirumee/saleor/issues/4470
  initialDescription: RawDraftContentState;
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
          helperText={errors.name}
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
          helperText={errors.descriptionJson}
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

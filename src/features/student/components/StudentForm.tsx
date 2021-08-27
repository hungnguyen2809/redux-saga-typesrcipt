import { Box, Button } from '@material-ui/core';
import { InputField } from 'components/FormFields';
import { Student } from 'models';
import React from 'react';
import { useForm } from 'react-hook-form';

interface Props {
  initialValues?: Student;
  onSubmitForm?: (formValues: Student) => void;
}

function StudentForm({ initialValues, onSubmitForm }: Props): JSX.Element {
  const { control, handleSubmit } = useForm({
    defaultValues: initialValues,
  });

  const handleFormSubmit = (formValues: Student) => {
    console.log('🚀 handleFormSubmit ~ formValues', formValues);
  };

  return (
    <Box maxWidth={350}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        {/* FORM FIELDS */}
        <InputField name={'name'} control={control} label={'Full name'} />
        <InputField name={'age'} control={control} label={'Age'} />
        <InputField name={'mark'} control={control} label={'Mark'} />
        <InputField name={'gender'} control={control} label={'Gender'} />
        <InputField name={'city'} control={control} label={'City'} />
        <Box mt={3}>
          <Button type={'submit'} variant={'contained'} color={'primary'}>
            Submit
          </Button>
        </Box>
      </form>
    </Box>
  );
}

export default StudentForm;

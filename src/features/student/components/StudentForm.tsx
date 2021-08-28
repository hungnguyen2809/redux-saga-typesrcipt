import { Box, Button, CircularProgress } from '@material-ui/core';
import { useAppSelector } from 'app/hooks';
import { InputField, RadioGroupField, SelectField } from 'components/FormFields';
import { Student } from 'models';
import React from 'react';
import { useForm } from 'react-hook-form';
import { selectCityOptions } from 'redux/city/slice';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Alert } from '@material-ui/lab';
import { useState } from 'react';

interface Props {
  initialValues?: Student;
  onSubmitForm?: (formValues: Student) => Promise<void>;
}

function StudentForm({ initialValues, onSubmitForm }: Props): JSX.Element {
  const cityOptions = useAppSelector(selectCityOptions);

  const [error, setError] = useState<string>('');

  const schema = yup.object().shape({
    name: yup
      .string()
      .required('Please enter name.')
      .test('two-words', 'Please enter at least two word', (value) => {
        //tự định nghĩa một hàm để test validate ngay tại trường đó
        return value ? value.split(' ').filter((x) => !!x).length >= 2 : true;
      }),
    age: yup
      .number()
      .positive('Please enter a positive number.')
      .integer('Please enter a integer number.')
      .required('Please enter age.')
      .min(16, 'Age min is 16.')
      .max(60, 'Age max is 60.')
      .typeError('Please enter a positive number.'),
    mark: yup
      .number()
      .min(0, 'Min is 0')
      .max(10, 'Max is 10')
      .required('Please enter mark.')
      .typeError('Please enter a positive number.'),
    gender: yup
      .string()
      .oneOf(['male', 'female'], 'Please select either male, or female.') // một trong các giá trị được đưa vào
      .required('Please select gender.'),
    city: yup.string().required('Please select city.'),
  });

  const {
    control,
    handleSubmit,
    formState: { isSubmitting }, //isSubmitting được tính bằng thời gian chạy hàm handleSubmit
  } = useForm<Student>({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = async (formValues: Student) => {
    //isSubmitting được tính bằng thời gian chạy hàm handleSubmit, chính là thời gian chạy của hàm này handleFormSubmit
    //do đó hàm handleFormSubmit chạy lâu thì isSubmitting cũng lâu (mang giá trị true lâu)
    try {
      // Clear previous submission error
      setError('');
      //Submit Form
      onSubmitForm && (await onSubmitForm(formValues));
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Box maxWidth={350}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <InputField name={'name'} control={control} label={'Full name'} />
        <RadioGroupField
          name={'gender'}
          label={'Gender'}
          control={control}
          options={[
            { label: 'Male', value: 'male' },
            { label: 'Female', value: 'female' },
          ]}
        />
        <InputField name={'age'} control={control} label={'Age'} type="number" />
        <InputField name={'mark'} control={control} label={'Mark'} type="number" />

        {Array.isArray(cityOptions) && cityOptions.length > 0 && (
          //Kiểm tra cityOptions có giá trị mới hiển thị
          //Loại bỏ cảnh báo khi mà cityOptions chưa có giá trị mà value nó đã có giá trị
          <SelectField name={'city'} control={control} label={'City'} options={cityOptions} />
        )}

        {/* Alert error when call api */}
        {error && <Alert severity={'error'}>{error}</Alert>}

        <Box mt={3}>
          <Button type={'submit'} variant={'contained'} disabled={isSubmitting} color={'primary'}>
            {isSubmitting && <CircularProgress color={'primary'} size={16} />} &nbsp; Submit
          </Button>
        </Box>
      </form>
    </Box>
  );
}

export default StudentForm;

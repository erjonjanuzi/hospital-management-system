import { useField } from 'formik';
import { Form, Label } from 'semantic-ui-react';
import DatePicker, { ReactDatePickerProps } from 'react-datepicker';

export default function MyDateInput(props: Partial<ReactDatePickerProps>) {
    const [field, meta, helpers] = useField(props.name!);
    let today = new Date();
    let minDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 3);

    return (
        <Form.Field error={meta.touched && !!meta.error}>
            <DatePicker
                allowSameDay={false}
                minDate={minDate}
                {...field}
                {...props}
                selected={(field.value && new Date(field.value)) || null}
                onChange={value => helpers.setValue(value)}
            />
            {meta.touched && meta.error ? (
                <Label basic color='red'>{meta.error}</Label>
            ) : null}
        </Form.Field>
    )
}
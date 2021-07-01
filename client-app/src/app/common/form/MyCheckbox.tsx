import { useField } from 'formik';
import React from 'react';
import { Form, Label, Checkbox } from 'semantic-ui-react';

interface Props {
    //placeholder: string;
    name: string;
    label: any;
   // label?: string;
}

export default function MyCheckbox(props: Props) {
    const [field, meta, helpers] = useField(props.name); 
    return (
        <Form.Field error={meta.touched && !!meta.error}>
           
            <Checkbox
                clearable
                label={props.label}
                value={field.value || null}
                onChange={(e, d) => helpers.setValue(d.value)}
                onBlur={() => helpers.setTouched(true)}
               // placeholder={props.placeholder}
            />
            {meta.touched && meta.error ? (
                <Label basic color='red'>{meta.error}</Label>
            ) : null}
        </Form.Field>
    )
}
import { useField } from "formik";
import { Form, Label } from "semantic-ui-react";
import DatePicker, { ReactDatePickerProps } from 'react-datepicker'
 
const MyDateInput = (props: Partial<ReactDatePickerProps>) => {
    const  [field,meta,helper] = useField(props.name!);
    return (
        <Form.Field error={meta.error && !!meta.touched}>
            <DatePicker
            {...field}
            {...props}
            selected={field.value && new Date(field.value) || null}
            onChange={value=>helper.setValue(value)}
            />
            {
                meta.touched && meta.error?
                (<Label color="red" basic content={meta.error}/>)
                :null
            }
        </Form.Field>
    )
}

export default MyDateInput
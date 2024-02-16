import { useField } from "formik";
import { Form, Label } from "semantic-ui-react";

interface Props {
    placeholder: string;
    name: string;
    label?: string;
    type?: string;
}
const MyTextInput = (props: Props) => {
    const  [field,meta] = useField(props.name);
    return (
        <Form.Field error={meta.error && !!meta.touched}>
            <input {...field} {...props} />
            {
                meta.touched && meta.error?
                (<Label color="red" basic content={meta.error}/>)
                :null
            }
        </Form.Field>
    )
}

export default MyTextInput
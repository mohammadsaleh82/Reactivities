import { useField } from "formik";
import { Form, Label } from "semantic-ui-react";

 
 interface Props {
    placeholder: string;
    name: string;
    rows:number;
}
const MyTextArea = (props:Props) => {
    const  [field,meta] = useField(props.name);
    return (
        <Form.Field error={meta.error && !!meta.touched}>
            <textarea {...field} {...props} ></textarea>
            {
                meta.touched && meta.error?
                (<Label color="red" basic content={meta.error}/>)
                :null
            }
        </Form.Field>)
}

export default MyTextArea
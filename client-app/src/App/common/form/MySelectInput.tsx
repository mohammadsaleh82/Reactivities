import { useField } from "formik";
import { Form, Label, Select } from "semantic-ui-react";

interface Props {
    placeholder: string;
    name: string; 
    options:any;
    label?:string;
}
const MySelectInput = (props: Props) => {
    const  [field,meta,helpers] = useField(props.name);
    return (
        <Form.Field error={meta.error && !!meta.touched}>
            <Select 
            clearable
            {...props}
            options={props.options}
            value={field.value || null}
            onChange={(e,d)=>helpers.setValue(d.value)}
            onBlur={()=>helpers.setTouched(true)}
            />
            {
                meta.touched && meta.error?
                (<Label color="red" basic content={meta.error}/>)
                :null
            }
        </Form.Field>
    )
}

export default MySelectInput
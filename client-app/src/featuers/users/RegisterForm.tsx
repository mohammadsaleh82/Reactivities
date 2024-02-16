import { ErrorMessage, Form, Formik } from "formik"
import MyTextInput from "../../App/common/form/MyTextInput"
import { Button, Header, Label } from "semantic-ui-react"
import { UseStore } from "../../App/store/store"
import { observer } from "mobx-react-lite"
import * as Yup from 'yup'
import ValidationError from "../errors/ValidationError"
const RegisterForm = () => {
    const { userStore } = UseStore();
    return (
        <Formik initialValues={{ username: '', displayName: '', email: '', password: '', error: null }}
            onSubmit={(values, { setErrors }) => userStore.register(values)
                .catch(error => setErrors({error}))}
            validationSchema={Yup.object({
                username: Yup.string().required(),
                email: Yup.string().required(),
                displayName: Yup.string().required(),
                password: Yup.string().required()
            })}
        >
            {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
                <Form className="ui form error" onSubmit={handleSubmit}>
                    <Header color="teal" content={`Register to Activities`} textAlign="center" />
                    <MyTextInput name="username" placeholder="user name" type="text" />
                    <MyTextInput name="displayName" placeholder="Display Name" type="text" />
                    <MyTextInput name="email" placeholder="email" type="email" />
                    <MyTextInput name="password" placeholder="password" type="password" />
                    <ErrorMessage name="error" render={() =>
                        <ValidationError errors={errors.error} />
                        } />
                    <Button
                        disabled={isSubmitting || !isValid || !dirty}
                        loading={isSubmitting} content={`Register`} positive type="submit" fluid />
                </Form>
            )}
        </Formik>
    )
}

export default observer(RegisterForm)
import { ErrorMessage, Form, Formik } from "formik"
import MyTextInput from "../../App/common/form/MyTextInput"
import { Button, Header, Label } from "semantic-ui-react"
import { UseStore } from "../../App/store/store"

const LoginForm = () => {
    const { userStore } = UseStore();
    return (
        <Formik initialValues={{ email: '', password: '', error: null }} onSubmit={(values, { setErrors }) => userStore.login(values)
            .catch(() => setErrors({ error: 'Invalid Email or Password' }))}>
            {({ handleSubmit, isSubmitting, errors }) => (
                <Form className="ui form" onSubmit={handleSubmit}>
                    <Header color="teal" content={`Login to Activities`} textAlign="center" />
                    <MyTextInput name="email" placeholder="email" type="email" />
                    <MyTextInput name="password" placeholder="password" type="password" />
                    <ErrorMessage name="error" render={() =>
                        <Label style={{ marginBottom: '10px' }} basic color="red" content={errors.error}
                        />} />
                    <Button loading={isSubmitting} content={`Login`} positive type="submit" fluid />
                </Form>
            )}
        </Formik>
    )
}

export default LoginForm
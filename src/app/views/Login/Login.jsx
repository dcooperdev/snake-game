import React, { useContext } from 'react';
import Form from '../../components/Form/Form';
import { AppContext } from '../../context/provider';
import AuthService from '../../services/Auth.service';
import { formConfig } from './form-config';

const Login = ({ history }) => {
    const { setState } = useContext(AppContext);
    const { fields, buttons } = formConfig(history);

    const submitFunction = async (data) => {
        try {
            const authService = new AuthService();
            const response = await authService.Login(data.username, data.password);
            console.log({ response });
            setState(response);
            history.push("/lobby", { from: "login" })
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <Form
            title="Login"
            fields={fields}
            buttons={buttons}
            submitFunction={submitFunction}
        />
    )
};

export default Login;
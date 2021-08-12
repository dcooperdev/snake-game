import React, { useContext } from 'react';
import { AppContext } from '../../context/provider';
import Form from '../../components/Form/Form';
import AuthService from '../../services/Auth.service';
import { formConfig } from './form-config';

const Signup = ({ history }) => {

    const { setState } = useContext(AppContext);
    const { fields, buttons } = formConfig(history);

    const submitFunction = async (data) => {
        if (data.password === data.repassword) {
            try {
                const authService = new AuthService();
                const response = await authService.Signup(data.username, data.password, data.fullname);
                setState(response);
                history.push("/lobby", { from: "signup" })
            } catch (error) {
                console.error(error)
            }
        } else {
            alert('Passwords are not equal!');
        }
    }

    return (
        <Form
            title="Signup"
            fields={fields}
            buttons={buttons}
            submitFunction={submitFunction}
        />
    )
};

export default Signup;
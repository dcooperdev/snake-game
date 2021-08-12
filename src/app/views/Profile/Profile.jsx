import React, { useContext } from 'react';
import { AppContext } from '../../context/provider';
import Form from '../../components/Form/Form';
import AuthService from '../../services/Auth.service';
import { formConfig } from './form-config';

const Profile = ({ history }) => {
    const { state: { fullName, url }, setState } = useContext(AppContext);
    const { fields, buttons } = formConfig(fullName, url, history);

    const submitFunction = async (data) => {
        try {
            const authService = new AuthService();
            const response = await authService.UpdateProfile(data.fullname, data.avatar);
            setState(response);
            history.push("/lobby", { from: "profile" })
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <Form
            title="Profile"
            fields={fields}
            buttons={buttons}
            submitFunction={submitFunction}
        />
    );
};

export default Profile;
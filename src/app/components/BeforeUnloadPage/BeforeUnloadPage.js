import React from 'react';
import AuthService from '../../services/Auth.service'

export const BeforeUnloadPage = () => {
    const authService = new AuthService();

    window.onbeforeunload = async (event) => {
        await authService.Logout();

        const e = event || window.event;
        e.preventDefault();

    
        if (e) {
          e.returnValue = ''; // Legacy method for cross browser support
        }
        return ''; // Legacy method for cross browser support
    };

    return null;
}

export default BeforeUnloadPage;

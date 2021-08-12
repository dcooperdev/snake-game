import React, { useContext } from 'react';
import history from '../../utils/history';
import { AppContext } from '../../context/provider';
import AuthService from '../../services/Auth.service';
import './index.css';

const UserConfigBar = () => {
    const { state: { username, fullName }, setState } = useContext(AppContext);

    const logout = async () => {
        try {
            const authService = new AuthService();
            await authService.Logout();
            setState({
                username: null,
                fullName: null,
            });
            history.push("/login", { from: "lobby" })
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <header>
            <h1>SpaceSnake</h1>
            <div id="user-menu">
                <button className="not-background-button" onClick={() => history.push("/profile", { from: "lobby" })} disabled={(!username && !fullName)}>
                    <img id="user-icon" src="https://img.icons8.com/fluency-systems-regular/50/000000/user-male-circle.png" alt="user-icon" />
                </button>
                {(username || fullName) && <>
                    <div>
                        <div className="name">Hello <span>{(!fullName) ? username : fullName}</span></div>
                        <div className="role">Player</div>
                    </div>
                    <button className="not-background-button" onClick={() => logout()}>
                        <img src="https://img.icons8.com/ios-filled/50/000000/logout-rounded.png" alt="logout" />
                    </button>
                </>}
            </div>
        </header>
    );
}

export default UserConfigBar;

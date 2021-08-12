import React, { useState, useContext } from "react";
import { AppContext } from '../../context/provider';
import { PUBLIC_URL } from '../../constants/routes';
import './index.css';

const PlayersList = ({ users }) => {
    const { state: { uid }} = useContext(AppContext);
    const [state, setState] = useState({ selected: null, users: [] });

    const isThisUser = (user) => {
        return user?.id === uid;
    }

    const getOptions = () => {
        return users.map(user => (
            (user?.loggedin) ? 
                <li
                    key={user?.id}
                    disabled={isThisUser(user)}
                    className="profile"
                >
                    <div className="profile-image">
                        <img src={
                            (user.url) ? user.url : `${PUBLIC_URL}/cookie.gif`
                        } alt="" />
                    </div>
                    <div className="profile-information">
                        <div>{user?.fullName}{isThisUser(user) ? '(Me)': null}</div>
                        <div>TOP SCORE: <span>{user?.topScore}</span></div>
                        <img id="crown" src="https://img.icons8.com/carbon-copy/50/000000/pixel-star.png" alt="crown"/>
                    </div>
                </li>
                :
                false
        ))
    }
    const getUserData = (event) => {
        const user = users.find(u => u.id === event.target.value)     
        setState({ ...state, selected: user });
    }

    return (
        <ul id="users-list">
            {getOptions()}
        </ul>
    )
}

export default PlayersList;
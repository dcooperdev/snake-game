import React, { useState, useEffect } from 'react';
import SnakeGame from '../SnakeGame/SnakeGame';
import PlayersList from '../../components/PlayersList/PlayersList';
import firebase from "../../utils/firebase";
import './index.css';

const Lobby = (props) => {
    const [state, setState] = useState({ selected: null, users: [] });

    useEffect(() => {
        const users = firebase.firestore().collection('users').onSnapshot((data) => {
            const users = data.docs.map(doc => {
                const user = { id: doc.id, ...doc.data() };
                return user;
            });
            if (JSON.stringify(state) !== JSON.stringify({ ...state, users })) {
                setState({ ...state, users })
            }
        });
        return () => {
            users();
        }
    }, [state]);

    return (
        <div id="users-lobby-select-profile">
            <div className="container">
                <div className="col-4">
                    <PlayersList users={state.users} />
                </div>
                <div className="col-8">
                    <SnakeGame props={props} />
                </div>
            </div>
        </div>
    );
};

export default Lobby;
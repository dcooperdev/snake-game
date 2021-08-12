import React, { useEffect, useState } from 'react';
import { PUBLIC_URL } from '../../constants/routes';
import './index.css';

const GameMenu = ({ startGame, paused, newGame }) => {
    const [state, setState] = useState(true);

    const start = () => {
        startGame();
        setState(false);
    }
    
    useEffect(() => {
        setState(paused);
    }, [paused])

    return (
        <div id="menu" style={(!state)?{ display: 'none'}:{display: 'block'}}>
            <div className="frame1"> 
                <img src="https://www.logolynx.com/images/logolynx/7f/7fe85fb6677eaf8d18c3511c3fcaad79.png" alt="img" />
            </div> 
            <div className="frame">
                <div className="btn-group">
                    <button className="text button" type="button" onClick={() => start()}>
                        <h2>
                            {(newGame) ? 'NEW GAME' : 'CONTINUE'}
                        </h2>
                    </button><br />
                    <div className="text" style={{ marginTop: '4rem' }}>
                        <h2>CONTROLS:</h2>
                        <img src={PUBLIC_URL + '/arrows.png'} alt="" />
                    </div>
                </div>    
            </div>
        </div>
    );
}

export default GameMenu;
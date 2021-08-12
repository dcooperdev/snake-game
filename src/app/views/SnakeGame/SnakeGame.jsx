/* eslint-disable default-case */
import React, { Component } from 'react';
import { AppContext } from '../../context/provider';
import { getRamdomCoordinates, processKey, snakeMovement } from '../../utils/utils';
import AuthService from '../../services/Auth.service'
import GameMenu from '../../components/GameMenu/GameMenu';
import Snake from '../../components/Snake/Snake';
import Food from '../../components/Food/Food';
import './index.css';

class SnakeGame extends Component {
    static contextType = AppContext;
    authService = new AuthService();

    initialState = {
        food: getRamdomCoordinates(),
        speed: 200,
        direction: 'RIGHT',
        snakeDots: [
            [0,0],
            [2,0]
        ],
        intervalID: null,
        paused: true,
        newGame: true
    }

    constructor(props) {
        super(props);

        this.state = this.initialState;
    }

    movement = ['RIGHT', 'LEFT', 'UP', 'DOWN'];

    componentDidMount() {
        document.onkeydown = this.onKeyDown;
    }
      
    componentDidUpdate(){
        this.checkIfOutOfBorders();
        this.checkIfCollapsed();
        this.checkIfEat(); 
    }

    startGame = () => {
        const { intervalID } = this.state;
        if (intervalID) {
            clearInterval(intervalID)
        }
        const _intervalID = setInterval(this.moveSnake, this.state.speed);
        this.setState({ intervalID: _intervalID, paused: false, newGame: false });
    }

    pauseGame = () => {
        const { intervalID } = this.state;
        if (intervalID) {
            clearInterval(intervalID)
            this.setState({ intervalID: null, paused: true });
        }
    }

    onKeyDown = (e) => {
        const { direction: directionState } = this.state
        e = e || window.event;
        const key = processKey(e.keyCode, directionState)
        if (this.movement.includes(key)) {
            this.setState({ direction: key });
        }
        if (key === 'SCAPE') {
            this.pauseGame();
        }
    }

    moveSnake = () => {
        const { snakeDots, direction } = this.state
        let dots = [...snakeDots];
        let head = dots[dots.length -1];
        const newPosition = snakeMovement(dots, head, direction);
        this.setState({
            snakeDots: newPosition
        })
    }

    checkIfOutOfBorders = () => {
        const { snakeDots } = this.state;
        let head = snakeDots[snakeDots.length -1];
        if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
            this.onGameOver();
        }
    }

    checkIfCollapsed = () => {
        const { snakeDots } = this.state;
        let snake = [...snakeDots];
        let head = snake[snake.length -1];
        snake.pop();
        snake.forEach(dot => {
            if (head[0] === dot[0] && head[1] === dot[1]) {
                this.onGameOver();
            }
        })
    }
      
    checkIfEat = () => {
        const { snakeDots, food: foodState } = this.state;
        let head = snakeDots[snakeDots.length - 1];
        let food = foodState;
        if (head[0] === food[0] && head[1] === food[1]) {
            this.setState({
                food: getRamdomCoordinates()
            })
            this.enlargeSnake();
            this.increaseSpeed();
        }
    }
      
    enlargeSnake = () => {
        const { snakeDots } = this.state
        let newSnake = [...snakeDots];
        newSnake.unshift([])
        this.setState({
            snakeDots: newSnake
        })
    }
      
    increaseSpeed = () => {
        if (this.state.speed > 10) {
            this.setState({
                speed: this.state.speed - 10
            })
        }
      }

    onGameOver = async () => {
        const { snakeDots } = this.state;
        this.pauseGame()
        try {
            await this.authService.AddField({ topScore: snakeDots.length });
            this.setState(this.initialState)
        } catch (error) {
            console.log(error);
        }
    }
    
    render() {
        const { paused, newGame, snakeDots, speed, direction, food } = this.state;
        return (
            <div id="snake-game">
                <div style={(!paused)?{ opacity: '1'}:{opacity: '0'}}>
                    <p id="board">SPEED: {speed} POINTS: {snakeDots.length}</p>
                    <div className="game-area">
                        <Snake snakeDots={snakeDots}/>
                        <Food dot={food}/>
                    </div>
                </div>
                <GameMenu startGame={this.startGame} paused={paused} newGame={newGame} />
            </div>
        );
    }

}

export default SnakeGame;
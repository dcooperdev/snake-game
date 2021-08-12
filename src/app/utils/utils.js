import React, { useState, useEffect } from 'react';
export const isLogin = (props) => {
    const { fullName, username } =  props;
    return !!(fullName && username);
}

/*
 * Convert strings in lowercase separated by - string
 * Example: Hello World returns hello-world
 */
export const textToId = (str) => {
    return str.toLowerCase().replaceAll(' ', '-');
}

export const getRamdomCoordinates = () => {
    let min = 1;
    let max = 98;
    let x = Math.floor((Math.random()*(max-min+1)+min)/2)*2;
    let y = Math.floor((Math.random()*(max-min+1)+min)/2)*2;
    return [x,y]
}

export const useKeyPress = (targetKey) => {
    // State for keeping track of whether key is pressed
    const [keyPressed, setKeyPressed] = useState(false);
    // If pressed key is our target key then set to true
    const downHandler = ({ key }) => {
      if (key === targetKey) {
        setKeyPressed(true);
      }
    }
    // If released key is our target key then set to false
    const upHandler = ({ key }) => {
      if (key === targetKey) {
        setKeyPressed(false);
      }
    };
    // Add event listeners
    useEffect(() => {
      window.addEventListener("keydown", downHandler);
      window.addEventListener("keyup", upHandler);
      // Remove event listeners on cleanup
      return () => {
        window.removeEventListener("keydown", downHandler);
        window.removeEventListener("keyup", upHandler);
      };
    }, []); // Empty array ensures that effect is only run on mount and unmount
    return keyPressed;
}

export const processKey = (keyCode, direction) => {
    switch(keyCode) {
        case 38: {
            if (direction !== 'DOWN') {
                return 'UP';
            }
            return direction;
        }
        case 40: {
            if (direction !== 'UP') {
                return 'DOWN';
            }
            return direction;
        }
        case 37: {
            if (direction !== 'RIGHT') {
                return 'LEFT';
            }
            return direction;
        }
        case 39: {
            if (direction !== 'LEFT') {
                return 'RIGHT';
            }
            return direction;
        }
        case 27: {
            return 'SCAPE';
        }
        default:
            return direction;
    }
}

export const snakeMovement = (dots, head, direction) => {
    const auxHead = {
        'RIGHT': [head[0] + 2, head[1]],
        'LEFT': [head[0] - 2, head[1]],
        'DOWN': [head[0],  head[1] + 2],
        'UP': [head[0],  head[1] - 2],
    }[direction];

    dots.push(auxHead);
    dots.shift();
    return dots;
}

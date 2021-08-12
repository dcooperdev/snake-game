import React from 'react';
import { textToId } from '../../utils/utils';

const ButtonsHub = ({ buttons }) => {
  const buttonHasFunction = (button) => {
    return (button.function) ? { onClick: button.function } : {};
  }

  return (
    <div id="button-container">
      {buttons.map((button, index) => (
        <input
          id={(button.type === 'submit'.toLowerCase()) ? 'submit' : textToId(button.label)}
          type={button.type}
          value={button.label}
          key={index}
          className={button.class}
          {...buttonHasFunction(button)}
        />
      ))}
    </div>
  );
}

export default ButtonsHub;
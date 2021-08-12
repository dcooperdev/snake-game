import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { textToId } from '../../utils/utils';
import ButtonsHub from '../ButtonsHub/ButtonsHub';
import './index.css';

const Form = ({ title, fields, buttons, submitFunction, isLoading }) => {
    const [state, setState] = useState({});

    useEffect(() => {
        fields.forEach(field => {
            hasOptions(field);
        })
    }, [fields])

   /*
    * Set an state for each input or data in the form
    */
    const handdleChange = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.value
        });
    }

   /*
    * Execute callback function given from the father component
    */
    const submit = (event) => {
        event.preventDefault();
        submitFunction(state); // callback
    }

   /*
    * Function to empty input value
    */
    const clearInput = (e, id, name) => {
        e.preventDefault();
        document.querySelector(`#${id}`).value = "";
        setState({
            ...state,
            [name]: null
        });
    }

   /*
    * Function to empty input value
    */
    const showPassword = (event, id) => {
        event.preventDefault();
        const input = document.querySelector(`#${id}`);
        input.type = (input.type === 'password') ? 'text' : 'password';
    }

   /*
    * Function to know if the input is empty or not
    */
    const hasData = (name) => {
        const { [name]: value } = state;
        return value && (value.length > 0);
    }

    const hasOptions = (field) => {
        const values = [];
        if (field.options) {
            Object.keys(field.options).forEach(name => {
                if (name === 'value') {
                    values.push([field.name, field.options[name]])
                }
                document.querySelector(`#${textToId(field.label)}`)[name] = field.options[name];
            })
        }
        return values
    }

    return (
        <>
            <form className="form" onSubmit={submit}>
                <h2>{title}</h2>

                {fields.map(field => (
                    <div style={{ position: "relative" }} key={textToId(field.label)}>
                        <input
                            id={textToId(field.label)}
                            type={field.type}
                            onChange={handdleChange}
                            name={field.name}
                        />
                        
                        {field.clearButton && hasData(field.name) && (<button id="clear-input-button" onClick={(e) => clearInput(e, textToId(field.label), field.name)}>
                            <img src="https://img.icons8.com/windows/32/000000/macos-close.png" alt="clear-input" />
                        </button>)}
                        {field.type === 'password' && (<button id="clear-input-button" onClick={(e) => showPassword(e, textToId(field.label), field.name)}>
                            <img src="https://img.icons8.com/material-outlined/24/000000/visible--v1.png" alt="show-password" />
                        </button>)}
                    </div>
                ))}

                <ButtonsHub buttons={buttons} />

                {isLoading && (<div id="spinner-container">
                    <div id="spinner"><div></div><div></div></div>
                </div>)}
            </form>
        </>
    )
};

Form.propTypes = {
    title: PropTypes.string,
    fields: PropTypes.array,
    buttons: PropTypes.array,
    submitFunction: PropTypes.func.isRequired,
    isLoading: PropTypes.bool
};

Form.defaultProps = {
    title: 'Default',
    fields: [],
    buttons: [],
    isLoading: false
};

export default Form;

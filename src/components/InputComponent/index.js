import React from 'react';
import PropTypes from 'prop-types';

export const Input = ({
  type,
  label,
  disabled,
  inputAttributes,
  errorMessage,
  cssClasses,
 }) => {
  return (
    <div className={cssClasses}>
      <h3>{label}</h3>
      <input
        type={type}
        disabled={disabled}
        {...inputAttributes}
      />
      {errorMessage && <span className='errorMessage'>{errorMessage}</span>}
    </div>
  );
};

Input.defaultProps = {
  type: '',
  errorMessage: '',
  disabled: false,
  cssClasses: '',
};

Input.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  inputAttributes: PropTypes.shape({
    required: PropTypes.bool,
    placeholder: PropTypes.string,
    minLength: PropTypes.number,
    maxLength: PropTypes.number,
  }),
  errorMessage: PropTypes.string,
  cssClasses: PropTypes.string,
};

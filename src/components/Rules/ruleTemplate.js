import React from 'react'
import PropTypes from 'prop-types';

export const RuleTemplate = ({ label, rulesArray }) => {
  return (
    <div className='rule'>
        <h3>{label}</h3>
        {rulesArray.map((item, index) => (
          <div
            className='ruleContainer'
            key={index}
          >
            <p>
              {item}
            </p>
          </div>
        ))}
    </div>
  );
};

RuleTemplate.propTypes = {
  label: PropTypes.string.isRequired,
  rulesArray: PropTypes.arrayOf(PropTypes.string).isRequired,
};

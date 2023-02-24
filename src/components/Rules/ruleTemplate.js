import React from 'react'

export const ruleTemplate = ({ label, info }) => {
  return (
    <div>
        <h3>{label}</h3>
        <div>{info}</div>
    </div>
  );
};

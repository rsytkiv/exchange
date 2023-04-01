import React from 'react';

import { Input } from '../InputComponent';

export const Contact = () => {
  return (
    <div className='contactContainer'>
      <p>
        We are always ready to answer your
        questions and listen to your suggestions
        to improve our service.
      </p>
      <br />
      <p>
        <span className='bold'>Email mail:</span> goldenexc80@gmail.com – Quick
        communication with the operator, solving
        financial issues. When contacting by mail,
        please indicate the number of your
        transaction in the subject line of the
        letter (this saves both your and our time).
      </p>
      <br />
      <span>
        Use the form below if you would like to ask
        us a question or report a bug. Please make your
        message as detailed as possible, then we can
        solve the problem much faster.
      </span>
      <div className="contactUsInputsSection">
        <Input
          label="Your name:"
        />
        <Input
          label="Your email:"
        />
        <Input
          label="Exchange id:"
        />
        <div>
          <h3>Message:</h3>
          <textarea />
        </div>
        <button className='submitButton' type='submit'>Submit</button>
      </div>
    </div>
  );
};

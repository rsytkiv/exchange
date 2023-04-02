import React, { useCallback, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { useForm } from 'react-hook-form';

import { Input } from '../InputComponent';
import { Loader } from '../Loader';

export const Contact = () => {
  const { register, handleSubmit } = useForm({
    mode: 'all',
  });
  const form = useRef();
  const [showLoader, setShowLoader] = useState(false);

  const showLoaderHandler = useCallback(() => {
    setShowLoader(true);

    setTimeout(() => {
      setShowLoader(false);
    }, 2500);
  }, []);

  const onSubmit = () => {
    showLoaderHandler();

    emailjs.sendForm('service_um07nye', 'template_vuww4ap', form.current, 'yPRZF-O7vWxGVmllG')
    .then(function(response) {
       console.log('SUCCESS!', response.status, response.text);
    }, function(error) {
       console.log('FAILED...', error);
    });
  };

  return (
    <>
      {showLoader && <Loader />}
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
        <form
          ref={form}
          className="contactUsInputsSection"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            label="Your name:"
            inputAttributes={register('name')}
          />
          <Input
            label="Your email:"
            inputAttributes={register('email')}
          />
          <Input
            label="Exchange id:"
            inputAttributes={register('id')}
          />
          <div>
            <h3>Message:</h3>
            <textarea
              {...register('message')}
            />
          </div>
          <button
            className='submitButton'
            type='submit'
            onSubmit={handleSubmit}
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

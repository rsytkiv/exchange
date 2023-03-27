import React from 'react';

import A from '../../images/first.png';
import B from '../../images/2.png';
import C from '../../images/3.png';
import D from '../../images/4.png';
import E from '../../images/5.png';
import F from '../../images/6.png';

export const Advantages = () => {
  return (
    <div className='advantagesContainer'>
      <h1>Our Advantages</h1>
      <div className='advantagesContent'>
        <div className='advantageItem'>
          <img src={A} />
          <h3>
            Profitable exchange
          </h3>
          <span>
            Our experience in the field of
            electronic currency exchange is
            more than 5 years
          </span>
        </div>
        <div className='advantageItem'>
          <img src={B} />
          <h3>
            Reliability at the limit
          </h3>
          <span>
            Doubt it? Our experts will
            help you cope with any tasks!
          </span>
        </div>
        <div className='advantageItem'>
          <img src={C} />
          <h3>
            A quick exchange
          </h3>
          <span>
            We are loved not only for our reliability
            and good course, but also for our speed.
          </span>
        </div>
        <div className='advantageItem'>
          <img src={D} />
          <h3>
            12+ exchange directions
          </h3>
          <span>
            We make exchanges in the most popular directions.
            You can always exchange funds with us.
          </span>
        </div>
        <div className='advantageItem'>
          <img src={E} />
          <h3>
            100% exchange guarantee
          </h3>
          <span>
            Numerous positive reviews confirm
            the high quality of our work.
          </span>
        </div>
        <div className='advantageItem'>
          <img src={F} />
          <h3>
            Economical exchange
          </h3>
          <span>
            We always have loyal courses, in addition, we will
            always meet large clients halfway, please contact the chat!
          </span>
        </div>
      </div>
    </div>
  )
}

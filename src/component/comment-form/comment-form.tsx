import React, {ChangeEvent, useState} from 'react';
import {Rating} from '../../const';

function CommentForm(): JSX.Element {
  const [formData, setFormData] = useState({
    rating: '',
    review: ''
  });

  return (
    <form className='reviews__form  form' action='#' method='post'>
      <label className='reviews__label  form__label' htmlFor='review'>Your review</label>
      <div className='reviews__rating-form  form__rating'>
        {Object.entries(Rating).map(([title, value]) => {
          const inputId = `${value}-star${value === '1' ? '' : 's'}`;

          return (
            <React.Fragment key={value}>
              <input
                className='form__rating-input  visually-hidden'
                id={inputId}
                name='rating'
                value={value}
                type='radio'
                checked={value === formData.rating}
                onChange={({target}: ChangeEvent<HTMLInputElement>): void => {
                  setFormData({
                    ...formData,
                    rating: target.value
                  });
                }}
              />
              <label
                className='reviews__rating-label  form__rating-label'
                htmlFor={inputId}
                title={value === Rating.NotBad ? 'not bad' : title.toLowerCase()}
              >
                <svg className='form__star-image' width='37' height='33'>
                  <use xlinkHref='#icon-star' />
                </svg>
              </label>
            </React.Fragment>
          );
        })}
      </div>
      <textarea
        className='reviews__textarea  form__textarea'
        id='review'
        name='review'
        placeholder='Tell how was your stay, what you like and what can be improved'
        value={formData.review}
        onChange={({target}: ChangeEvent<HTMLTextAreaElement>) => {
          setFormData({
            ...formData,
            review: target.value
          });
        }}
      />
      <div className='reviews__button-wrapper'>
        <p className='reviews__help'>
          To submit review please make sure to set <span className='reviews__star'>rating</span> and describe your stay with at least <b className='reviews__text-amount'>50 characters</b>.
        </p>
        <button className='reviews__submit  form__submit button' type='submit' disabled>Submit</button>
      </div>
    </form>
  );
}

export default CommentForm;

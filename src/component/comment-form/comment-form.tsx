import React, {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {CommentLength, Rating} from '../../const';
import {isCommentFormReady} from '../../utils/offers';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {sendCommentAction} from '../../store/api-action';
import {getCommentDeliveringStatus, getCommentProcessingStatus} from '../../store/app-data/app-data.selectors';

function CommentForm(): JSX.Element {
  const params = useParams();
  const isCommentProcessing = useAppSelector(getCommentProcessingStatus);
  const isCommentDelivered = useAppSelector(getCommentDeliveringStatus);
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState({
    rating: 0,
    comment: ''
  });

  useEffect(() => {
    if (isCommentDelivered) {
      setFormData({
        comment: '',
        rating: 0
      });
    }
  }, [isCommentDelivered]);

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (isCommentFormReady(formData, isCommentProcessing) && params.id) {
      dispatch(sendCommentAction({
        id: params.id,
        commentData: {
          rating: formData.rating,
          comment: formData.comment
        }
      }));
    }
  };

  return (
    <form className='reviews__form  form' action='#' method='post' onSubmit={handleSubmit}>
      <label className='reviews__label  form__label' htmlFor='review'>Your review</label>
      <div className='reviews__rating-form  form__rating'>
        {Object.values(Rating).map((value, i) => {
          const rating = 5 - i;
          const inputId = `${rating}-stars`;

          return (
            <React.Fragment key={rating}>
              <input
                className='form__rating-input  visually-hidden'
                id={inputId}
                name='rating'
                value={rating}
                type='radio'
                checked={rating === formData.rating}
                onChange={(): void => {
                  setFormData({
                    ...formData,
                    rating
                  });
                }}
                disabled={isCommentProcessing}
                data-testid={`${rating}-stars-fields`}
              />
              <label
                className='reviews__rating-label  form__rating-label'
                htmlFor={inputId}
                title={value}
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
        value={formData.comment}
        onChange={({target}: ChangeEvent<HTMLTextAreaElement>) => {
          setFormData({
            ...formData,
            comment: target.value
          });
        }}
        disabled={isCommentProcessing}
        data-testid='comment-field'
      />
      <div className='reviews__button-wrapper'>
        <p className='reviews__help'>
          To submit review please make sure to set <span className='reviews__star'>rating</span> and describe your stay with at least <b className='reviews__text-amount'>{CommentLength.Min} characters</b>.
        </p>
        <button
          className='reviews__submit  form__submit button'
          type='submit'
          disabled={!isCommentFormReady(formData, isCommentProcessing)}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default CommentForm;

import React, {ChangeEvent, FormEvent, useState} from 'react';
import {useParams} from 'react-router-dom';
import {MIN_COMMENT_LENGTH, Rating} from '../../const';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {sendCommentAction} from '../../store/api-action';
import {getCommentProcessingStatus} from '../../store/app-data/app-data.selectors';

function CommentForm(): JSX.Element {
  const params = useParams();
  const isCommentProcessing = useAppSelector(getCommentProcessingStatus);
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState({
    rating: 0,
    comment: ''
  });

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (formData.rating && formData.comment.length >= MIN_COMMENT_LENGTH && params.id) {
      dispatch(sendCommentAction({
        id: params.id,
        commentData: {
          rating: formData.rating,
          comment: formData.comment
        }
      }));

      setFormData({
        ...formData,
        rating: 0,
        comment: ''
      });
    }
  };

  return (
    <form className='reviews__form  form' action='#' method='post' onSubmit={handleSubmit}>
      <label className='reviews__label  form__label' htmlFor='review'>Your review</label>
      <div className='reviews__rating-form  form__rating'>
        {Object.values(Rating).map((value, i) => {
          const rating = 5 - i;
          const inputId = `${rating}-star${rating === 1 ? '' : 's'}`;

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
      />
      <div className='reviews__button-wrapper'>
        <p className='reviews__help'>
          To submit review please make sure to set <span className='reviews__star'>rating</span> and describe your stay with at least <b className='reviews__text-amount'>{MIN_COMMENT_LENGTH} characters</b>.
        </p>
        <button className='reviews__submit  form__submit button' type='submit' disabled={!formData.rating || formData.comment.length < MIN_COMMENT_LENGTH || isCommentProcessing}>Submit</button>
      </div>
    </form>
  );
}

export default CommentForm;

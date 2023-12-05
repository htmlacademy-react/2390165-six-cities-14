import { FormEvent, ChangeEvent, Fragment, useState, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { postCommentAction } from '../../../store/api-actions';
import { useParams } from 'react-router-dom';
import { getIsReviewSending, getReviews } from '../../../store/offer-data/offer-data-selectors';
import { isReviewSending, setReviews } from '../../../store/offer-data/offer-data-slice';
import { LoadingDataStatus } from '../../../const';

function ReviewForm(): JSX.Element {
  const ratingMap = {
    'perfect': '5',
    'good': '4',
    'not bad': '3',
    'badly': '2',
    'terribly': '1'
  };

  const MIN_COMMENT_LENGTH = 49;
  const MAX_COMMENT_LENGTH = 299;

  const [comment, setComment] = useState('');
  const [rating, setRating] = useState('0');
  const isSendingStatus = useAppSelector(getIsReviewSending);

  const formRef = useRef<HTMLFormElement | null>(null);
  const form = formRef.current;

  const dispatch = useAppDispatch();
  const { offerId } = useParams();
  const reviewsList = useAppSelector(getReviews);
  const reviewsListCopy = structuredClone(reviewsList);

  const sendData = {
    reviewData: { comment, rating: Number(rating) },
    offerId,
  };


  function isDisabledSubmit() {
    const isCommentNotValid = (comment.length < MIN_COMMENT_LENGTH) || (comment.length > MAX_COMMENT_LENGTH);
    const isRatingNotValid = Boolean(Number(rating)) === false;

    return isCommentNotValid || isRatingNotValid || isSendingStatus === LoadingDataStatus.Pending;
  }

  function isDisabledForm(isSandingStatus: LoadingDataStatus): boolean {
    return isSandingStatus === LoadingDataStatus.Pending;
  }

  function formReset() {
    if (form) {
      form.reset();
      setComment('');
    }

  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    setRating(event.target.value);
  }

  function handleTextAreaChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setComment(event.target.value);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // dispatch(isReviewSending(LoadingDataStatus.Pending));
    // isDisabledForm(isSendingStatus);

    if (rating && comment && offerId && form) {
      dispatch(postCommentAction(sendData)).unwrap()
        .then((review) => {
          reviewsListCopy.push(review);
        })
        .then(() => {
          dispatch(setReviews(reviewsListCopy));
          formReset();
        })
        .then(() => {
          if (isSendingStatus === LoadingDataStatus.Success) {
            formReset();
          }

        });
      // .then(() => {
      //   dispatch(isReviewSending(LoadingDataStatus.Success));
      // isDisabledForm(isSendingStatus);
      // });
    }
  }

  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      ref={formRef}
      onSubmit={handleSubmit}
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>

      <div className="reviews__rating-form form__rating">
        {
          Object.entries(ratingMap).map(([title, score]) => (
            <Fragment key={score}>
              <input
                className="form__rating-input visually-hidden"
                name="rating"
                value={score}
                id={`${score}-stars`}
                type="radio"
                checked={rating === score}
                disabled={isDisabledForm(isSendingStatus)}
                onChange={handleInputChange}
              />
              <label
                htmlFor={`${score}-stars`}
                className="reviews__rating-label form__rating-label"
                title={title}
              >
                <svg className="form__star-image" width="37" height="33">
                  <use xlinkHref="#icon-star"></use>
                </svg>
              </label>
            </Fragment>

          ))
        }
      </div>


      <textarea
        className="reviews__textarea form__textarea"
        id="review" name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={comment}
        minLength={50}
        maxLength={300}
        disabled={isDisabledForm(isSendingStatus)}
        onChange={handleTextAreaChange}
      >
      </textarea>

      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={isDisabledSubmit()}
        >
          {isSendingStatus ? 'Sending...' : 'Submit'}
        </button>
      </div>
    </form>
  );
}

export default ReviewForm;

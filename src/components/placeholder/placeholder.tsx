import { useAppDispatch, useAppSelector } from '../../hooks';
import styles from './placeholder.module.css';
import { useEffect } from 'react';
import { isLoaded} from '../../store/actions';

function PlaceHolder(): JSX.Element | null {
  const isReady = useAppSelector((state) => state.isLoaded);
  const message = 'Loading...';
  // const dispatch = useAppDispatch();
  // useEffect(() => {
  //   setTimeout(() => dispatch(isLoaded()), 2000);

  // }, [dispatch]);

  function handleDocumentClick(event: KeyboardEvent) {
    event.preventDefault();
  }

  useEffect(() => {
    document.addEventListener('keydown', handleDocumentClick);
    return(() => document.removeEventListener('keydown', handleDocumentClick));
  }, []);

  if (isReady) {
    return null;
  }

  return (
    <p className={`${styles.message}`}>{message}</p>
  );
}

export { PlaceHolder };

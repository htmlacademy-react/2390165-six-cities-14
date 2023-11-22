import styles from './placeholder.module.css';

import { useEffect } from 'react';
import { useAppSelector } from '../../hooks';

function PlaceHolder(): JSX.Element | null {
  const isReady = useAppSelector((state) => state.isLoaded);
  const message = 'Loading...';

  function handleDocumentClick(event: MouseEvent) {
    event.preventDefault();
  }

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);
    return(() => document.removeEventListener('click', handleDocumentClick));
  }, []);

  if (isReady) {
    return null;
  }

  return (
    <p className={`${styles.message}`}>{message}</p>
  );
}

export { PlaceHolder };

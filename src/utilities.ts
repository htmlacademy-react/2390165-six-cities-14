import dayjs from 'dayjs';
import store from './store';
import { clearErrorAction } from './store/api-actions';
import { setError } from './store/app-process/app-process-slice';

function formatDate(value: dayjs.ConfigType, full: boolean = false): string {
  return dayjs(value).format(full ? 'MMMM YYYY' : 'YYYY-MM-DD');
}

function processErrorHandle(message: string): void {
  store.dispatch(setError(message));
  store.dispatch(clearErrorAction());
}

function dateInMs(value: string) {
  return Date.parse(value);
}

export {
  formatDate,
  processErrorHandle,
  dateInMs,
};

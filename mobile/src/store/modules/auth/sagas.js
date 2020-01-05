import { takeLatest, call, put, all } from 'redux-saga/effects';
import api from '../../../services/api';

import { signInSuccess } from './actions';

export function* signIn({ payload }) {
  const { id } = payload;

  const response = yield call(api.get, `/students/${id}`);

  if (!response.data) {
    console.tron.error('Student not found');
  }

  const { id: student_id } = response.data;

  yield put(signInSuccess(student_id));
}

export default all([takeLatest('@auth/SIGN_IN_REQUEST', signIn)]);

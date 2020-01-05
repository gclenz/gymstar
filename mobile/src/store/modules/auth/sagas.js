import { takeLatest, call, put, all } from 'redux-saga/effects';
import { Alert } from 'react-native';
import api from '../../../services/api';

import { signInSuccess, signInFailure } from './actions';

export function* signIn({ payload }) {
  try {
    const { id } = payload;

    const response = yield call(api.get, `/students/${id}`);

    const { id: student_id } = response.data;

    yield put(signInSuccess(student_id));
  } catch (error) {
    Alert.alert('Sign in failure', 'Check your student ID');
    yield put(signInFailure());
  }
}

export default all([takeLatest('@auth/SIGN_IN_REQUEST', signIn)]);

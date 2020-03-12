import { call, put, select } from 'redux-saga/effects';
import AsyncStorage from '@react-native-community/async-storage';

import { navigate } from '~/services/navigation';

import api from '~/services/api';
import AuthActions from '../ducks/auth';

export function* init() {
  const token = yield call([AsyncStorage, 'getItem'], '@Omni:token');

  if (token) {
    yield put(AuthActions.signInSuccess());
  }

  yield put(AuthActions.initCheckSuccess());
}

export function* signIn({ email, password }) {
  try {
    const response = yield call(api.post, 'sessions', { email, password });

    console.log(response);

    yield call([AsyncStorage, 'setItem'], '@Omni:token', response.data.token);

    yield put(AuthActions.signInSuccess(response.data.token));

    yield put(navigate('Main'));
  } catch (err) {
    console.log('Failed to SignIn');
  }
}

export function* signUp({ name, email, password }) {
  try {
    const response = yield call(api.post, 'users', {
      name,
      email,
      password,
    });

    yield call([AsyncStorage, 'setItem'], '@Omni:token', response.data.token);

    yield put(AuthActions.signInSuccess(response.data.token));

    // yield put(push('/'));
  } catch (err) {}
}

export function* signOut() {
  yield call([AsyncStorage, 'clear']);

  // localStorage.removeItem('@Omni:token');
  // localStorage.removeItem('@Omni:team');
  // yield put(push('/signin'));
}

export function* getPermissions() {
  const team = yield select(state => state.teams.active);
  const signedIn = yield select(state => state.auth.signedIn);

  if (!signedIn || !team) return;

  const response = yield call(api.get, 'permissions');

  const { roles, permissions } = response.data;

  yield put(AuthActions.getPermissionsSuccess(roles, permissions));
}

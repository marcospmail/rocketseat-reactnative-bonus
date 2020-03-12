import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

const { Types, Creators } = createActions({
  signInRequest: ['email', 'password'],
  signInSuccess: ['token'],
  signUpRequest: ['name', 'email', 'password'],
  signOut: null,
  getPermissionsSuccess: ['roles', 'permissions'],
  initCheckSuccess: null,
});

export const AuthTypes = Types;
export default Creators;

export const INITIAL_STATE = Immutable({
  authChecked: false,
  signedIn: false,
  token: null,
  roles: [],
  permissions: [],
  initChecked: false,
});

const initChecked = state => state.merge({ initChecked: true });

const success = (state, { token }) => state.merge({ signedIn: true, token });

const logout = state => state.merge({ signedIn: false, token: null });

const permissionsSuccess = (state, { permissions, roles }) =>
  state.merge({ permissions, roles });

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SIGN_IN_SUCCESS]: success,
  [Types.SIGN_OUT]: logout,
  [Types.GET_PERMISSIONS_SUCCESS]: permissionsSuccess,
  [Types.INIT_CHECK_SUCCESS]: initChecked,
});

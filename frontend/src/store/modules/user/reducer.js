import produce from 'immer';

const INITIAL_STATE = {
  userData: null,
};

export default function user(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@auth/SIGN_IN_SUCCESS': {
        draft.userData = action.payload.user;
        break;
      }
      case '@auth/SIGN_OUT': {
        draft.userData = null;
        break;
      }
      default:
        return state;
    }
  });
}

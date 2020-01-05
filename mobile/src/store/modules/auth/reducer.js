import produce from 'immer';

const INITIAL_STATE = {
  id: null,
  signed: false,
  loading: false,
};

export default function auth(state = INITIAL_STATE, action) {
  switch (action.type) {
    case '@auth/SIGN_IN_SUCCESS':
      return produce(state, draft => {
        draft.id = action.payload.id;
        draft.signed = true;
      });
    case '@auth/SIGN_OUT':
      return produce(state, draft => {
        draft.id = null;
        draft.signed = false;
      });
    default:
      return state;
  }
}

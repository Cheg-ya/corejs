import { BEST_REVIEWER_REQUEST_SUCCESS } from '../actionType/actionType';

const initialState = {
  reviewers: [],
  posts: {}
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case BEST_REVIEWER_REQUEST_SUCCESS :
    delete action.type;

    return {
      ...state,
      reviewers: state.reviewers.concat(action)
    };

    default :
      return state;
  }
};

export default reducer;

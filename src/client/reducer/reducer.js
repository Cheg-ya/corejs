import { BEST_REVIEWER_REQUEST_SUCCESS, POST_REQUEST_SUCCESS, LOGIN_SUCCESS, POST_CREATION_SUCCESS } from '../actionType/actionType';
import { getUserFormat, addNewData, addNewTags, getPostFormat } from '../utils/utils';
import _ from 'lodash';

const initialState = {
  reviewers: [],
  posts: {},
  users: {},
  stackTags: {},
  comments: {},
  loginUser: ''
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case LOGIN_SUCCESS :
      if (action.type === LOGIN_SUCCESS) {
        const { id, stacks } = action;

        const user = getUserFormat(action);

        return {
          ...state,
          users: addNewData(state.users, user),
          stackTags: addNewTags(state.stackTags, stacks),
          loginUser: id
        };
      }

    case BEST_REVIEWER_REQUEST_SUCCESS :
      if (action.type === BEST_REVIEWER_REQUEST_SUCCESS) {
        const { id, stacks } = action;

        const user = getUserFormat(action);

        return {
          ...state,
          reviewers: state.reviewers.concat(id),
          users: addNewData(state.users, user),
          stackTags: addNewTags(state.stackTags, stacks)
        };
      }

    case POST_REQUEST_SUCCESS :
      if (action.type === POST_REQUEST_SUCCESS) {
        const { stacks, postedBy, reviewers, comments } = action;

        const post = getPostFormat(action);

        return {
          ...state,
          posts: addNewData(state.posts, _.assign({}, post)),
          users: addNewData(state.users, _.assign({}, postedBy, reviewers)),
          comments: addNewData(state.comments, _.assign({}, comments)),
          stackTags: addNewTags(state.stackTags, stacks)
        };
      }

    case POST_CREATION_SUCCESS :
      if (action.type === POST_CREATION_SUCCESS) {
        const { stacks, postedBy } = action;

        const post = getPostFormat(action);

        return {
          ...state,
          posts: addNewData(state.posts, _.assign({}, post)),
          users: addNewData(state.users, _.assign({}, postedBy)),
          stackTags: addNewTags(state.stackTags, stacks)
        };
      }

    default :
      return state;
  }
};

export default reducer;

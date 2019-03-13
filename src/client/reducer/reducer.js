import { BEST_REVIEWER_REQUEST_SUCCESS, POST_REQUEST_SUCCESS, LOGIN_SUCCESS, POST_CREATION_SUCCESS } from '../actionType/actionType';
import { immutable } from '../Components/utils/utils';
import _ from 'lodash';

const initialState = {
  reviewers: [],
  posts: {},
  users: {},
  stackTags: {},
  loginUser: ''
};

const addNewTags = (origin, tags) => {
  const newTags = immutable(tags);
  const tagIds = _.keys(newTags);

  tagIds.forEach(id => {
    if (origin[id]) {
      delete newTags[id];
    }
  });

  return addNewData(origin, newTags);
};

const addNewData = (origin, target) => {
  return {
    ...origin,
    ...target
  };
};

const getUserFormat = action => {
  const { id, name, stacks, profile_image, github_url, description } = action;
  return {
    [id]: {
      id,
      name,
      profile_image,
      github_url,
      description,
      stacks: _.keys(stacks)
    }
  };
};

const getPostFormat = action => {
  const { id, title, description, created_at, stacks, postedBy, reviewers, code } = action;

  return {
    [id]: {
      id,
      postedBy: _.keys(postedBy)[0],
      title,
      description,
      created_at,
      code,
      reviewers: _.keys(reviewers),
      stacks: _.keys(stacks)
    }
  };
};

const reducer = (state = initialState, action) => { //user, post는 배열 데이터 정보를 모두 가지고 있으므로 리듀서에서 따로 처리 해야함
  switch(action.type) {                             //하위 정보는 참조값 배열을 이미 가지고 있으므로 바로 저장
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
        const { stacks, postedBy, reviewers } = action;

        const post = getPostFormat(action);

        return {
          ...state,
          posts: addNewData(state.posts, _.assign({}, post)),
          users: addNewData(state.users, _.assign({}, postedBy, reviewers)),
          stackTags: addNewTags(state.stackTags, stacks)
        };
      }

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

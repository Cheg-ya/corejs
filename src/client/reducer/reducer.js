import { BEST_REVIEWER_REQUEST_SUCCESS, PUBLIC_POST_REQUEST_SUCCESS } from '../actionType/actionType';
import { immutable } from '../Components/utils/utils';
import _ from 'lodash';

const initialState = {
  reviewers: [],
  posts: {},
  users: {},
  stackTags: {}
};

const addNewTags = (origin, tags) => {
  const newTags = immutable(tags);
  const tagIds = _.keys(newTags);

  tagIds.forEach(id => {
    if (origin[id]) {
      delete newTags[id];
    }
  });

  return {
    ...origin,
    ...newTags
  };
};

const addNewUser = (origin, target) => {
  return {
    ...origin,
    ...target
  };
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case BEST_REVIEWER_REQUEST_SUCCESS :
      if (action.type === BEST_REVIEWER_REQUEST_SUCCESS) {
        const { id, name, stacks, profile_image, github_url, description } = action;

        const user = {
          [id]: {
            id,
            name,
            profile_image,
            github_url,
            description,
            stacks: _.keys(stacks)
          }
        };

        return {
          ...state,
          reviewers: state.reviewers.concat(id),
          users: addNewUser(state.users, user),
          stackTags: addNewTags(state.stackTags, stacks)
        };
      }

    case PUBLIC_POST_REQUEST_SUCCESS :
      if (action.type === PUBLIC_POST_REQUEST_SUCCESS) {
        const { id, title, description, created_at, stacks, postedBy, reviewers } = action;

        return {
          ...state,
          posts: {
            ...state.posts,
            [id]: {
              id,
              postedBy: _.keys(postedBy)[0],
              title,
              description,
              created_at,
              reviewers: _.keys(reviewers),
              stacks: _.keys(stacks)
            }
          },
          users: addNewUser(state.users, _.assign({}, postedBy, reviewers)),
          stackTags: addNewTags(state.stackTags, stacks)
        };
      }
    default :
      return state;
  }
};

export default reducer;

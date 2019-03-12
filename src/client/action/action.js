import { BEST_REVIEWER_REQUEST_SUCCESS, POST_REQUEST_SUCCESS, LOGIN_SUCCESS } from '../actionType/actionType';

const organizeData = dataChunk => {
  const container = {};
  dataChunk.forEach(data => {
    const { _id } = data;
    delete data._id;
    container[_id] = { id: _id, ...data };
  });

  return container;
};

export const fetchBestReviewers = action => {
  const { name, profile_image, github_url, description, stacks, _id } = action;

  return {
    type: BEST_REVIEWER_REQUEST_SUCCESS,
    id: _id,
    name,
    profile_image,
    github_url,
    description,
    stacks: organizeData(stacks)
  };
};

export const fetchPosts = action => {
  const { _id, title, description, created_at, stacks, reviewers, postedBy } = action;

  return {
    type: POST_REQUEST_SUCCESS,
    id: _id,
    title,
    description,
    created_at,
    stacks: organizeData(stacks),
    reviewers: organizeData(reviewers),
    postedBy: organizeData([postedBy])
  };
};

export const storeLoginUser = action => {
  const { name, profile_image, github_url, description, stacks, _id } = action;

  return {
    type: LOGIN_SUCCESS,
    id: _id,
    name,
    profile_image,
    github_url,
    description,
    stacks: organizeData(stacks)
  };
};

import { BEST_REVIEWER_REQUEST_SUCCESS, POST_REQUEST_SUCCESS, LOGIN_SUCCESS, POST_CREATION_SUCCESS } from '../actionType/actionType';

const organizeData = dataChunk => {
  let container = {};

  dataChunk.forEach(data => {
    const { _id } = data;
    delete data._id;

    let reply;

    if (data.reply && data.reply.length) {
      reply = organizeData(data.reply);
      data.reply = _.keys(reply);
    }

    if (reply) {
      container = _.assign(container, reply);
    }

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
  const { _id, title, description, created_at, stacks, reviewers, postedBy, code, comments } = action;

  return {
    type: POST_REQUEST_SUCCESS,
    id: _id,
    title,
    description,
    created_at,
    code,
    stacks: organizeData(stacks),
    reviewers: organizeData(reviewers),
    postedBy: organizeData([postedBy]),
    comments: organizeData(comments)
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

export const addNewPost = action => {
  const { _id, title, description, created_at, stacks, reviewers, postedBy, code, comments } = action;

  return {
    type: POST_CREATION_SUCCESS,
    id: _id,
    title,
    description,
    created_at,
    code,
    stacks: organizeData(stacks),
    reviewers: organizeData(reviewers),
    postedBy: organizeData([postedBy]),
    comments: organizeData(comments)
  };
};

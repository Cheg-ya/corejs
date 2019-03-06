import { BEST_REVIEWER_REQUEST_SUCCESS } from '../actionType/actionType';

export const fetchBestReviewers = action => {
  const { name, profile_image, github, description, stacks } = action;

  return {
    type: BEST_REVIEWER_REQUEST_SUCCESS, // more specific naming
    name,
    profile_image,
    github,
    description,
    stacks
  };
}

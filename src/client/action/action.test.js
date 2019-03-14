import { BEST_REVIEWER_REQUEST_SUCCESS, POST_REQUEST_SUCCESS, LOGIN_SUCCESS, POST_CREATION_SUCCESS } from '../actionType/actionType';
import { organizeData, fetchBestReviewers, fetchPosts, storeLoginUser, addNewPost } from './action';

describe('organizeData', () => {
  it('should return object', () => {
    expect(organizeData([{ name: "React", _id: "5c80f44a2be7fa5d702f4e15" }])).toEqual();
  });
});

describe('fetchBestReviewers', () => {
  const reviewerAction =  {
    _id: "5c7d158c204f3d3a1cf7d49e",
    name: "Ken",
    description: "Ken is a software engineer",
    comment_count: 1000,
    profile_image: "./public/main.jpg",
    email: "ken@ken.com",
    github_id: 1,
    github_url: "http://github.com/ken",
    user_posts: [],
    stacks: [
      {
        name: "React",
        _id: "5c80f44a2be7fa5d702f4e15"
      }
    ],
    comments:[],
    private_requests: [],
    reviewing_posts: [],
    created_at: "2019-03-11 20:30:20.276",
    updated_at: "2019-03-11T11:30:20.276Z"
  };

  it('Action Data should have specific properties', () => {
    expect(reviewerAction).toEqual(expect.objectContaining({
      _id: expect.any(String),
      name: expect.any(String),
      description: expect.any(String),
      comment_count: expect.any(Number),
      profile_image: expect.any(String),
      email: expect.any(String),
      github_id: expect.any(Number),
      github_url: expect.any(String),
      user_posts: expect.any(Array),
      stacks: expect.any(Array),
      comments: expect.any(Array),
      private_requests: expect.any(Array),
      reviewing_posts: expect.any(Array),
      created_at: expect.any(String),
      updated_at: expect.any(String)
    }));
  });

  it('should return an object with properties', () => {
    const { _id, name, stacks, github_url, profile_image, description } = reviewerAction;
    const expected = {
      type: BEST_REVIEWER_REQUEST_SUCCESS,
      id: _id,
      name,
      profile_image,
      description,
      github_url,
      stacks: {
        [stacks[0]._id]: {
          id: stacks[0]._id,
          name: stacks[0].name
        }
      }
    };

    expect(fetchBestReviewers(reviewerAction)).toEqual(expected);
  });

  it('should return an object with specific types of property', () => {
    expect(fetchBestReviewers(reviewerAction)).toEqual(expect.objectContaining({
      type: expect.any(String),
      id: expect.any(String),
      name: expect.any(String),
      profile_image: expect.any(String),
      description: expect.any(String),
      github_url: expect.any(String),
      stacks: expect.any(Object)
    }));
  });
});

describe('storeLoginUser', () => {
  const loginUserAction = {
    _id: "5c861fa959672b4a70f7808e",
    comment_count: 0,
    profile_image: "https://avatars1.githubusercontent.com/u/42037023?v=4",
    description: "",
    stacks: [],
    user_posts: ["5c833b62496fa1537866776c"],
    comments: [],
    reviewing_posts: [],
    private_request: [],
    github_id: 42037023,
    name: "Cheg-ya",
    email: "axoghks@gmail.com",
    github_url: "https://github.com/Cheg-ya",
    created_at: "2019-03-11 08:43:21.364",
    updated_at: "2019-03-14 05:55:31.139"
  };
});

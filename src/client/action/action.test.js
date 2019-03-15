import { BEST_REVIEWER_REQUEST_SUCCESS, POST_REQUEST_SUCCESS, LOGIN_SUCCESS, POST_CREATION_SUCCESS } from '../actionType/actionType';
import * as action from './action';
import * as utils from '../utils/utils';

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

    expect(action.fetchBestReviewers(reviewerAction)).toEqual(expected);
  });

  it('should return an object with specific types of property', () => {
    expect(action.fetchBestReviewers(reviewerAction)).toEqual(expect.objectContaining({
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
    stacks: [
      {
        name: "React",
        _id: "5c80f44a2be7fa5d702f4e15"
      }
    ],
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

  it('Action Data should have specific properties', () => {
    expect(loginUserAction).toEqual(expect.objectContaining({
      _id: expect.any(String),
      comment_count: expect.any(Number),
      profile_image: expect.any(String),
      description: expect.any(String),
      stacks: expect.any(Array),
      user_posts: expect.any(Array),
      comments: expect.any(Array),
      reviewing_posts: expect.any(Array),
      private_request: expect.any(Array),
      github_id: expect.any(Number),
      name: expect.any(String),
      email: expect.any(String),
      github_url: expect.any(String),
      created_at: expect.any(String),
      updated_at: expect.any(String),
    }));
  });

  it('should return an object with properties', () => {
    const { _id, profile_image, description, stacks, name, github_url, } = loginUserAction;
    
    const expected = {
      type: LOGIN_SUCCESS,
      id: _id,
      name,
      description,
      profile_image,
      github_url,
      stacks: {
        [stacks[0]._id]: {
          id: stacks[0]._id,
          name: stacks[0].name
        }
      }
    };

    expect(action.storeLoginUser(loginUserAction)).toEqual(expected);
  });

  it('should return an object with specific types of property', () => {
    const result = action.storeLoginUser(loginUserAction);

    expect(result).toEqual(expect.objectContaining({
      type: expect.any(String),
      id: expect.any(String),
      name: expect.any(String),
      description: expect.any(String),
      profile_image: expect.any(String),
      github_url: expect.any(String),
      stacks: expect.any(Object)
    }));
  });
});

describe('fetchPosts', () => {
  const fetchPostAction = {
    _id: "5c89ecd2bf87c34730612cf0",
    close: false,
    code: [
      {
        code: "const a = 0;",
        title: "NewPost.js"
      }
    ],
    stacks: [
      {
        name: "React",
        _id: "5c80f44a2be7fa5d702f4e15"
      }
    ],
    reviewers: [
      {
        _id: "5c861fa959672b4a70f7808e",
        comment_count: 0,
        profile_image: "https://avatars1.githubusercontent.com/u/42037023?v=4",
        description: "",
        stacks: [
          {
            name: "React",
            _id: "5c80f44a2be7fa5d702f4e15"
          }
        ],
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
      }
    ],
    comments: [
      {
        _id: "5c88bf9537a71b4b5c984015",
        postedBy: {},
        review_line: 50,
        description: "good :)",
        reply: [],
        created_at: "2019-03-13 17:34:10.305",
        updated_at: "2019-03-13 17:34:10.305"
      }
    ],
    postedBy: {
      _id: "5c861fa959672b4a70f7808e",
      comment_count: 0,
      profile_image: "https://avatars1.githubusercontent.com/u/42037023?v=4",
      description: "",
      stacks: [
        {
          name: "React",
          _id: "5c80f44a2be7fa5d702f4e15"
        }
      ],
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
    },
    title: "create review post modal",
    description: "new post modal",
    public_state: true,
    created_at: "2019-03-14 14:55:30.919",
    updated_at: "2019-03-14 14:55:30.919"
  };

  it('Action Data should have specific properties', () => {
    expect(fetchPostAction).toEqual(expect.objectContaining({
      _id: expect.any(String),
      close: expect.any(Boolean),
      code: expect.any(Array),
      stacks: expect.any(Array),
      reviewers: expect.any(Array),
      comments: expect.any(Array),
      postedBy: expect.any(Object),
      title: expect.any(String),
      description: expect.any(String),
      public_state: expect.any(Boolean),
      created_at: expect.any(String),
      updated_at: expect.any(String),
    }));
  });

  it('should call organizeData 8 times in total and return an object', () => {
    const { _id, title, description, created_at, code } = fetchPostAction;
    const originalOrganizeDataFunc = utils.organizeData;
    utils.organizeData = jest.fn(() => ({}));

    const result = action.fetchPosts(fetchPostAction);
    const expected = {
      type: POST_REQUEST_SUCCESS,
      id: _id,
      title,
      description,
      created_at,
      code,
      stacks: utils.organizeData(),
      postedBy: utils.organizeData(),
      reviewers: utils.organizeData(),
      comments: utils.organizeData()
    };

    expect(result).toEqual(expected);
    expect(utils.organizeData).toHaveBeenCalledTimes(8);
    utils.organizeData = originalOrganizeDataFunc;
  });

  it('should return an object with specific types of property', () => {
    const result = action.fetchPosts(fetchPostAction);

    expect(result).toEqual(expect.objectContaining({
      type: POST_REQUEST_SUCCESS,
      id: expect.any(String),
      title: expect.any(String),
      description :expect.any(String),
      created_at: expect.any(String),
      code: expect.any(Array),
      stacks: expect.any(Object),
      postedBy: expect.any(Object),
      reviewers: expect.any(Object),
      comments: expect.any(Object)
    }));
  });
});

describe('AddNewPost', () => {
  const addNewPostAction = {
    _id: "5c89ecd2bf87c34730612cf0",
    close: false,
    code: [
      {
        code: "const a = 0;",
        title: "NewPost.js"
      }
    ],
    stacks: [
      {
        name: "React",
        _id: "5c80f44a2be7fa5d702f4e15"
      }
    ],
    reviewers: [],
    comments: [],
    postedBy: {
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
    },
    title: "create review post modal",
    description: "new post modal",
    public_state: true,
    created_at: "2019-03-14 14:55:30.919",
    updated_at: "2019-03-14 14:55:30.919"
  };

  it('Action Data should have specific properties', () => {
    expect(addNewPostAction).toEqual(expect.objectContaining({
      _id: expect.any(String),
      close: expect.any(Boolean),
      code: expect.any(Array),
      stacks: expect.any(Array),
      reviewers: expect.any(Array),
      comments: expect.any(Array),
      postedBy: expect.any(Object),
      title: expect.any(String),
      description: expect.any(String),
      public_state: expect.any(Boolean),
      created_at: expect.any(String),
      updated_at: expect.any(String),
    }));
  });

  it('should call organizeData 8 times in total and return an object', () => {
    const { _id, title, description, created_at, code } = addNewPostAction;
    const originalOrganizeDataFunc = utils.organizeData;
    utils.organizeData = jest.fn(() => ({}));

    const result = action.addNewPost(addNewPostAction);
    const expected = {
      type: POST_CREATION_SUCCESS,
      id: _id,
      title,
      description,
      created_at,
      code,
      stacks: utils.organizeData(),
      postedBy: utils.organizeData(),
      reviewers: utils.organizeData(),
      comments: utils.organizeData()
    };

    expect(result).toEqual(expected);
    expect(utils.organizeData).toHaveBeenCalledTimes(8);
    utils.organizeData = originalOrganizeDataFunc;
  });

  it('should return an object with specific types of property', () => {
    const result = action.addNewPost(addNewPostAction);

    expect(result).toEqual(expect.objectContaining({
      type: POST_CREATION_SUCCESS,
      id: expect.any(String),
      title: expect.any(String),
      description :expect.any(String),
      created_at: expect.any(String),
      code: expect.any(Array),
      stacks: expect.any(Object),
      postedBy: expect.any(Object),
      reviewers: expect.any(Object),
      comments: expect.any(Object)
    }));
  });
});

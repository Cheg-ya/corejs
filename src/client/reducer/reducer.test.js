import { getUserFormat, addNewData, addNewTags, getPostFormat } from '../utils/utils';
import reducer from './reducer';
import _ from 'lodash';

const initialState = {
  reviewers: [],
  posts: {},
  users: {},
  stackTags: {},
  comments: {},
  loginUser: ''
};

describe('reducer', () => {
  const expectedStatePropertyType = {
    reviewers: expect.any(Array),
    posts: expect.any(Object),
    users: expect.any(Object),
    stackTags: expect.any(Object),
    comments: expect.any(Object),
    loginUser: expect.any(String),
  };

  const expectedUserDataType = {
    id: expect.any(String),
    name: expect.any(String),
    description: expect.any(String),
    profile_image: expect.any(String),
    github_url: expect.any(String),
    stacks: expect.any(Array)
  };

  const expectedStackTagDataType = {
    id: expect.any(String),
    name: expect.any(String)
  };

  it('should return initial state with specific types of property', () => {
    const result = reducer(undefined, '');

    expect(result).toEqual(initialState);
    expect(result).toEqual(expect.objectContaining(expectedStatePropertyType));
  });

  const userDataAction = {
    type: "LOGIN_SUCCESS",
    id: "5c861fa959672b4a70f7808e",
    name: "Cheg-ya",
    description: "",
    profile_image: "https://avatars1.githubusercontent.com/u/42037023?v=4",
    github_url: "https://github.com/Cheg-ya",
    stacks: {
      "12345": {
        id: "12345",
        name: "redux"
      }
    }
  };

  describe('LOGIN_SUCCESS', () => {
    const result = reducer(initialState, userDataAction);
    const userId = userDataAction.id;
    const stackId = _.keys(userDataAction.stacks)[0];

    it('should update state of properties of loginUser, users and stackTags', () => {      
      expect(result).toEqual(expect.objectContaining(expectedStatePropertyType));
      expect(result.loginUser).not.toHaveLength(0);
      expect(result.users[userId]).not.toBeUndefined();
      expect(result.users[userId].id).toBe(userId);
      expect(result.stackTags[stackId]).not.toBeUndefined();
      expect(result.stackTags[stackId].id).toBe(stackId);
    });

    it('check if login user data is updated with specific format', () => {
      expect(result.users[userId]).toEqual(expect.objectContaining(expectedUserDataType));
    });

    it('check if stack data is updated with specific format', () => {
      expect(result.stackTags[stackId]).toEqual(expect.objectContaining(expectedStackTagDataType));
    });
  });

  const postDataAction = {
    type: "POST_REQUEST_SUCCESS",
    id: "5c89ecd2bf87c34730612cf0",
    title: "create review post modal",
    description: "new post modal",
    created_at: "2019-03-14T05:55:30.919Z",
    code: [
      {
        code: "const a = 1;",
        title: "NewPost.js"
      }
    ],
    comments: {},
    postedBy: {
      "5c89ecd2bf87c34730612cf0": {
        id: "5c89ecd2bf87c34730612cf0"
      }
    },
    reviewers: {},
    stacks: {
      "12345": {
        id: "12345",
        name: "redux"
      }
    }
  };

  const expectedPostDataType = {
    id: expect.any(String),
    postedBy: expect.any(String),
    title: expect.any(String),
    description: expect.any(String),
    created_at: expect.any(String),
    stacks: expect.any(Array),
    comments: expect.any(Array),
    reviewers: expect.any(Array),
    code: expect.any(Array)
  };

  describe('BEST_REVIEWER_REQUEST_SUCCESS', () => {
    const result = reducer(initialState, postDataAction);
    const postId = postDataAction.id;

    it('should update state of properties of loginUser, users and stackTags', () => {
      expect(result).toEqual(expect.objectContaining(expectedStatePropertyType));
    });

    it('check if stack data is updated with specific format', () => {
      expect(result.posts[postId]).toEqual(expect.objectContaining(expectedPostDataType));
    });
  });
});

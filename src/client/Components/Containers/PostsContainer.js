import { immutable, getTagsName, getAuthorInfo, getReviewerInfo, convertDateType } from '../utils/utils';
import { fetchPosts } from '../../action/action';
import { connect } from 'react-redux';
import axios from 'axios';

const mapStateToProps = (state, ownProps) => {
  const { page } = ownProps.match.params;
  const { posts, users, stackTags, loginUser } = state;
  let postsInfo = _.values(immutable(posts));

  if (!postsInfo.length) {
    return {
      posts: [],
      loginUser: users[loginUser]
    };
  }

  if (page === 'reviews' && postsInfo.length) {
    postsInfo = postsInfo.filter(({ postedBy }) => postedBy === loginUser);
  }

  postsInfo.forEach(({ created_at }, i) => {
    postsInfo[i].created_at = convertDateType(created_at);
  });

  if (postsInfo.length > 1) {
    postsInfo.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  }

  const tagResult = getTagsName(postsInfo, stackTags);
  const authorResult = getAuthorInfo(tagResult, users);
  const reviewerResult = getReviewerInfo(authorResult, users);

  return {
    posts: reviewerResult,
    loginUser: users[loginUser]
  };
};

const mapDispatchToProps = dispatch => {
  return {
    async onPostsComponentMount(amount) {
      const { page } = this.props.match.params;
      const userId = this.props.loginUser.id;
      const token = localStorage.getItem('token');
      const limit = amount || 10;
      const that = this;
      const header = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      let url = ``;

      if (page === 'reviews')  {
        url = `/api/users/${userId}/posts?limit=${limit}&sort=desc`;
      } else {
        url = `/api/posts?limit=${limit}&sort=desc`;
      }

      try {
        const postsData = await axios.get(url, header);

        postsData.data.forEach(post => {
          dispatch(fetchPosts(post));
        });

        that.setState(prevState => {
          return {
            fetchOnProgress: !prevState.fetchOnProgress
          };
        });

      } catch(err) {
        const serverError = err.response;

        if (serverError) {
          const serverErrorMsg = serverError.data.message;
          alert(serverErrorMsg);

        } else {
          alert(err.message);
        }

        that.setState(prevState => {
          return {
            fetchOnProgress: !prevState.fetchOnProgress
          };
        });
      }
    },
    async createNewPost(data) {
      const { id } = this.props.loginUser;
      const url = `/api/users/${id}/posts`;
      const token = localStorage.getItem('token');
      const header = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };


      try {
        const result = await axios.post(url, data, header); //addnewpost action
        const { updatedUser, newPost } = result.data;
        debugger;
      } catch (err) {
        const serverError = err.response;

        if (serverError) {
          const serverErrorMsg = serverError.data.message;
          return alert(serverErrorMsg);
        }

        alert(err.message);
      }
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps);

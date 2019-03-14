import { immutable, getTagsName, getAuthorInfo, getReviewerInfo, convertDateType, getCommentInfo } from '../utils/utils';
import { fetchPosts } from '../../action/action';
import { connect } from 'react-redux';
import axios from 'axios';

const mapStateToProps = (state, ownProps) => {
  const { posts, users, loginUser, comments, stackTags } = state;
  const postId = ownProps.location.state.id;
  const targetPost = immutable(posts)[postId];
  const userInfo = immutable(users)[loginUser];

  if (!targetPost) {
    return {
      post: [],
      userInfo: {}
    };
  }

  const withTagName = getTagsName([targetPost], stackTags);
  const withAuthorInfo = getAuthorInfo(withTagName, users);
  const withComments = getCommentInfo(withAuthorInfo, comments, users);

  return {
    post: withComments,
    userInfo
  };
};

const mapDispatchToProps = dispatch => {
  return {
    async onReviewDidMount() {
      const targetPostId = this.props.location.state.id;
      const token = localStorage.getItem('token');
      const headers = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      try {
        const result = await axios.get(`/api/posts/${targetPostId}`, headers);
        const { post } = result.data;

        dispatch(fetchPosts(post));

        this.setState(prevState => {
          return {
            fetchOnProgress: !prevState.fetchOnProgress
          };
        });

      } catch (err) {
        const serverError = err.response;

        if (serverError) {
          const serverErrorMsg = serverError.data.message;
          alert(serverErrorMsg);

        } else {
          alert(`onReviewDidMount: ${err.message}`);
        }

        this.setState(prevState => {
          return {
            fetchOnProgress: !prevState.fetchOnProgress
          };
        });
      }
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps);

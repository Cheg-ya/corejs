import { immutable, getTagsName, getAuthorInfo, getReviewerInfo } from '../utils/utils';
import { fetchPublicPosts } from '../../action/action';
import { connect } from 'react-redux';
import axios from 'axios';

const mapStateToProps = (state, ownProps) => {
  const { page } = ownProps.match.params;
  const { posts, users, stackTags, loginUser } = state;
  let postsInfo = _.values(immutable(posts));

  if (!_.values(posts).length) {
    return {
      posts: []
    };
  }

  if (page === 'reviews') {
    postsInfo = postsInfo.filter(({ postedBy }) => postedBy === loginUser);
  }

  const tagResult = getTagsName(postsInfo, stackTags);
  const authorResult = getAuthorInfo(tagResult, users);
  const reviewerResult = getReviewerInfo(authorResult, users);

  return {
    posts: reviewerResult
  };
};

const mapDispatchToProps = dispatch => {
  return {
    async onPostsComponentMount(amount) {
      const { page } = this.props.match.params;
      const token = localStorage.getItem('token');
      const limit = amount || 10;
      const that = this;
      let url = ``;

      if (page === 'reviews')  {
        url = `/api/users/${token}/posts?limit=${limit}&sort=desc`;
      } else {
        url = `/api/posts?limit=${limit}&sort=desc`;
      }

      try {
        const postsData = await axios.get(url)
        const { data } = postsData;

        data.forEach(post => {
          dispatch(fetchPublicPosts(post));
        });

        that.setState(prevState => {
          return {
            fetchOnProgress: !prevState.fetchOnProgress
          };
        });

      } catch(err) {
        alert(err.message);

        that.setState(prevState => {
          return {
            fetchOnProgress: !prevState.fetchOnProgress
          };
        });
      }
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps);

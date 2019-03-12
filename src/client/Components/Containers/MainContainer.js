import { immutable, getTagsName, getUserById } from '../utils/utils';
import { fetchBestReviewers, storeLoginUser } from '../../action/action';
import { connect } from 'react-redux';
import axios from 'axios';
import _ from 'lodash';

const getReviewersData = state => {
  const { reviewers, stackTags, users } = state;

  if (!reviewers.length) {
    return {
      reviewers: []
    };
  }

  const popularUsers = getUserById(reviewers, users);
  const reviewersInfo = _.values(immutable(popularUsers));
  const result = getTagsName(reviewersInfo, stackTags);

  return {
    reviewers: _.values(result)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    async onMainPageMount() {
      try {
        const result = await axios.get('/api/users/popular?limit=4&sort=desc');

        result.data.forEach(reviewer => {
          dispatch(fetchBestReviewers(reviewer));
        });

      } catch(err) {
        const serverError = err.response;

        if (serverError) {
          const serverErrMsg = serverError.data.message;
          return alert(serverErrMsg)
        }

        alert(err.message);
      }
    },
    async storeUserInfo(header) {
      try {
        const result = await axios.post('/api/auth/github', header);

        const { message, token, user } = result.data;

        if (message === 'success') {
          localStorage.setItem('token', token);

          dispatch(storeLoginUser(user));

          return this.props.history.push('/posts');
        }

      } catch (err) {
        const serverError = err.response;
        
        if (serverError) {
          const serverErrMsg = serverError.data.message;
          return alert(serverErrMsg);
        }

        return alert(err.message);
      }
    }
  };
};

export default connect(getReviewersData, mapDispatchToProps);

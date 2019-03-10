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
    onMainPageMount() {
      axios.get('/api/users/popular?limit=4&sort=desc').then(({ data }) => {
        data.forEach(reviewer => {
          dispatch(fetchBestReviewers(reviewer));
        });
      }).catch(err => alert(err.message));
    },
    storeUserInfo(header) {
      axios.post('/api/auth/github', header).then(result => {
        const { message, token, user } = result.data;

        if (message === 'success') {
          localStorage.setItem('token', token);
          dispatch(storeLoginUser(user));

          return this.props.history.push('/posts');
        }

      }).catch(err => { // check where response comes from
        // const { message } = err.response.data;
        debugger;
        return alert(err.message);
      });
    }
  };
};

export default connect(getReviewersData, mapDispatchToProps);

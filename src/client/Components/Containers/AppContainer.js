import { storeLoginUser } from '../../action/action';
import { connect } from 'react-redux';
import config from '../../config';
import firebase from 'firebase';
import axios from 'axios';

const mapStateToProps = state => {
  return {
    loginUser: state.loginUser
  }
};

const mapDispatchToProps = dispatch => {
  return {
    async getLoginUserId() {
      const token = localStorage.getItem('token');

      if (token) {
        try {
          const result = await axios.post('/api/auth/check', { token });
          const { message, user} = result.data;

          if (message === 'valid') {
            if (!firebase.apps.length) {
              firebase.initializeApp(config);
            }

            dispatch(storeLoginUser(user));
          }

        } catch(err) {
          const serverError = err.response;

          if (serverError) {
            const serverErrMsg = serverError.data.message;

            localStorage.removeItem('token');

            alert(serverErrMsg);

            return window.location = '/';
          }

          alert(`getLoginUserId: ${err.message}`);
        }
      }
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps, null, { pure: false });

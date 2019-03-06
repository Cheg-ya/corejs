import { fetchBestReviewers } from '../../action/action';
import React, { Component } from 'react';
import Modal from '../Modals/Modal';
import { connect } from 'react-redux';
import firebase from 'firebase';
import axios from 'axios';
import './Main.css';
import Login from '../Login/Login';

class Main extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      displayLoginModal:false
    };

    this.githubLogin = this.githubLogin.bind(this);
    this.pageRefresher = this.pageRefresher.bind(this);
    this.displayReviewers = this.displayReviewers.bind(this);
    this.toggleSignInModal = this.toggleSignInModal.bind(this);
  }

  componentDidMount() {
    const { reviewers, onMainPageMount } = this.props;

    if (!reviewers.length) {
      onMainPageMount()
    }
  }

  displayReviewers(reviewers) {
    return reviewers.map((reviewer, i) => {
      const { name, stacks, description, github, profile_image } = reviewer;

      return (
        <div className="reviewerCover" key={i}>
          <img className="profileImg" src={profile_image} alt="" />
          <div className="reviewer name">{name}</div>
          <div>
            <p className="reviewer description">{description}</p>
          </div>
          <div className="reviewer stacks">{stacks.join(' ')}</div>
          <a className="gitLink" href={github} target="_blank" title="Click to Github">
            <img className="reviewer github" src="./public/octocat.png" />
          </a>
        </div>
      );
    });
  }

  toggleSignInModal() {
    this.setState(prevState => {
      return {
        displayLoginModal: !prevState.displayLoginModal
      };
    });
  }

  githubLogin() {
    const config = {
      apiKey: "AIzaSyBM2SLOqhZfnsyF-gzZIPKB3oYPHyh7ouQ",
      authDomain: "corejs-b1881.firebaseapp.com"
    };

    firebase.initializeApp(config);

    const provider = new firebase.auth.GithubAuthProvider();

    firebase.auth().signInWithPopup(provider).then(result => {
      // const token = result.credential.accessToken;
      const { email } = result.user;
      const { username } = result.additionalUserInfo;
      const { avatar_url, html_url, id} = result.additionalUserInfo.profile;

      axios.post('/api/auth/github', {
        email,
        username,
        avatar_url,
        html_url,
        github_Id: id
      }).then(result => {
        const { message, token } = result.data;

        if (message === 'success') {
          localStorage.setItem('token', token);

          return this.props.history.push('/posts');
        }

      }).catch(err => alert(err.message));

    }).catch(error => {
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      
      return alert(errorMessage);
    });
  }

  pageRefresher() {
    location.reload();
  }

  render() {
    const { displayLoginModal } = this.state;
    const { reviewers } = this.props;

    return (
      <div className="mainContainer">
        <div className="titleCover" onClick={this.pageRefresher}>
          <div className="titleName">Core</div>
        </div>
        <div className="imageCover">
          <div className="imageBackground"></div>
          <img className="mainImg" src="./public/main.jpg" alt="" />
          <pre className="sloganCover">
            <h1 className="slogan">Grow up with </h1><span>Core</span>
          </pre>
          <button onClick={this.toggleSignInModal} className="SignBtn">Get Started </button>
        </div>
        <div className="popularUsers">
          <div className="reviewerContainer">
            <h1>Most Popular Reviewers</h1>
            {reviewers.length > 0 && this.displayReviewers(reviewers)}
          </div>
        </div>
        {displayLoginModal && 
          <Modal closeModal={this.toggleSignInModal}>
            <Login login={this.githubLogin} />
          </Modal>}
      </div>
    );
  }
}

const mapState = (state, ownProps) => {
  const { reviewers } = state;

  return {
    reviewers
  };
};

const mapDispatch = dispatch => {
  return {
    onMainPageMount() {
      axios.get('/api/users/popular?limit=4&sort=desc').then(({ data }) => {
        data.forEach(reviewer => {
          dispatch(fetchBestReviewers(reviewer));
        });
      }).catch(err => alert(err.message));
    }
  };
};

export default connect(mapState, mapDispatch)(Main);

import MainContainer from '../Containers/MainContainer';
import React, { Component } from 'react';
import Modal from '../Modals/Modal';
import Login from '../Login/Login';
import config from '../../config';
import firebase from 'firebase';
import './Main.css';

class Main extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      displayLoginModal:false,
      fetchOnProgress: false
    };

    this.githubLogin = this.githubLogin.bind(this);
    this.pageRefresher = this.pageRefresher.bind(this);
    this.displayReviewers = this.displayReviewers.bind(this);
    this.toggleSignInModal = this.toggleSignInModal.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    const isRequestSuccess = this.state.fetchOnProgress && !nextState.fetchOnProgress;

    if (!this.state.fetchOnProgress) {
      return true;
    }

    return isRequestSuccess;
  }

  componentDidMount() {
    const { reviewers, onMainPageMount, history } = this.props;
    const boundOnMainPageMount = onMainPageMount.bind(this);
    const loggedIn = localStorage.getItem('token');

    if (loggedIn) {
      return history.push('/posts');
    }

    if (!reviewers.length) {
      this.setState(() => {
        return {
          fetchOnProgress: true
        };
      }, boundOnMainPageMount);
    }
  }

  displayReviewers(reviewers) {
    return reviewers.map((reviewer, i) => {
      const { name, stacks, description, github_url, profile_image } = reviewer;

      return (
        <div className="reviewerCover" key={i}>
          <img className="profileImg" src={profile_image} alt="" />
          <div className="reviewer name">{name}</div>
          <div>
            <p className="reviewer description">{description}</p>
          </div>
          <div className="reviewer stacks">{stacks.map(({ name }) => name).join(' ')}</div>
          <a className="gitLink" href={github_url} target="_blank" title="Click to Github">
            <img className="reviewer github" src="./public/images/octocat.png" />
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

  async githubLogin() {
    firebase.initializeApp(config);

    const provider = new firebase.auth.GithubAuthProvider();

    try {
      const result = await firebase.auth().signInWithPopup(provider);

      const { email } = result.user;
      const { username } = result.additionalUserInfo;
      const { avatar_url, html_url, id} = result.additionalUserInfo.profile;
      const header = {
        email,
        username,
        avatar_url,
        html_url,
        github_id: id
      };
    
      this.props.storeUserInfo.call(this, header);

    } catch(error) {
      return alert(error.message);
    };
  }

  pageRefresher() {
    location.reload();
  }

  render() {
    const { displayLoginModal } = this.state;
    const { reviewers } = this.props;

    return (
      <div className="mainContainer">
        <div className="titleCover">
          <div className="titleName" onClick={this.pageRefresher}>Core</div>
        </div>
        <div className="imageCover">
          <div className="imageBackground"></div>
          <img className="mainImg" src="./public/images/main.jpg" alt="" />
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
        (<Modal closeModal={this.toggleSignInModal}>
          <Login login={this.githubLogin} closeModal={this.toggleSignInModal} />
        </Modal>)}
      </div>
    );
  }
}

export default MainContainer(Main);

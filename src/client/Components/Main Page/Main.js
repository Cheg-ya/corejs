import React, { Component } from 'react';
import axios from 'axios';
import './Main.css';
import SignIn from '../Modals/SignIn/SignIn';

class Main extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      bestReviewer: [],
      displayLoginModal:false
    };

    this.githubLogin = this.githubLogin.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
    this.displayReviewers = this.displayReviewers.bind(this);
    this.toggleSignInModal = this.toggleSignInModal.bind(this);
  }

  componentDidMount() {
    axios.get('/api/users/popular').then(({ data }) => {
      this.setState(prevState => {
        return {
          bestReviewer: prevState.bestReviewer.concat(data)
        };
      });

    }).catch(err => alert(err));
  }

  displayReviewers(reviewers) {
    return reviewers.map((reviewer, i) => {
      const { name, stacks, description, github, profileImage } = reviewer;

      return (
        <div className="reviewerCover" key={i}>
          <img className="profileImg" src={profileImage} alt="" />
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
    fetch('/api/auth/github').then(res => {
      debugger;
    }).catch(err => alert(err));
  }

  handleOnClick() {
    this.props.pageReloader();
  }

  render() {
    const { bestReviewer, displayLoginModal } = this.state;

    return (
      <div className="mainContainer">
        <div className="titleCover" onClick={this.handleOnClick}>
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
            {bestReviewer.length > 0 && this.displayReviewers(bestReviewer)}
          </div>
        </div>
        {displayLoginModal && <SignIn closeModal={this.toggleSignInModal} login={this.githubLogin} />}
      </div>
    );
  }
}

export default Main;

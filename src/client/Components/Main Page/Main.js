import React, { Component } from 'react';
import axios from 'axios';
import './Main.css';
import SignIn from '../Modals/SignIn/SignIn';

class Main extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      bestReviewer: [{
        name: 'Ken',
        profileImage: './public/main.jpg',
        stacks: ['#React', '#Nodejs', '#Javascript', '#Vue', '#Angular', '#Backbone'],
        github: 'http://github.com/ken',
        description: 'Ken is a software engineer, passionate mathematician, and technical instructor currently based in Korea. After years as a software engineer in the United States, he is working at a JS Coding Bootcamp in Korea, React, Node.js, and anything needed to become a web developer. He finds great value sharing knowledge with people, helping them grow, and learning from them.'
      }, {
        name: 'Song',
        profileImage: './public/main.jpg',
        stacks: ['#React', '#Nodejs', '#Javascript'],
        github: 'http://github.com/Song',
        description: 'Tamas is an experienced developer evangelist and technical instructor. He has more than a decade of experience working with large, prestigious organisations and throughout his career, he has delivered training classes all over the world to both technical and non-technical audiences.'
      }, {
        name: 'June',
        profileImage: './public/main.jpg',
        stacks: ['#React', '#Nodejs', '#Redux'],
        github: 'http://github.com/june',
        description: 'Leonardo Losoviz is an independent open source developer, creator of a framework for building modular websites called PoP. The only non-musician in his family, this doesnt bother him, because coding is also making art. He lives in a loop: he dreams of code and, when he wakes up, he codes his dreams.'
      }, {
        name: 'John Snow',
        profileImage: './public/main.jpg',
        stacks: ['#React', '#Nodejs', '#Javascript', '#Vue', '#Angular', '#Backbone'],
        github: 'http://github.com/winteriscoming',
        description: 'Yong Jun produces data stories and interactive graphics for SPH Straits Times as a Senior Web Developer. An early adopter of VueJS, he thinks Vue is the best thing to have come to the Javascript world since ES6. The popular GovTech visualization project SchoolPicker.sg was created by him using VueJS. He enjoys writing code and teaching people the art of code writing.'
      }],
      displayLoginModal:false
    };

    this.githubLogin = this.githubLogin.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
    this.displayReviewers = this.displayReviewers.bind(this);
    this.toggleSignInModal = this.toggleSignInModal.bind(this);
  }

  componentDidMount() {
    //ajax for user data
    // displayReviewers(result);
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
    //ajax for login
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
        {displayLoginModal && <SignIn closeModal={this.toggleSignInModal} login={this.githubSignIn} />}
      </div>
    );
  }
}

export default Main;

import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './Posts.css';
import axios from 'axios';
import Header from '../Header/Header';
import postsData from './posts.json';

class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      displayModal: false
    };

    this.displayPosts = this.displayPosts.bind(this);
  }

  componentDidMount() {
    const { posts, onPostsComponentMount } = this.props;

    if (!posts.length) {
      // onPostsComponentMount();
      this.setState(() => {
        return {
          posts: postsData
        };
      });
    }
  }

  displayPosts() {
    const { posts } = this.state;

    return posts.map((post, i) => { //close filtering
      const { by, created_at, title, description, reviewers, stack, profile_image } = post;
      const convertDateType = new Date(created_at).toString().split(' ');
      const date = `${convertDateType[2]} ${convertDateType[1]} ${convertDateType[3]}`;

      let reviewerState = '';

      if (reviewers.length > 2) {
        reviewerState = `${reviewers[0]} & ${reviewers.length - 1} others reviewing`;
      } else if(reviewers.length === 2) {
        reviewerState = `${reviewers[0]} & ${reviewers[1]} others reviewing`;
      } else {
        reviewerState = `${reviewers[0]} others reviewing`;
      }

      return (
        <div className="publicPostContainer" key={i}>
          <div className="publicPostCover">
            <div className="postBy">
              <div className="authorProfileCover">
                <img className="authorProfileImage" src="./public/main.jpg" alt="" />
              </div>
              <div className="postDateInfo">
                <div className="author">{by}</div>
                <div className="created_at">{date}</div>
              </div>
            </div>
            <div className="postTitle">{title}</div>
            <p className="postDescription">{description}</p>
            <div className="reviewerState">{reviewerState}</div>
          </div>
          <div className="postReviewInfo">
            <div className="stackTags">{stack.join(' ')}</div>
          </div>
          <div className="reviewBtnCover">
            <button className="reviewStartBtn">Review Start</button>
          </div>
        </div>
      );
    });
  }

  render() {
    const { posts } = this.state;

    return (
      <Fragment>
        <Header history={this.props.history} />
        <div className="dump"></div>
        <div className="wrapper">
          <div className="newPostContainer">
            <div className="header">
              <span>Create Review Post</span>
            </div>
            <div className="postInfoContainer">
              <div className="profileCover">
                <img className="profileImage" src="./public/main.jpg" alt="" />
              </div>
              <div className="message">
                <span>What is the matter with your code?</span>
              </div>
            </div>
          </div>
          <div className="postsWrapper">
            {posts.length > 0 && this.displayPosts()}
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapState = state => {
  const posts = state.posts;

  return {
    posts
  };
};

const mapDispatch = dispatch => {
  return {
    onPostsComponentMount() {
      axios.get('/api/posts').then(result => {
        debugger;
        dispatch()
      }).catch(err => alert(err.message));
    }
  }
};

export default connect(mapState, mapDispatch)(Posts);

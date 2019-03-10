import { countReviewers, convertDateType } from '../utils/utils';
import React, { Component, Fragment } from 'react';
import PostsContainer from '../Containers/PostsContainer';
import Spinner from '../Spinner/Spinner';
import Header from '../Header/Header';
import PropTypes from 'prop-types';
import './Posts.css';

class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchOnProgress: false
    };

    this.displayPosts = this.displayPosts.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { fetchOnProgress } = this.state;
    const prevParams = this.props.match.params;
    const nextParams = nextProps.match.params;

    if (!_.isEqual(prevParams, nextParams) && !fetchOnProgress) {
      const { onPostsComponentMount } = this.props;
      const boundFetchFunc = onPostsComponentMount.bind(this);

      return this.setState(prevState => {
        return {          
          fetchOnProgress: !prevState.fetchOnProgress
        };
      }, boundFetchFunc);
    }
  }

  componentDidMount() {
    const { onPostsComponentMount } = this.props;
    const boundFetchFunc = onPostsComponentMount.bind(this);

    this.setState(prevState => {
      return {
        fetchOnProgress: !prevState.fetchOnProgress
      };
    }, boundFetchFunc);
  }

  displayPosts() {
    const { posts } = this.props;

    return posts.map((post, i) => {
      const { postedBy, created_at, title, description, reviewers, stacks } = post;

      const postedDate = convertDateType(created_at);
      const participants = countReviewers(reviewers);

      return (
        <div className="publicPostContainer" key={i}>
          <div className="publicPostCover">
            <div className="postBy">
              <div className="authorProfileCover">
                <img className="authorProfileImage" src={postedBy.profileImage || './public/default_profile.png'} alt="" />
              </div>
              <div className="postDateInfo">
                <div className="author">{postedBy.name}</div>
                <div className="created_at">{postedDate}</div>
              </div>
            </div>
            <div className="postTitle">{title}</div>
            <p className="postDescription">{description}</p>
            <div className="reviewerState">{participants}</div>
          </div>
          <div className="postReviewInfo">
            <div className="stackTags">{stacks.map(({ name })=> name).join(' ')}</div>
          </div>
          <div className="reviewBtnCover">
            <button className="reviewStartBtn">Review Start</button>
          </div>
        </div>
      );
    });
  }

  render() {
    const { posts } = this.props;
    const { fetchOnProgress } = this.state;

    return (
      <Fragment>
        <Header history={this.props.history} />
        <Spinner color="#f5474b" loading={fetchOnProgress} />
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

export default PostsContainer(Posts);

import { immutable, getTagsName, getAuthorInfo, getReviewerInfo } from '../utils/utils';
import { fetchPublicPosts } from '../../action/action';
import React, { Component, Fragment } from 'react';
import Spinner from '../Spinner/Spinner';
import { connect } from 'react-redux';
import Header from '../Header/Header';
import axios from 'axios';
import './Posts.css';

class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchOnProgress: false
    };

    this.displayPosts = this.displayPosts.bind(this);
  }

  componentDidMount() {
    const { posts, onPostsComponentMount } = this.props;
    const boundFetchFunc = onPostsComponentMount.bind(this);

    if (!posts.length) {
      this.setState(prevState => {
        return {
          fetchOnProgress: !prevState.fetchOnProgress
        };
      }, boundFetchFunc);
    }
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

const countReviewers = reviewers => {
  switch (reviewers.length) {
    case 2:
      return `${reviewers[0].name} & ${reviewers[1].name} reviewing`;
    case 1:
      return `${reviewers[0].name} reviewing`;
    default :
      return `${reviewers[0].name} & ${reviewers.length - 1} others reviewing`;
  }
};

const convertDateType = targetDate => {
  const date = new Date(targetDate).toString().split(' ');
  return `${date[2]} ${date[1]} ${date[3]}`;
};

const mapState = state => {
  const { posts, users, stackTags } = state;
  const postsInfo = _.values(immutable(posts));

  if (!_.values(posts).length) {
    return {
      posts: []
    };
  }

  const tagResult = getTagsName(postsInfo, stackTags);
  const authorResult = getAuthorInfo(tagResult, users);
  const reviewerResult = getReviewerInfo(authorResult, users);

  return {
    posts: reviewerResult
  };
};

const mapDispatch = dispatch => {
  return {
    onPostsComponentMount(amount) {
      const limit = amount || 10;
      const that = this;

      axios.get(`/api/posts?limit=${limit}&sort=desc`).then(({ data }) => {
        data.forEach(post => {
          dispatch(fetchPublicPosts(post));
        });

        that.setState(prevState => {
          return {
            fetchOnProgress: !prevState.fetchOnProgress
          };
        });
      }).catch(err => {
        alert(err.message);

        that.setState(prevState => {
          return {
            fetchOnProgress: !prevState.fetchOnProgress
          };
        });
      });
    }
  }
};

export default connect(mapState, mapDispatch)(Posts);

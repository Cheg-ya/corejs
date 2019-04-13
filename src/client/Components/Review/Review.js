import { anOldHope } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import ReviewContainer from '../Containers/ReviewContainer';
import SyntaxHighlighter from 'react-syntax-highlighter';
import React, { Component } from 'react';
import Comment from '../Comment/Comment';
import Header from '../Header/Header';
import './Review.css';

class Review extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fetchOnProgress: false,
      displayModal: false
    };

    this.displayCode = this.displayCode.bind(this);
    this.getLineNumber = this.getLineNumber.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    const isRequestSuccess = this.state.fetchOnProgress && !nextState.fetchOnProgress;

    if (!this.state.fetchOnProgress) {
      return true;
    }

    return isRequestSuccess;
  }

  componentDidMount() {
    const { onReviewDidMount, post } = this.props;
    const boundFetchFunc = onReviewDidMount.bind(this);

    if (!post.length) {
      this.setState(prevState => {
        return {
          fetchOnProgress: !prevState.fetchOnProgress
        };
      }, boundFetchFunc);
    }
  }

  getLineNumber(lineNum) {
    const that = this;

    return {
      onClick() {
        that.setState(prevState => {
          return {
            displayModal: !prevState.displayModal
          };
        });
      },
      onMouseEnter(e) {
        e.currentTarget.style.border = '1px solid gray';
        e.currentTarget.style.padding = '1px';
        e.currentTarget.style.borderRadius = '4px';
      },
      onMouseLeave(e) {
        e.currentTarget.style.border = '';
        e.currentTarget.style.padding = '';
        e.currentTarget.style.borderRadius = '';
      }
    };
  }

  displayCode() {
    const { code } = this.props.post[0];

    return code.map((target, i) => {
      return (
        <div className="codeBoxWrapper" key={i}>
          <div className="codeHeader">
            {target.title}
          </div>
            <SyntaxHighlighter
              style={anOldHope}
              showLineNumbers={true}
              wrapLines={true}
              lineProps={this.getLineNumber}
            >
              {target.code}
            </SyntaxHighlighter>
        </div>
      );
    });
  }

  render() {
    const targetPost = this.props.post[0];
    const { userInfo } = this.props;
    const { displayModal } = this.state;

    return (
      <div className="reviewWrapper">
        <Header history={this.props.history} />
        <div className="space"></div>
        {displayModal && <Comment user={userInfo} />}
        {targetPost && this.displayCode()}
      </div>
    );
  }
}

export default ReviewContainer(Review);

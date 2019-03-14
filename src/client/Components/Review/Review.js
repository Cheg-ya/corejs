import { anOldHope } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import ReviewContainer from '../Containers/ReviewContainer';
import SyntaxHighlighter from 'react-syntax-highlighter';
import React, { Component } from 'react';
import Header from '../Header/Header';
import './Review.css';

class Review extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fetchOnProgress: false,
      displayModal: false,
      hover: false
    };

    this.displayCode = this.displayCode.bind(this);
  }

  componentDidMount() {
    const { onReviewDidMount, post } = this.props;
    const boundFetchFunc = onReviewDidMount.bind(this);

    if (!post.length) {
      this.setState(prevState => {
        return {
          fetchOnProgress: !prevState.fetchOnProgress,
          displayModal: !prevState.displayModal
        };
      }, boundFetchFunc);
    }
  }

  getLineNumber(lineNum) {
    return {
      onClick() { // display review modal when clicking
        alert(lineNum)
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

  handler(num) {
    debugger;
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
    console.log(this.props.post);

    return (
      <div className="reviewWrapper">
        <Header history={this.props.history} />
        <div className="space"></div>
        {this.props.post[0] && this.displayCode()}
      </div>
    );
  }
}

export default ReviewContainer(Review);

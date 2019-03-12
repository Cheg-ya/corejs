import MonacoEditor from 'react-monaco-editor';
import { immutable } from '../utils/utils';
import React, { Component } from 'react';
import stack_image from '../../../../public/stack_image.png';
import _ from 'lodash';
import './NewPost.css';

class NewPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nextOptionShown: false,
      lastOptionShown: false,
      isPublic: true,
      editorIds: [Math.random()],
      title: '',
      description: '',
      stacks: [],
      code: {}
    };

    this.addEditor = this.addEditor.bind(this);
    this.removeEditor = this.removeEditor.bind(this);
    this.createEditor = this.createEditor.bind(this);
    this.addStackList = this.addStackList.bind(this);
    this.createHashTag = this.createHashTag.bind(this);
    this.showNextOption = this.showNextOption.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.removeTargetStack = this.removeTargetStack.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleEditorChange = this.handleEditorChange.bind(this);
    this.handleCheckBoxChange = this.handleCheckBoxChange.bind(this);
    this.handleCodeTitleChange = this.handleCodeTitleChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
  }

  handleCodeTitleChange(e) {
    const { code } = this.state;
    const title = e.target.value;
    const editorId = e.target.dataset.key;
    const targetCodeInfo = code[editorId];
    const newCodeInfo = {
      [editorId]: {
        id: editorId,
        code: targetCodeInfo ? targetCodeInfo.code : undefined,
        title
      }
    };

    this.setState(prevState => {
      return {
        code: _.assign(prevState.code, newCodeInfo)
      };
    });
  }

  handleEditorChange(id) {
    return codeInput => {
      const { code } = this.state;
      const editorId = id;
      const targetCodeInfo = code[editorId];
      const codeInfo = {
        [editorId]: {
          id: editorId,
          code: codeInput,
          title: targetCodeInfo ? targetCodeInfo.title : undefined
        }
      };

      this.setState(prevState => {
        return {
          code: _.assign(prevState.code, codeInfo)
        };
      });
    };
  }

  addEditor() {
    this.setState(prevState => {
      return {
        editorIds: prevState.editorIds.concat(Math.random())
      };
    });
  }

  removeEditor(e) {
    const targetKey = parseFloat(e.currentTarget.dataset.key);

    this.setState(prevState => {
      const codeInfo = immutable(prevState.code);
      delete codeInfo[targetKey];

      const restIds = prevState.editorIds.filter(key => key !== targetKey);
      const defaultEditor = [Math.random()];

      return {
        editorIds: restIds.length ? restIds : defaultEditor,
        code: codeInfo
      };
    });
  }

  createEditor() {
    const { editorIds, code } = this.state;

    return editorIds.map(id => (
      <div className="editorList" key={id}>
        <div className="editorHeader">
          <input
            data-key={id}
            type="text"
            className="codeTitle"
            placeholder="Type file name"
            onChange={this.handleCodeTitleChange}
            value={code[id] ? code[id].title : ''}
          />
          <button className="removeEditorBtn" data-key={id} type="button" onClick={this.removeEditor}>
            <i className="removeBtnIcon fas fa-times-circle"></i>
          </button>
          <button className="addEditorBtn" type="button" onClick={this.addEditor}>
            <i className="addBtnIcon fas fa-plus-circle"></i>
          </button>
        </div>
        <MonacoEditor
          width="950"
          height="280"
          theme="vs-dark"
          value={code[id] ? code[id].code : "//Type your code"}
          onChange={this.handleEditorChange(id)}
        />
      </div>
    ));
  }

  firstPage() {
    const { userImage } = this.props;
    const { title, description, isPublic } = this.state;

    return (
      <form className="firstFormContainer" onSubmit={this.handleOnSubmit}>
        <div className="firstPage">
          <div className="formHeader">
            <span>Create Review Post</span>
          </div>
          <div className="profileWrapper">
            <div className="profileCover">
              <img className="profileImage" src={userImage} alt="" />
            </div>
            <div className="titleInputCover">
              <input 
                className="titleInput"
                type="text"
                placeholder="Type your post title"
                value={title}
                onChange={this.handleTitleChange}
              />
            </div>
          </div>
          <div className="postContents">
            <div>Description</div>
            <div className="descriptionCover">
              <textarea
                className="descriptionInput"
                onChange={this.handleDescriptionChange}
                value={description}
              />
            </div>
            <div className="publicStateCover">
              <label>
                <input className="publicStateInput" type="checkbox" checked={isPublic} onChange={this.handleCheckBoxChange}/>
                <span>Public</span>
              </label>
            </div>
            <div className="stackContainer">
              <div className="stackCover">
                <div className="stackInputField">
                  <div className="stackImageCover">
                    <img className="stackImage" src={stack_image} alt="" />
                  </div>
                  <div className="stackInputCover">
                    <input className="stackInput" type="text" onKeyPress={this.addStackList} placeholder="Type stack info" />
                  </div>
                </div>
              </div>
              <div className="stackList">
                {this.createHashTag()}
              </div>
            </div>
          </div>
          <div className="nextBtnCover">
            <button className="nextBtn" type="button" onClick={this.showNextOption}>Next</button>
          </div>
        </div>
      </form>
    );
  }

  secondPage() {
    return (
      <form className="secondFormContainer" onSubmit={this.handleOnSubmit}>
        <div className="secondPage">
          <div className="formHeader">
            <span>Create Review Post</span>
          </div>
          <div className="codeWrapper">
            <div className="codeEditorContainer">
              <div className="editorCover">
                {this.createEditor()}
              </div>
            </div>
          </div>
          <div className="btnCover">
            <button className="prevBtn" type="button" onClick={this.showNextOption}>Previous</button>
            <button className="submitBtn" type="submit">Submit</button >
          </div>
        </div>
      </form>
    );
  }

  removeTargetStack(e) {
    const stackName = e.target.textContent.slice(1);

    this.setState(prevState => {
      return {
        stacks: prevState.stacks.filter(stack => stack !== stackName.toLowerCase())
      };
    });
  }

  createHashTag() {
    const { stacks } = this.state;

    return stacks.map((stack, i) =>{
      const stackName = `#${stack[0].toUpperCase() + stack.slice(1)}`;
      return (
        <button
          key={i}
          className="stackBtn"
          type="button"
          onClick={this.removeTargetStack}
          title="Click to remove"
        >
          {stackName}
        </button>
      );
    });
  }

  addStackList(e) {
    const key = e.which || e.keyCode;

    if (key === 13) {
      const newStack = e.target.value;
      e.target.value = '';

      this.setState(prevState => {
        return {
          stacks: prevState.stacks.concat(newStack)
        };
      });
    }
  }

  handleCheckBoxChange() {
    this.setState(prevState => {
      return {
        isPublic: !prevState.isPublic
      };
    });
  }

  handleTitleChange(e) {
    const title = e.target.value;
  
    this.setState(() => {
      return {
        title
      };
    });
  }

  handleDescriptionChange(e) {
    const description = e.target.value;

    this.setState(() => {
      return {
        description
      };
    });
  }

  handleOnSubmit(e) {
    e.preventDefault();
    
    const { title, description, stacks, code, isPublic } = this.state;
    const headerData = {
      title,
      description,
      stacks,
      code,
      isPublic
    };

    this.props.onSubmit(headerData);
  }

  showNextOption() {
    this.setState(prevState => {
      return {
        nextOptionShown: !prevState.nextOptionShown
      };
    });
  }

  render() {
    const { nextOptionShown } = this.state;
    console.log('render\n', 'code: ',this.state.code);
    return (
      <div className="formWrapper">
        {!nextOptionShown ? this.firstPage() : this.secondPage()}
      </div>
    );
  }
}

export default NewPost;

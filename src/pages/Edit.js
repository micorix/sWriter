import React, { Component } from 'react'
import styled from '@emotion/styled'
import { Editor, EditorState, convertFromRaw, convertToRaw } from 'draft-js'

import PageLayout from '../components/layouts/PageLayout'

import handleHeadlines from '../utils/editor/handleHeadlines'
import handleInlines from '../utils/editor/handleInlines'
import { setCurrentDocument, changeDocumentContent, onDocumentRemove, renameDocument, onCurrentDocumentChange, unselectCurrentDocument, getCurrentDocument } from '../utils/db/wrappers/document'

const EditorWrapper = styled.div``

const DocName = styled.div`
&:hover button{
    display: block;
}
button{
    cursor:pointer;
    display: none;
    position: absolute;
    top:calc(50% - 8px);
    left:100%;
    border-radius:3px;
    font-size:1em;
    padding:5px;
    border:none;
    outline:none;
    margin-left:2em;
    transform: translate(0, -50%);
}
.wrapper{
    border-bottom: 2px solid black;
    display: inline-block;
    position: relative;
    h1{
    outline:0;
    display: inline-block;
    padding-bottom:.5em;
    
    margin: 0 0 16px 0;
    padding:2px;
    border: 1px solid transparent;
    &[contenteditable]:focus{
        border-color: #aaa;
    }
    }
    
    
}
`
export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
        document: {},
        editorState: EditorState.createEmpty(),
        editName: false
    }
    this.docNameHeadline = React.createRef()
    // this.getContents()
    onDocumentRemove(doc => {
        if(doc.id === this.state.document.id){
            unselectCurrentDocument()
            this.getWelcomePage()
        }
    })
    onCurrentDocumentChange(this.setupDocument)
  }
  componentDidMount = () => {
    getCurrentDocument().then(doc =>{
        if(doc){
            this.setupDocument(doc)
        }else{
            this.getWelcomePage()
        }
    })
  }
  componentWillUnmount = () => {
      unselectCurrentDocument()
  }  
  setupDocument = (doc) => {
    this.setState({
        document: doc,
        editorState: doc && doc.contents && Object.keys(doc.contents).length > 0 ? EditorState.createWithContent(convertFromRaw(doc.contents)) : EditorState.createEmpty()
    })
  }
  setNameEditable = () => {
      this.setState({
          editName: true
      }, () => {
        if(this.docNameHeadline.current){
            let range = document.createRange();//Create a range (a range is a like the selection but invisible)
            range.selectNodeContents(this.docNameHeadline.current);//Select the entire contents of the element with the range
            range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
            let selection = window.getSelection();//get the selection object (allows you to change selection)
            selection.removeAllRanges();//remove any selections already made
            selection.addRange(range)
            document.execCommand('selectAll',false,null)
            const onKeyDown = e => {
                if(e.key === 'Enter'){
                    e.preventDefault()
                    this.docNameHeadline.current.removeEventListener('keydown', onKeyDown)
                    renameDocument(this.state.document.id, this.docNameHeadline.current.innerText)
                    this.setState({
                        editName: false
                    })
                }
            }
            this.docNameHeadline.current.addEventListener('keydown', onKeyDown)
        }
      })
  }
  getWelcomePage = () => {
    setCurrentDocument('__special-welcome__').then(doc => {
        console.log(doc)
       this.setState({
           document: doc,
           editorState:  EditorState.createWithContent(convertFromRaw(doc.contents))
       })
     })
  }
  handleChange = (editorState) => {
     
   
        let selectionState = editorState.getSelection();
        let anchorKey = selectionState.getAnchorKey();
        let currentContent = editorState.getCurrentContent();
        let currentContentBlock = currentContent.getBlockForKey(anchorKey);
        let state = handleHeadlines(editorState, currentContentBlock)
        state = handleInlines(state ? state : editorState, currentContentBlock)
        console.log(currentContent.getPlainText())
        if(state){
            this.saveDocument(state).then(() => {
                let sel = this.state.editorState.getSelection()
                sel.merge({
                    anchorOffset: sel.getFocusKey(),
                    focusOffset: sel.getFocusKey()
                })
                this.saveDocument(EditorState.acceptSelection(this.state.editorState, sel))
            })
 
  }
}
    saveDocument = (editorState) => new Promise(resolve => {
        console.log(JSON.stringify(convertToRaw(editorState.getCurrentContent())))
        this.setState({
            editorState
        }, () => {
            resolve(changeDocumentContent(this.state.document.id, convertToRaw(editorState.getCurrentContent())))
        })
    })
  render() {
      let doc = this.state.document
    return (
      
            <PageLayout>
       <DocName>
           <div className="wrapper">
    <h1 contentEditable={this.state.editName} ref={this.docNameHeadline}>{doc && doc.name}</h1>
    { (!this.state.editName && !(doc && doc.specialPage)) && <button onClick={this.setNameEditable}>Rename</button>}
    </div>
       </DocName>
       <EditorWrapper>
        <Editor editorState={this.state.editorState} onChange={this.handleChange} readOnly={doc && doc.specialPage}/>
        </EditorWrapper>
        </PageLayout>
       
    );
  }
}
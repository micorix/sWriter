import React, { Component } from 'react'
import { Editor, EditorState, RichUtils } from 'draft-js'
import styled from '@emotion/styled'
import handleHeadlines from '../utils/handleHeadlines'
import handleInlines from '../utils/handleInlines'
import Layout from '../components/Layout'
import { UpdaterContext } from '../updater';
import PageLayout from '../components/PageLayout';
const EditorWrapper = styled.div`
    width:50%;
    margin:auto;
    padding-top:3em;
    height:100%;
    font-family: 'Work Sans';
    background: ${props => props.bg};
    color: ${props => props.fg};
`
const ColorsWrapper = styled.div`
    background: ${props => props.bg};
    color: ${props => props.fg};
    width:100%;
    height:100%;
`
export default class extends Component {
    static contextType = UpdaterContext
  constructor(props) {
    super(props);
    this.state = {
        editorState: EditorState.createEmpty(),
        editorBackground: '#fff',
        editorForeground: '#000'
    }
  }
  componentDidMount = () => {
      this.context.subscribe(change => {
          if(change === 'theme'){
              let theme = JSON.parse(localStorage.theme).colors
              this.setState({
                  editorBackground: theme['editor.background'],
                  editorForeground: theme['editor.foreground']
              })
          }
      })
  }
  handleChange = (editorState) => {
      console.log(editorState)
   
        let selectionState = editorState.getSelection();
        let anchorKey = selectionState.getAnchorKey();
        let currentContent = editorState.getCurrentContent();
        let currentContentBlock = currentContent.getBlockForKey(anchorKey);
        let state = handleHeadlines(editorState, currentContentBlock)
        state = handleInlines(state ? state : editorState, currentContentBlock)
        if(state){
            this.setState({
                editorState: state
            }, () => {
                let sel = this.state.editorState.getSelection()
                sel.merge({
                    anchorOffset: sel.getFocusKey(),
                    focusOffset: sel.getFocusKey()
                })
                this.setState({
                    editorState: EditorState.acceptSelection(this.state.editorState, sel)
                })
            })
 
  }
}
  render() {
    return (
      
            <PageLayout>
       
        <Editor editorState={this.state.editorState} onChange={this.handleChange}/>
      
        </PageLayout>
       
    );
  }
}
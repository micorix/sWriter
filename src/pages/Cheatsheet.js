import React, { Component } from 'react'
import styled from '@emotion/styled'
import PageLayout from '../components/PageLayout';
import ReactMarkdown from 'react-markdown'
import Lowlight from 'react-lowlight'

// Load any languages you want to use
// (see https://github.com/isagalaev/highlight.js/tree/master/src/languages)
import js from 'highlight.js/lib/languages/javascript'
import markdown from 'highlight.js/lib/languages/markdown'
import python from 'highlight.js/lib/languages/python'
import 'highlight.js/styles/github.css'
// Then register them with lowlight
Lowlight.registerLanguage('javascript', js)
Lowlight.registerLanguage('markdown', markdown)
Lowlight.registerLanguage('python', python)
// Lowlight.registerLanguage('no-highlight', {})
const CheatsheetWrapper = styled.div`
    width:100%;
    img{
        max-width:100%;
    }
`
const Header = styled.header`
    border-bottom:3px solid black;
    padding-bottom:2em;
    span{
        display: block;
    }
`
const Code = props => {
    console.log(props)
    return (<Lowlight
    language={props.language && props.language !== 'no-highlight' ? props.language : "markdown"}
    value={props.value}
  />)
}
export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
         cheatsheet: '# Loading...',
    }
    this.fetchCheatsheet()
  }
  fetchCheatsheet = () => {
    fetch('https://raw.githubusercontent.com/wiki/adam-p/markdown-here/Markdown-Cheatsheet.md')
    .then(res => res.text()).then(cheatsheet => {
        this.setState({
            cheatsheet
        })
    })
  }
  
  render() {
    return (
      
            <PageLayout>
                <Header>
                    <h1>Markdown Here Cheatsheet</h1>
                    <h2>by Adam Pritchard</h2>
                    <span>License: <a href="https://creativecommons.org/licenses/by/3.0/">CC-BY</a></span>
                    <span><a href="https://github.com/adam-p/markdown-here/wiki/Markdown-Here-Cheatsheet">github.com/adam-p/markdown-here/wiki/Markdown-Here-Cheatsheet</a></span>

                </Header>
        
        <CheatsheetWrapper>
        <ReactMarkdown source={this.state.cheatsheet} escapepython={false} renderers={{
            code: Code
        }}/>
        </CheatsheetWrapper>
        </PageLayout>
       
    );
  }
}
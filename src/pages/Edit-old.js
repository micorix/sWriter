import React, { Component } from 'react'
import styled from '@emotion/styled'
if (!String.prototype.splice) {
    /**
     * {JSDoc}
     *
     * The splice() method changes the content of a string by removing a range of
     * characters and/or adding new characters.
     *
     * @this {String}
     * @param {number} start Index at which to start changing the string.
     * @param {number} delCount An integer indicating the number of old chars to remove.
     * @param {string} newSubStr The String that is spliced in.
     * @return {string} A new string with the spliced substring.
     */
    String.prototype.splice = function(start, delCount, newSubStr) {
        return this.slice(0, start) + newSubStr + this.slice(start + Math.abs(delCount));
    };
}

const Editor = styled.div`
    width:50%;
    margin:auto;
    outline:none;
    padding:3em 1em;
    height: 100%;
    font-family: 'Work Sans';
`
const changeTag = (element, tagname) => {
    let nextElement = document.createElement(tagname)
    nextElement.innerText = element.innerText
    element.replaceWith(nextElement)
    return nextElement
}
const moveCaret = (element, offset) => {
    let range = document.createRange()
    let sel = window.getSelection()
    range.setStart(element.childNodes[0], offset+1)
    range.collapse(true)
    sel.removeAllRanges()
    sel.addRange(range)
}
const findOccurencies = (html) => {

let regex = /\*\*.+\*\*/
return regex.exec(html)
}
const lineTagIndicators = {
    '#': 'h1',
    '##': 'h2',
    '###': 'h3',
    '####': 'h4',
    '#####': 'h5',
    '######': 'h6'
}
const styleIndicators = [
    {
        regex: /\*\*[^\*\*\*\*]*\*\*/g,
        tag: 'b'
    },
    {
        regex: /\*[^\*\*\*]*\*/g,
        tag: 'i'
    }
]
const baseTag = 'div'
export default class extends Component{
    constructor(props){
        super(props)
        this.editor = React.createRef()
    }
    componentDidMount = () => {
        this.observer = new MutationObserver(this.handleEditorChange);
        this.observer.observe(this.editor.current, {
            attributes: true,
            childList: true,
            subtree: true
        })
    }
    handleEditorChange = (mutationsList, observer) => {
        console.log(mutationsList)
        for(var mutation of mutationsList) {
            if (mutation.type == 'childList') {
                console.log('A child node has been added or removed.');
            }
            else if (mutation.type == 'attributes') {
                console.log('The ' + mutation.attributeName + ' attribute was modified.');
            }
        }
    }
    handleInput = (e) => {
        e.persist()
        console.log(e, window.getSelection())
        let s = window.getSelection()
        let currentLine = s.anchorNode.parentElement
        let lineText = currentLine.innerText.trimStart()
        let lineIndicator = Object.keys(lineTagIndicators).find(key => lineText.startsWith(`${key} `))
        if(lineIndicator){
            let tag = lineTagIndicators[lineIndicator]
            if(currentLine.tagName !== tag.toUpperCase()){
                let n = changeTag(currentLine, tag)
                moveCaret(n, s.baseOffset)
            }
        }else{
            if(currentLine.tagName !== baseTag.toUpperCase()){
                let n = changeTag(currentLine, baseTag)
                moveCaret(n, s.baseOffset)
            }
        }
        let regex = /\*\*[^\*\*\*\*]*\*\*/g
    
        let html = currentLine.innerHTML
        // currentLine
        styleIndicators.forEach(({ regex, tag }) => {
            let match
            while (match = regex.exec(html))
                currentLine.innerHTML = currentLine.innerHTML.splice(match.index, match[0].length, `<${tag}>${match[0]}</${tag}>`)
        })
    }
    render = () => {
        return <Editor ref={this.editor} contentEditable={true} onInput={this.handleInput}/>
    }
}
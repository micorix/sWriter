import React, {Component} from 'react'
import styled from '@emotion/styled'

import MenuWrapper from './MenuWrapper'
import { onCurrentDocumentChange, getCurrentDocument } from '../../utils/db/wrappers/document';
import { saveAsMarkdown, saveAsPDF } from '../../utils/save';

// import { setConfig, getAppearanceConfigObj } from '../../utils/db/wrappers/appearanceSettings'

const Section = styled.section`
    width:calc(100% - 2em);
    margin: 1em;
    box-sizing:border-box;
    
`
const FullButton = styled.button`
    display: flex;
    align-items:center;
    text-align:center;
    justify-content: center;
    width:100%;
    padding:10px;
    margin: .5em 0;
    background: ${props => props.theme.colors['button.background']};
    border: none;

`
export default class extends Component{

    constructor(props){
        super(props)
        this.state = {
            doc: {}
        }
    onCurrentDocumentChange(doc => this.setState({
        doc
    }))
    getCurrentDocument().then(doc => this.setState({
        doc
    }))
    }
    saveAsMarkdown = () => {
        saveAsMarkdown(this.state.doc)
    }
    saveAsPDF = () => {
        saveAsPDF(this.state.doc)
    }
    render = () => {
        let { doc } = this.state
        if(!doc)
            return (
                <MenuWrapper title="File" active={this.props.active}>
            <h2>Select document to see options</h2>
            </MenuWrapper>
            )
        return (
            <MenuWrapper title="File" active={this.props.active}>
            
                <Section>
                <h2>{doc && doc.name}</h2>
                    <h4>Save file</h4>
                    <FullButton onClick={this.saveAsMarkdown}>Save as markdown</FullButton>
                    <FullButton onClick={this.saveAsPDF}>Save as PDF</FullButton>
                    <h4>Print file</h4>
                    <FullButton onClick={window.print}>Print</FullButton>

                </Section>
            </MenuWrapper>
        )
    }
}
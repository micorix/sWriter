import React, {Component} from 'react'
import MenuWrapper from './MenuWrapper';
import styled from '@emotion/styled'
import MaterialIcon from 'material-icons-react'
import { Link } from 'react-router-dom'
import { getThemes } from '../utils/themes'
import { UpdaterContext } from '../updater';
import { getInstalledThemes, useTheme, removeTheme, onInstalledThemesChange } from '../utils/theme';

const Section = styled.section`
    width:calc(100% - 2em);
    margin: 1em;
    box-sizing:border-box;
    font-size:1.1em;
    label{
        display: block;
        margin-bottom:5px;
    }
    input{
        font-size:1.1em;
        width:100%;
        display: block;
        padding: 5px;
        margin:0;
        box-sizing:border-box;
        outline:none;
        background: none;
        border: 1px solid #aaa;
    }
`
export default class extends Component{

    constructor(props){
        super(props)
        this.state = {
            themes: [],
            query: ''
        }
      
        
    }
    
    render = () => {
        return (
            <MenuWrapper title="Settings" active={this.props.active}>
            <Section>
                <label>Primary font</label>
                <input type="input" />
            </Section>
            <Section>
                <label>Secondary font</label>
                <input type="input" />
            </Section>
            <Section>
                <label>Code font</label>
                <input type="input" />
            </Section>
            <Section>
                <label>Text font size</label>
                <input type="input" />
            </Section>
            </MenuWrapper>
        )
    }
}
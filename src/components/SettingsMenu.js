import React, {Component} from 'react'
import MenuWrapper from './MenuWrapper';
import styled from '@emotion/styled'
import MaterialIcon from 'material-icons-react'
import { Link } from 'react-router-dom'
import { getThemes } from '../utils/themes'
import { UpdaterContext } from '../updater';
import { getInstalledThemes, useTheme, removeTheme, onInstalledThemesChange } from '../utils/theme';
import { setConfig, onAppearanceSettingsChange, getConfigObject, getAppearanceConfigObj } from '../utils/appearanceSettings';

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
            primaryFont: '',
                secondaryFont: '',
                codeFont: ''
        }
      
        // onAppearanceSettingsChange(appearance => {
        //     this.setState({
        //       appearance
        //     })
        //   })
          getAppearanceConfigObj().then(appearance => {
            this.setState({
                ...appearance
              })
          })
    }
    
    handlePrimaryFontChange = (e) => {
        let val = e.target.value
        this.setState({
            primaryFont: val
        }, () => setConfig('primaryFont', val))
        
    }
    handleSecondaryFontChange = (e) => {
        let val = e.target.value
        this.setState({
            secondaryFont: val
        }, () => setConfig('secondaryFont', val))
    }
    handleCodeFontChange = (e) => {
        let val = e.target.value
        this.setState({
            codeFont: val
        }, () => setConfig('codeFont', val))
    }
    render = () => {
        return (
            <MenuWrapper title="Settings" active={this.props.active}>
            <Section>
                <label>Primary font</label>
                <input type="input" onChange={this.handlePrimaryFontChange} value={this.state.primaryFont} />
            </Section>
            <Section>
                <label>Secondary font</label>
                <input type="input" onChange={this.handleSecondaryFontChange} value={this.state.secondaryFont}/>
            </Section>
            <Section>
                <label>Code font</label>
                <input type="input" onChange={this.handleCodeFontChange} value={this.state.codeFont}/>
            </Section>
            <Section>
                <label>Text font size</label>
                <input type="input" />
            </Section>
            </MenuWrapper>
        )
    }
}
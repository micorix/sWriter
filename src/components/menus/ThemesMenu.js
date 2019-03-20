import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import styled from '@emotion/styled'

import MenuWrapper from './MenuWrapper'

import { getInstalledThemes, useTheme, removeTheme, onInstalledThemesChange } from '../../utils/db/wrappers/theme'

const Results = styled.div`
    height: 100%;
    overflow-y:auto;
    position: absolute;
    margin-top:1em;
    left: 0;
    width: 100%;
    height: calc(100% - 1em);
`
const ThemeEntry = styled(Link)`
    all:unset;
    display: block;
    cursor:pointer;
    padding: 10px 1em;
  
    font-family: 'Poppins';
    position: relative;
    .header{
        display: flex;
        align-items:flex-end;
        h4, h5{
            margin:0;
        }
        h5{
            margin-left: 1em;
        }
    }
    .desc{
        display: block;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        width:100%;
    }
    .author{
        text-weight:bold;
        font-size:0.9em;
    }
    .actions{
        position: absolute;
        right:10px;
        bottom:10px;
        .use, .remove{
        margin: 0 5px;
        padding:2px;
        border: none;
        outline:none;
        cursor:pointer;
        }
        .use{
            background: green;
            color:white;
        }
        .remove{
            background: transparent;
            color:red;
        }
    }
`
const StyledMenuWrapper = styled(MenuWrapper)`
    position: relative;
`
export default class extends Component{
    constructor(props){
        super(props)
        this.state = {
            themes: [],
            query: ''
        }
        this.getThemes()
        onInstalledThemesChange(themes => {
            themes.toArray().then(themes => {
                console.log(themes)
                this.setState({
                    themes
                })
            })
        })
    }
    getThemes = () => {
        getInstalledThemes().toArray().then(themes => {
            console.log(themes)
            this.setState({
                themes
            })
        })
    }
    handleSubmit = (e) => {
        e.preventDefault()
        this.getThemes()
    }
    handleChange = (e) => {
        this.setState({
            query: e.target.value
        })
    }
    useTheme = (e, themeId) => {
        e.stopPropagation()
        e.preventDefault()
        useTheme(themeId).then(() => {
            console.log('ok')
        })
    }
    removeTheme = (e, themeId) => {
        e.stopPropagation()
        e.preventDefault()
        removeTheme(themeId)
    }
    render = () => {
        return (
            <StyledMenuWrapper title="My themes" active={this.props.active}>
          
                <Results>
                    <div>
                    {
                        this.state.themes.map(theme => (
                            <ThemeEntry to={{
                                pathname: '/theme',
                                state: {ext:  theme.extension}
                            }}>
                                <div className="header">
                               
                                <h4>{theme.label}</h4>
                                
                                
                                <h5>{theme.extension.displayName}&nbsp;&nbsp;&nbsp; {theme.extension.versions[0].version}</h5>
                                </div>
                                <span className="desc">{theme.extension.shortDescription}</span>
                                <span className="author">{theme.extension.publisher.displayName}</span>
                                <div className="actions">
                                <button className="remove" onClick={e => this.removeTheme(e, theme.id)}>Remove theme</button>
                                <button className="use" onClick={e => this.useTheme(e, theme.id)}>Use theme</button>
                                </div>
                            </ThemeEntry>
                        ))
                    }
                    </div>
                </Results>
            </StyledMenuWrapper>
        )
    }
}
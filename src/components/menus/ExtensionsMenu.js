import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from '@emotion/styled'

import MenuWrapper from './MenuWrapper'

import { fetchThemes } from '../../utils/fetchThemes'

const SearchInput = styled.input`
    border: 1px solid #aaa;
    background: transparent;
    padding:5px;
    width:75%;
    margin: auto;
    display: block;
    font-size:1.2em;
    outline: none;
`
const Results = styled.div`
    height: 100%;
    overflow-y:scroll;
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
    color: #d7dae0;
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
    .install{
        position: absolute;
        right:10px;
        bottom:10px;
        background: green;
        color:white;
        padding:2px;
        border: none;
        outline:none;
        cursor:pointer;
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
        this.fetchThemes()
    }
    fetchThemes = () => {
        fetchThemes(this.state.query.trim()).then(themes => this.setState({themes}))
    }
    handleSubmit = (e) => {
        e.preventDefault()
        this.fetchThemes()
    }
    handleChange = (e) => {
        this.setState({
            query: e.target.value
        })
    }
    render = () => {
        return (
            <StyledMenuWrapper title="Install themes" active={this.props.active}>
            <form onSubmit={this.handleSubmit}>
                <SearchInput placeholder="Search for VSCode themes" onChange={this.handleChange}/>
            </form>
                <Results>
                    <div>
                    {
                        this.state.themes.map(ext => (
                            <ThemeEntry to={{
                                pathname: '/theme',
                                state: {ext}
                            }}>
                                <div className="header">
                                <h4>{ext.displayName}</h4>
                                <h5>{ext.versions[0].version}</h5>
                                </div>
                                <span className="desc">{ext.shortDescription}</span>
                                <span className="author">{ext.publisher.displayName}</span>
                               
                            </ThemeEntry>
                        ))
                    }
                    </div>
                </Results>
            </StyledMenuWrapper>
        )
    }
}
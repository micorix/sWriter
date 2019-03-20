import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from '@emotion/styled'
import MaterialIcon from 'material-icons-react'

import FileMenu from '../menus/FileMenu'
import ExplorerMenu from '../menus/ExplorerMenu'
import ExtensionsMenu from '../menus/ExtensionsMenu'
import ThemesMenu from '../menus/ThemesMenu'
import SettingsMenu from '../menus/SettingsMenu'

const SiteWrapper = styled.div`
    width:100%;
    height:100%;
`
const MenuWrapper = styled.div`
    position: fixed;
    top:0;
    left: 0;
    display: flex;
    height:100%;
    @media print{
        display: none;
    }
`
const ActivityBar = styled.aside`
    width:5vw;
    height:100%;
    background:${props => props.theme.colors['activityBar.background']};
`
const MenuItem = styled.button`
    all:unset;
    display: block;
    width:100%;
    background: transparent;
    outline:0;
    border:none;
    display: flex;
    align-items:center;
    justify-content: center;
    padding: 1.5em 0;
    cursor:pointer;
    i{
        font-size:2.2em !important;
        color: ${props => props.active ?  props.theme.colors['activityBar.foreground'] : props.theme.colors['activityBar.inactiveForeground']} !important;
    }
    &:hover i{
        color:#d7dae0 !important;
    }
   
`
const MenuItemLink = MenuItem.withComponent(Link)


const SideMenu = styled.div`
    background: ${({theme}) => theme.colors['sideBar.background']};
    color: ${({theme}) => theme.colors['sideBar.foreground']};
    height:100%;
    width:20vw;
    display: ${props => props.active ? 'block' : 'none'};
    position: relative;
`

const RouteWrapper = styled.div`
    width:${props => props.activeTab ? '75vw' : '95vw'};
    float:right;
    height:100%;
    @media print{
        width:100%;
    }
`

export default class extends Component{
    constructor(props){
        super(props)
        this.state = {
            activeTab: null
        }
    }
    setActiveTab = (tab) => {
        this.setState({
            activeTab: this.state.activeTab === tab ? null : tab
        })
    }
    render = () => {
        return (
            <SiteWrapper>
                <MenuWrapper>
                <ActivityBar>
                    <MenuItem onClick={() => this.setActiveTab('file')} active={this.state.activeTab === 'file'}>
                        <MaterialIcon icon="insert_drive_file" />
                    </MenuItem>
                    <MenuItem onClick={() => this.setActiveTab('explorer')} active={this.state.activeTab === 'explorer'}>
                        <MaterialIcon icon="explore" />
                    </MenuItem>
                    <MenuItem onClick={() => this.setActiveTab('themes')} active={this.state.activeTab === 'themes'}>
                        <MaterialIcon icon="color_lens" />
                    </MenuItem>
                    <MenuItem onClick={() => this.setActiveTab('extensions')} active={this.state.activeTab === 'extensions'}>
                        <MaterialIcon icon="extension" />
                    </MenuItem>
                    <MenuItem onClick={() => this.setActiveTab('settings')} active={this.state.activeTab === 'settings'}>
                        <MaterialIcon icon="settings" />
                    </MenuItem>
                    <MenuItemLink to="/cheatsheet">
                        <MaterialIcon icon="help" />
                    </MenuItemLink>
                </ActivityBar>

                <SideMenu active={Boolean(this.state.activeTab)}>
                    <FileMenu active={this.state.activeTab === 'file'} />
                    <ExplorerMenu active={this.state.activeTab === 'explorer'} />
                    <ThemesMenu active={this.state.activeTab === 'themes'} />
                    <ExtensionsMenu active={this.state.activeTab === 'extensions'} />
                    <SettingsMenu active={this.state.activeTab === 'settings'} />
                </SideMenu>
        
                </MenuWrapper>
                <RouteWrapper activeTab={this.state.activeTab}>
                    {this.props.children}
                </RouteWrapper>
            </SiteWrapper>
        )
    }
}
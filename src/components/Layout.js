import React, { Component } from 'react'
import styled from '@emotion/styled'
import { Link } from 'react-router-dom'
import MaterialIcon from 'material-icons-react'
import { getThemes } from '../utils/themes'
import ExplorerMenu from '../components/ExplorerMenu'
import ExtensionsMenu from '../components/ExtensionsMenu'
import ThemesMenu from './ThemesMenu';
import { onActiveThemeChange } from '../utils/theme';
const SiteWrapper = styled.div`
    width:100%;
    height:100%;
 
`
const RouteWrapper = styled.div`
    width:${props => props.activeTab ? '75vw' : '95vw'};
    float:right;
    height:100%;
    
`
const ActivityBar = styled.aside`
    width:5vw;
    height:100%;
    background:${props => props.theme['activityBar.background']};
    // border-right:5px solid black;
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
    padding: 2em 10px;
    cursor:pointer;
    i{
        font-size:3em !important;
        color: ${props => props.active ?  props.theme['activityBar.foreground'] : props.theme['activityBar.inactiveForeground']} !important;
    }
    &:hover i{
        color:#d7dae0 !important;
    }
   
`
const MenuWrapper = styled.div`
    position: fixed;
    top:0;
    left: 0;
    display: flex;
    height:100%;
    
  
`
const SideMenu = styled.div`
    background: ${({theme}) => theme['sideBar.background']};
    color: ${({theme}) => theme['sideBar.foreground']};
    height:100%;
    width:20vw;
    display: ${props => props.active ? 'block' : 'none'};
    position: relative;
`
const MenuItemLink = MenuItem.withComponent(Link)
export default class extends Component{
    constructor(props){
        super(props)
        this.state = {
            activeTab: null
        }
  
    }
    setActiveTab = (tab) => {
        if(this.state.activeTab === tab){
            this.setState({
                activeTab: null
            })
        }else{
            this.setState({
                activeTab: tab
            })
        }
    }
    render = () => {
        
    
        return (
            <SiteWrapper>
                <MenuWrapper>
                <ActivityBar>
                    <MenuItem onClick={() => this.setActiveTab('explorer')} active={this.state.activeTab === 'explorer'}>
                        <MaterialIcon icon="file_copy" />
                    </MenuItem>
                    <MenuItem onClick={() => this.setActiveTab('themes')} active={this.state.activeTab === 'themes'}>
                        <MaterialIcon icon="color_lens" />
                    </MenuItem>
                    <MenuItem onClick={() => this.setActiveTab('extensions')} active={this.state.activeTab === 'extensions'}>
                        <MaterialIcon icon="extension" />
                    </MenuItem>
                    <MenuItem to="#">
                        <MaterialIcon icon="settings" />
                    </MenuItem>
                    <MenuItemLink to="/cheatsheet">
                        <MaterialIcon icon="help" />
                    </MenuItemLink>
                </ActivityBar>
                <SideMenu active={Boolean(this.state.activeTab)}>
                   <ExplorerMenu active={this.state.activeTab === 'explorer'} />
                   <ThemesMenu active={this.state.activeTab === 'themes'} />
                   <ExtensionsMenu active={this.state.activeTab === 'extensions'} />
                </SideMenu>
        
                </MenuWrapper>
                <RouteWrapper activeTab={this.state.activeTab}>
                    {this.props.children}
                </RouteWrapper>
            </SiteWrapper>
        )
    }
}
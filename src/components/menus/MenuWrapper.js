import React from 'react'
import styled from '@emotion/styled'

const MenuWrapper = styled.div`
    width:100%;
    height: 100%;
    display: ${props => props.active ? 'block' : 'none'};
    box-sizing: border-box;
    color: ${props => props.theme.colors['sideBar.foreground']}; 
    font-family: ${props => props.theme.primaryFont};
    .menu-header{
        text-transform: uppercase;
        font-family: ${props => props.theme.primaryFont};
        margin-left:1em;
        color: ${props => props.theme.colors['sideBarTitle.foreground']};   
    }
`
export default props => (
    <MenuWrapper active={props.active}>
        <h4 className="menu-header">{props.title}</h4>
        <div>
            {props.children}
        </div>
    </MenuWrapper>
)
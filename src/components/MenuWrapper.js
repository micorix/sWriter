import React from 'react'
import styled from '@emotion/styled'

const MenuWrapper = styled.div`
    width:100%;
    height: 100%;
    display: ${props => props.active ? 'block' : 'none'};
    box-sizing: border-box;
    color: ${props => props.theme['sideBar.foreground']}; 
    .menu-header{
        text-transform: uppercase;
        font-family: 'Poppins';
        margin-left:1em;
        color: ${props => props.theme['sideBarTitle.foreground']};   
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
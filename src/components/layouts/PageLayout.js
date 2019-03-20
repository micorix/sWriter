import React from 'react'
import styled from '@emotion/styled'

const ColorsWrapper = styled.div`
    background: ${props => props.theme.colors['editor.background']};
    color: ${props => props.theme.colors['editor.foreground']};
    width:100%;
    min-height:100%;
`
const ChildrenWrapper = styled.div`
    width:50%;
    margin:auto;
    padding-top:3em;
    height:100%;
    line-height:2em;
    @media print{
        width: calc(100% - 4em);
    }


    code{
        font-family: ${props => props.theme.codeFont};
    }
    font-family: ${props => props.theme.secondaryFont};
`

export default ({children}) => (
    <ColorsWrapper>
        <ChildrenWrapper>
            {children}
        </ChildrenWrapper>
    </ColorsWrapper>
)
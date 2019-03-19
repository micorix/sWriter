import React, { Component } from 'react'
import styled from '@emotion/styled'
import { UpdaterContext } from '../updater';
import { onActiveThemeChange } from '../utils/theme';
const ColorsWrapper = styled.div`
    background: ${props => props.theme['editor.background']};
    color: ${props => props.theme['editor.foreground']};
    width:100%;
    min-height:100%;
`
const ChildrenWrapper = styled.div`
    width:50%;
    margin:auto;
    padding-top:3em;
    height:100%;
    line-height:2em;
    code{
        font-family: ${props => props.theme.appearance && props.theme.appearance.codeFont ? props.theme.appearance.codeFont : 'initial'};
    }
    font-family: ${props => props.theme.appearance && props.theme.appearance.secondaryFont ? props.theme.appearance.secondaryFont : 'initial'};
    @media print{
        width: calc(100% - 4em);
    }
`
export default class extends Component {
    static contextType = UpdaterContext
  constructor(props) {
    super(props);
  
  }
  render() {
    return (
        <ColorsWrapper>
            <ChildrenWrapper>
            {this.props.children}
            </ChildrenWrapper>
        </ColorsWrapper>
    );
  }
}
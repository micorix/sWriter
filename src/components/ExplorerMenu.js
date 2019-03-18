import React, {Component} from 'react'
import MenuWrapper from './MenuWrapper';
import styled from '@emotion/styled'
import MaterialIcon from 'material-icons-react'
import { Link } from 'react-router-dom'
const List = styled.details`
    user-select: none;
    summary{
        cursor: pointer;
        background:${props => props.theme['sideBarSectionHeader.background']}; 
        color:${props => props.theme['sideBarSectionHeader.foreground']}; 
        outline:none;
        padding: 5px 1em;
        font-family: 'Poppins';
        text-transform: uppercase;
        position: relative;
    }
    &:hover summary div{
        opacity:1;
    }
`
const Actions = styled.div`
    position: absolute;
    right:1em;
    top:0;
    height:100%;
    display: flex;
    align-items:center;
    
    opacity:0;
    i{
        margin: 0 10px;
    }
`
const FileEntry = styled(Link)`
    all:unset;
    cursor:pointer;
    display: flex;
    align-items: center;
    font-family: 'Poppins';
    padding-left:2em;
    margin-top: .8em;
    span{
        margin-left:1em;
        padding:2px;
    }
    span[contenteditable]:focus{
        outline: 1px solid rgba(255,255,255,0.2);
    }
    
`

let files = [
    {
        name: 'rozprawka.md'
    }
]
export default class extends Component{
    constructor(props){
        super(props)
        this.state = {
            files
        }
        this.editableFilename = React.createRef()
    }
    createNewFile = (e) => {
        e.stopPropagation()
        e.preventDefault()
        const tmpFilename = 'new file'
        this.setState(state => ({
            files: [
                ...state.files, {
                    name: tmpFilename,
                    editable: true
                }
            ]
        }), () => {
            if(this.editableFilename.current){
                let range = document.createRange();//Create a range (a range is a like the selection but invisible)
                range.selectNodeContents(this.editableFilename.current);//Select the entire contents of the element with the range
                range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
                let selection = window.getSelection();//get the selection object (allows you to change selection)
                selection.removeAllRanges();//remove any selections already made
                selection.addRange(range)
                document.execCommand('selectAll',false,null)
                const onKeyDown = e => {
                    if(e.key === 'Enter'){
                        e.preventDefault()
                        this.editableFilename.current.removeEventListener('keydown', onKeyDown)
                        this.cleanUp()
                    }
                }
                this.editableFilename.current.addEventListener('keydown', onKeyDown)
            }
        })
    }
    cleanUp = () => {
        let files = this.state.files
        let index = files.findIndex(file => file.editable)
        if(index >= 0){
            files[index].editable = false
            files[index].name = this.editableFilename.current.innerText
        }
        this.editableFilename = React.createRef()
        this.setState({
            files
        })
    }
    render = () => {
        return (
            <MenuWrapper title="Explorer" active={this.props.active}>
                <List>
                    <summary>
                        Files
                        <Actions>
                        <MaterialIcon icon="create" onClick={this.createNewFile}/> 
                        <MaterialIcon icon="create_new_folder"/>  
                        </Actions>
                    </summary>
                    {this.state.files.map(file => {
                        return (
                            <FileEntry to="/edit">
                                <MaterialIcon icon="insert_drive_file"/> 
                                {
                                file.editable ? <span contentEditable={true} ref={this.editableFilename}>{file.name}</span>
                                : <span>{file.name}</span>}
                            </FileEntry>
                        )
                    })}
                </List>
            </MenuWrapper>
        )
    }
}
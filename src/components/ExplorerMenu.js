import React, {Component} from 'react'
import MenuWrapper from './MenuWrapper';
import styled from '@emotion/styled'
import MaterialIcon from 'material-icons-react'
import { Link } from 'react-router-dom'
import { onDocumentsChange, createDocument, getDocuments, removeDocument } from '../utils/document';
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
    justify-content: space-between;
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
    div{
        display: flex;
    align-items: center;
    }
    .actions{
        opacity: 0;
    }
    &:hover .actions{
        opacity:1;
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
            documents: []
        }
        this.editableFilename = React.createRef()
        onDocumentsChange(async (docs) => {
            // console.log(docs.toArray())
            this.setState({
                documents: await docs.toArray()
            })
        })
        getDocuments().toArray().then(documents => {
            this.setState({
                documents
            })
        })
    }
    createNewFile = (e) => {
        e.stopPropagation()
        e.preventDefault()
        const tmpFilename = 'new file'
        this.setState(state => ({
            documents: [
                ...state.documents, {
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
        let docs = this.state.documents
        let index = docs.findIndex(doc => doc.editable)
        if(index >= 0){
            createDocument(this.editableFilename.current.innerText)
            docs.splice(index, 1)
        }
        this.editableFilename = React.createRef()
        
        this.setState({
            documents: docs
        })
    }
    removeDoc = (e, id) => {
        
        removeDocument(id)
        // e.preventDefault()
    }
    render = () => {
        return (
            <MenuWrapper title="Explorer" active={this.props.active}>
                <List>
                    <summary>
                        Files
                        <Actions>
                        <MaterialIcon icon="create" onClick={this.createNewFile}/> 
                        {/* <MaterialIcon icon="create_new_folder"/>   */}
                        </Actions>
                    </summary>
                    {this.state.documents.sort(doc => doc.specialPage).map(doc => {
                        return (
                            <FileEntry to={{
                                pathname: '/edit',
                                state: {
                                    docId: doc.id
                                }
                            }}>
                            <div className="wrapper">
                                <MaterialIcon icon="insert_drive_file"/> 
                                {
                                doc.editable ? <span contentEditable={true} ref={this.editableFilename}>{doc.name}</span>
                                : <span>{doc.name}</span>}
                                </div>
                                <div className="actions">
                               
                                {!doc.editable && !doc.specialPage && <MaterialIcon onClick={e => this.removeDoc(e, doc.id)} icon="remove_circle"/>  }      
                                </div>
                            </FileEntry>
                        )
                    })}
                </List>
            </MenuWrapper>
        )
    }
}
import { Editor, EditorState, RichUtils } from 'draft-js'

const headlineIndicators = {
    '#': 'header-one',
    '##': 'header-two',
    '###': 'header-three',
    '####': 'header-four',
    '#####': 'header-five',
    '######': 'header-six'
}
export default (editorState, contentBlock) => {
    let text = contentBlock.getText()
    let blockType = contentBlock.getType()
    console.log(text)
    let indicator = Object.keys(headlineIndicators).find(key => text.startsWith(`${key} `))
    console.log(indicator, blockType, headlineIndicators[indicator])
    if(indicator){
        if(blockType !== headlineIndicators[indicator])
            return RichUtils.toggleBlockType(editorState, headlineIndicators[indicator])
    }else{
        if(Object.values(headlineIndicators).includes(blockType)){
            return RichUtils.toggleBlockType(editorState, 'paragraph')
       }
    }
    return editorState
}

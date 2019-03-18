import { EditorState, SelectionState, Modifier } from 'draft-js';

const changeCurrentInlineStyle = (editorState, matchArr, style) => {
  const currentContent = editorState.getCurrentContent();
  const selection = editorState.getSelection();
  const key = selection.getStartKey();
  const { index } = matchArr;
  const blockMap = currentContent.getBlockMap();
  const block = blockMap.get(key);
  const currentInlineStyle = block.getInlineStyleAt(index).merge();
  const newStyle = currentInlineStyle.merge([style]);
  const focusOffset = index + matchArr[0].length;
  const wordSelection = SelectionState.createEmpty(key).merge({
    anchorOffset: index,
    focusOffset: focusOffset+matchArr[3].length
  });
  let text = block.getText().slice(index, focusOffset)
//   if(text.startsWith())
  let newContentState = Modifier.replaceText(
    currentContent,
    wordSelection,
    matchArr[1]+matchArr[2],
    newStyle
  );
  newContentState = Modifier.insertText(
    newContentState,
    newContentState.getSelectionAfter(),
    matchArr[4]
  );
  const newEditorState = EditorState.push(
    editorState,
    newContentState,
    'change-inline-style'
  );
  return EditorState.forceSelection(newEditorState, newEditorState.getCurrentContent().getSelectionAfter());
};

export default changeCurrentInlineStyle;
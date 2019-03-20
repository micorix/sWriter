import { convertFromRaw, EditorState, Editor } from 'draft-js'
import download from 'downloadjs'
import jsPDF from 'jspdf'
import {stateToHTML} from 'draft-js-export-html'

export const saveAsMarkdown = (doc) => {
    const text = convertFromRaw(doc.contents).getPlainText()
    download(text, `${doc.name}.md`, 'text/markdown')
}

export const saveAsPDF = (doc) => {
    const Doc = new jsPDF()

    Doc.fromHTML(stateToHTML(convertFromRaw(doc.contents)), 15, 15, {
        'width': 170,
        'elementHandlers': {}
    })
    Doc.save(`${doc.name}.pdf`)
}
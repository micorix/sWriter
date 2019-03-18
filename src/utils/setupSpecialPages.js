import * as welcomePage from './specialPages/welcome'

export default (db) => {
    db.documents.put({
        id: '__special-welcome__',
        name: welcomePage.name,
        specialPage: true,
        contents: welcomePage.contents
    })
}
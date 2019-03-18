import db from "./db";

export const getDocuments = () => db.documents

export const getDocument = (id) => db.documents.get({id})

export const createDocument = (name) => db.documents.add({
    name,
    contents: {}
})

export const renameDocument = (id, newName) => db.documents.where('id').equals(id).modify(doc => {
    doc.name = newName
})
export const removeDocument = (id) => db.documents.where('id').equals(id).delete()

export const changeDocumentContent = (id, contents) => db.documents.where('id').equals(id).modify(doc => {
    doc.contents = contents
})
export const onDocumentsChange = (fn) => {
    db.documents.hook('creating', function (primKey, obj, transaction){
        this.onsuccess = () => fn(db.documents)
    })
    db.documents.hook('deleting', function(primKey, obj, transaction){
        this.onsuccess = () => fn(db.documents)
    })
    db.documents.hook('updating', function(mods, primKey, obj, trans) {
        if (mods.hasOwnProperty('name')) {
         this.onsuccess = () => fn(db.documents)
        }
      })
}
export const onDocumentRemove = (fn) => {
    db.documents.hook('deleting', function(primKey, obj, transaction){
        fn(obj)
    })
}
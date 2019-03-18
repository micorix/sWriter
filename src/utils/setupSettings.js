
const defaults = {
    primaryFont: 'Poppins',
    secondaryFont: 'Work Sans',
    codeFont: 'Fira Code'
}

export default (db) => {
    Object.keys(defaults).forEach(async key => {
        let setting = await db.appearanceSettings.get({id:key})
        if(!setting || !setting.value){
            db.appearanceSettings.add({
                id: key,
                value: defaults[key]
            })
        }
    })
}
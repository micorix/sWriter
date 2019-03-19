
const defaults = {
    primaryFont: 'Poppins',
    secondaryFont: 'Work Sans',
    codeFont: 'Ubuntu Mono'
}

export default (db) => {
    Object.keys(defaults).forEach(async key => {
        let setting = await db.appearanceSettings.get({id:key})
        if(!setting || !setting.value){
            db.appearanceSettings.put({
                id: key,
                value: defaults[key]
            })
        }
    })
}
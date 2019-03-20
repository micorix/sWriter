import db from "../db";

export const getAppearanceSettings = () => db.appearanceSettings

export const getConfigObject = async (table) => {
    const obj = {}
    const arr = await db.appearanceSettings.toArray()
    arr.forEach(({id, value}) => {
        obj[id] = value
    })
    return obj
}

export const onAppearanceSettingsChange = (fn) => {
    db.appearanceSettings.hook('updating', function(mods, primKey, obj, trans) {
        if (primKey === 'primaryFont' || primKey === 'secondaryFont' || primKey === 'codeFont') {
            
         this.onsuccess = () => getConfigObject(getAppearanceSettings()).then(configObj => fn(configObj))
        }
      })
}
export const setConfig = (id, value) => db.appearanceSettings.where({id}).modify(config => {
    config.value = value
})

export const getAppearanceConfigObj = () => getConfigObject(db.appearanceSettings)
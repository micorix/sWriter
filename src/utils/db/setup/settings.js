import WebFont from 'webfontloader'
import defaultTheme from '../../defaultTheme'

WebFont.load({
  google: {
    families: [
        'Poppins:400:latin,latin-ext',
        'Merriweather:latin,latin-ext',
        'Work Sans:latin,latin-ext'
    ]
  }
})

const exclude = ['colors']

export default (db) => {
    Object.keys(defaultTheme).forEach(async key => {
        if(exclude.includes(key)){
            return
        }
        let setting = await db.appearanceSettings.get({id:key})
        if(!setting || !setting.value){
            db.appearanceSettings.put({
                id: key,
                value: defaultTheme[key]
            })
        }
    })
}

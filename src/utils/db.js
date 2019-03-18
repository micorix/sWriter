import Dexie from 'dexie';
import 'dexie-observable'
import setupSpecialPages from './setupSpecialPages'
import setupSettings from './setupSettings'
const db = new Dexie('recipe_data')

db.version(1).stores({
    documents: `++id, name, contents, specialPage`,
    disabledThemes: `id, reason`,
    installedThemes: 'id, name, extension, colors, active',

    appearanceSettings: 'id, value'
})
setupSpecialPages(db)
setupSettings(db)
export default db
import Dexie from 'dexie'
import 'dexie-observable'

import setupSpecialPages from './setup/specialPages'
import setupSettings from './setup/settings'

const db = new Dexie('recipe_data')

db.version(1).stores({
    documents: `++id, name, contents, specialPage, active`,
    disabledThemes: `id, reason`,
    installedThemes: 'id, name, extension, colors, active',

    appearanceSettings: 'id, value'
})
setupSpecialPages(db)
setupSettings(db)

export default db
import Dexie from 'dexie';
import 'dexie-observable'
const db = new Dexie('recipe_data')

db.version(1).stores({
    documents: `++id, name, body`,
    disabledThemes: `id, reason`,
    installedThemes: 'id, name, extension, colors, active'
})

export default db
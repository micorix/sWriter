import db from "./db";

const githubURL = 'https://github.com/'

const marketplacePaths = {
    manifest: 'Microsoft.VisualStudio.Code.Manifest',
    readme: 'Microsoft.VisualStudio.Services.Content.Details'
}

export const hasGithubRepo = (manifest) => manifest.repository.type === 'git' && manifest.repository.url.startsWith(githubURL)
export const createRepoContentsUrl = (manifest) => `https://raw.githubusercontent.com/${manifest.repository.url.replace('.git', '').replace(githubURL, '')}/master`
export const getPackageJson = (manifest) => fetch(`${createRepoContentsUrl(manifest)}/package.json`).then(res => res.json())


export const createMarketplaceBaseUrl = (ext) => {
    const file = ext.versions[0].files[0]
    return file.source.replace(file.assetType, '')
}

export const getMarketplaceResource = (ext, url, isText) => fetch(`${createMarketplaceBaseUrl(ext)}${marketplacePaths[url]}`).then(res => isText ? res.text() : res.json())

export const getAvailableThemes = (ext) => new Promise((resolve, reject) => {
    getMarketplaceResource(ext, 'manifest').then(manifest => {
        if(!hasGithubRepo(manifest))
            reject()
        getPackageJson(manifest).then(packageJson => {
            if(packageJson.contributes.themes){
                Promise.all(
                    packageJson.contributes.themes.map((theme) => new Promise((resolveTheme, reject) => {
                        fetch(`${createRepoContentsUrl(manifest)}/${theme.path.replace('.', '')}`)
                        .then(res => res.json()).then(details =>  {
                            resolveTheme({
                                ...theme,
                                id: `${ext.extensionId}_${theme.label.split(' ').join('+')}`,
                                extension: ext,
                                active: false,
                                details
                            })
                        }).catch(e => resolveTheme(false))
                    }))
                ).then(result => {
                    console.log(result.filter(r => r != false))
                    resolve(result.filter(r => r != false))
                })
                
            }else{
                reject()
            }
            
        }).catch(reject)
        
    }).catch(reject)
})



export const installTheme = (theme) => {
    return getInstalledThemes().put(theme)
}
export const removeTheme = (themeId) => {
    return getInstalledThemes().where('id').equals(themeId).delete()
}

export const getInstalledThemes = () => db.installedThemes

export const useTheme = (themeId) => {
    return getInstalledThemes().toCollection().modify(theme => {
        theme.active = 0
    }).then(() => {
        getInstalledThemes().where('id').equals(themeId).modify(theme => {
            theme.active = 1
        }).catch(e => console.log(e, 2))
    }).catch(e => console.log(e))
}
export const onActiveThemeChange = (fn) => {
    db.installedThemes.hook('updating', (mods, primKey, obj, trans) => {
        if (mods.hasOwnProperty('active') && mods.active === 1) {
         fn(obj)
        }
      })
}
export const onInstalledThemesChange = (fn) => {
    getInstalledThemes().hook('creating', function (primKey, obj, transaction){
        this.onsuccess = () => fn(getInstalledThemes())
    })
    getInstalledThemes().hook('deleting', function(primKey, obj, transaction){
        this.onsuccess = () => fn(getInstalledThemes())
    })
}
export const getActiveTheme = () => getInstalledThemes().get({active: 1})

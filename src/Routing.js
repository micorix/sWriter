import React from 'react'
import { Redirect } from 'react-router-dom'
import EditComponent from './pages/Edit'
import ThemeComponent from './pages/Theme'
import CheatsheetComponent from './pages/Cheatsheet'
const routes = [
    {
        path: '/edit',
        component: EditComponent
    },
    {
        path: '/theme/:themeID',
        component: ThemeComponent
    },
    {
        path: '/theme',
        component: ThemeComponent
    },
    {
        path: '/cheatsheet',
        component: CheatsheetComponent
    },
    {
        path: '/',
        exact: true,
        render: () => <Redirect to='/edit'/>
    }
]

export default routes
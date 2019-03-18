import React from 'react'
import { Subject } from 'rxjs'

export const UpdaterContext = React.createContext(new Subject())

export const UpdaterProvider = UpdaterContext.Provider;
export const UpdaterConsumer = UpdaterContext.Consumer;
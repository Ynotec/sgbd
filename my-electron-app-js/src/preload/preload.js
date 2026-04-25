import { contextBridge } from 'electron'
import counter from './counter.js'
import todo from './todo.js'

contextBridge.exposeInMainWorld('api', {
    counter,
    todo,
})

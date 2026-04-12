import { contextBridge } from 'electron'
import { todo } from './todo'

contextBridge.exposeInMainWorld('todo', todo)

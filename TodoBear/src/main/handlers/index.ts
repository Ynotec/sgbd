import { IpcMain } from 'electron'
import { registerTodo } from './todoHandler'

export function registerHandlers(ipcMain: IpcMain): void {
    registerTodo(ipcMain)
}
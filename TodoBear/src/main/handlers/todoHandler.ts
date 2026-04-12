import { IpcMain } from 'electron'
import TodoService from '../../services/TodoService'

const todoService = TodoService.getInstance()

export function registerTodo(ipcMain : IpcMain): void {
    ipcMain.handle('todo:getAll', () => {
        return todoService.getAll()
    })

    ipcMain.handle('todo:add', (_, name: string) => {
        return todoService.addTask(name)
    })

    ipcMain.handle('todo:updateStatus', (_, name: string, status) => {
        return todoService.updateStatus(name, status)
    })

    ipcMain.handle('todo:clear', () => {
        return todoService.clearTodo()
    })
}

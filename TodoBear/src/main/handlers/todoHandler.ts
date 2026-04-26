import { IpcMain } from 'electron'
import TodoService from '../../service/TodoService.js'

export function registerTodoHandlers(ipcMain: IpcMain): void {
    ipcMain.handle('todo:getAll', () => TodoService.getInstance().getAll())
    ipcMain.handle('todo:getById', (_, id: number) => TodoService.getInstance().getById(id))
    ipcMain.handle('todo:add', (_, name: string, listeId: number, dateEcheance: string | null) =>
        TodoService.getInstance().add(name, listeId, dateEcheance)
    )
    ipcMain.handle('todo:edit', (_, id: number, data) => TodoService.getInstance().edit(id, data))
    ipcMain.handle('todo:delete', (_, id: number) => TodoService.getInstance().delete(id))
    ipcMain.handle('todo:doneTask', (_, id: number, done: boolean) =>
        TodoService.getInstance().doneTask(id, done)
    )
    ipcMain.handle('todo:addEtiquette', (_, tacheId: number, etiquetteId: number) =>
        TodoService.getInstance().addEtiquette(tacheId, etiquetteId)
    )
    ipcMain.handle('todo:removeEtiquette', (_, tacheId: number, etiquetteId: number) =>
        TodoService.getInstance().removeEtiquette(tacheId, etiquetteId)
    )
    ipcMain.handle('todo:clear', () => TodoService.getInstance().clear())
}

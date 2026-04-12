import { ipcRenderer } from 'electron'

export const todo = {
    add: (tasks : string) => ipcRenderer.invoke('todo:add', tasks),
    clear: () => ipcRenderer.invoke('todo:clear'),
    getAll: () => ipcRenderer.invoke('todo:getAll'),
    updateStatus: (name: string, status: string) => ipcRenderer.invoke('todo:updateStatus', name, status)
}

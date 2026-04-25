import { ipcRenderer } from 'electron'

export default {
    getAll: () => ipcRenderer.invoke('todo:getAll'),
    add: (name) => ipcRenderer.invoke('todo:add', name),
    delete: (id) => ipcRenderer.invoke('todo:delete', id),
    edit: (name, id) => ipcRenderer.invoke('todo:edit', name, id),
    setDone: (id, done) => ipcRenderer.invoke('todo:setDone', done, id),
    clear: () => ipcRenderer.invoke('todo:clear')
}

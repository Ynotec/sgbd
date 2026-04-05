import { ipcRenderer } from 'electron'

export default {
    add: () => ipcRenderer.invoke('counter:add'),
    remove: () => ipcRenderer.invoke('counter:remove'),
    clear: () => ipcRenderer.invoke('counter:clear'),
}

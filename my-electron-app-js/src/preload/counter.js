import { ipcRenderer } from 'electron'

export default {
    add: () => ipcRenderer.invoke('counter:addCount'),
    remove: () => ipcRenderer.invoke('counter:removeCount'),
    reset: () => ipcRenderer.invoke('counter:resetCount'),
    get: () => ipcRenderer.invoke('counter:getCount'),
}

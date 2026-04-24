import { ipcRenderer } from 'electron'

export default {
    addCount: () => ipcRenderer.invoke('counter:addCount'),
    removeCount: () => ipcRenderer.invoke('counter:removeCount'),
    resetCount: () => ipcRenderer.invoke('counter:resetCount'),
    getCount: () => ipcRenderer.invoke('counter:getCount'),
}

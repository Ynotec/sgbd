import { ipcRenderer } from 'electron'

export default {
    save: () => ipcRenderer.invoke('score:save'),
    getAll: () => ipcRenderer.invoke('score:getAll'),
    getPlayer: playerName => ipcRenderer.invoke('score:getPlayer', playerName)
}

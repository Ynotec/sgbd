import { ipcRenderer } from 'electron'

export default {
    start: () => ipcRenderer.invoke('guess:start'),
    check: number => ipcRenderer.invoke('guess:check', number),
}

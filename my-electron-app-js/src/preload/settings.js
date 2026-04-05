import { ipcRenderer } from 'electron'

export default {
    save: settings => ipcRenderer.invoke('settings:save', settings),
    get: () => ipcRenderer.invoke('settings:get'),
}

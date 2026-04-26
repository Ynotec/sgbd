import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld('api', {
    todo: {
        getAll: () => ipcRenderer.invoke('todo:getAll'),
        getById: (id: number) => ipcRenderer.invoke('todo:getById', id),
        add: (name: string, listeId: number, dateEcheance: string | null) => ipcRenderer.invoke('todo:add', name, listeId, dateEcheance),
        edit: (id: number, data: {titre?:string,description?:string,statut?:string}) => ipcRenderer.invoke('todo:edit', id, data),
        delete: (id: number) => ipcRenderer.invoke('todo:delete', id),
        doneTask: (id: number, done: boolean) => ipcRenderer.invoke('todo:doneTask', id, done),
        addEtiquette:(tacheId: number, etiquetteId: number) => ipcRenderer.invoke('todo:addEtiquette', tacheId, etiquetteId),
        removeEtiquette:(tacheId: number, etiquetteId: number) => ipcRenderer.invoke('todo:removeEtiquette', tacheId, etiquetteId),
        clear:() => ipcRenderer.invoke('todo:clear')
    }
})
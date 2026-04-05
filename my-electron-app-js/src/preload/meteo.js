import { ipcRenderer } from 'electron'

export default {
    get: ville => ipcRenderer.invoke('meteo:get', ville),
    geolocation: (latitude, longitude) =>
        ipcRenderer.invoke('meteo:geolocation', latitude, longitude),
}

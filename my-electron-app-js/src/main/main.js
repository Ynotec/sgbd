import { app, BrowserWindow, ipcMain } from 'electron'
import { devtron } from '@electron/devtron'
import path from 'path'

import { fileURLToPath } from 'url'
import MeteoApiService from '../service/MeteoApiService.js'
import GuessService from '../service/GuessService.js'
import ScoreService from '../service/ScoreService.js'
import CounterService from '../../dist/service/CounterService.js'
import TodoService from '../../dist/service/TodoService.js'
import DatabaseService from '../../dist/repositories/DatabaseService.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Doit être appelé au début
devtron.install()

DatabaseService.getInstance().initDb()

const createWindow = () => {
    const win = new BrowserWindow({
        width: 1280,
        height: 768,
        webPreferences: {
            preload: path.join(__dirname, '../preload/preload.js'),
            contextIsolation: true,
            nodeIntegration: false,
            sandbox: false,
        },
    })

    win.webContents.session.setPermissionRequestHandler((_webContents, permission, callback) => {
        callback(permission === 'geolocation')
    })

    win.webContents.session.setPermissionCheckHandler((_webContents, permission) => {
        return permission === 'geolocation'
    })

    win.loadFile(path.join(__dirname, '../renderer/app/dist/app/browser/index.html'))
    win.webContents.openDevTools()
}

ipcMain.handle('todo:getAll', () => TodoService.getInstance().getAll())
ipcMain.handle('todo:add', (_event, name) => TodoService.getInstance().add(name))
ipcMain.handle('todo:delete', (_event, id) => TodoService.getInstance().delete(id))
ipcMain.handle('todo:edit', (_event, name, id) => TodoService.getInstance().edit(name, id))
ipcMain.handle('todo:setDone', (_event, done, id) => TodoService.getInstance().doneTask(done, id))
ipcMain.handle('todo:clear', () => TodoService.getInstance().clear())

// IPC Handlers
ipcMain.handle('counter:addCount', () => CounterService.getInstance().add())
ipcMain.handle('counter:removeCount', () => CounterService.getInstance().removeCount())
ipcMain.handle('counter:resetCount', () => CounterService.getInstance().resetCount())
ipcMain.handle('counter:getCount', () => CounterService.getInstance().getCount())

ipcMain.handle('meteo:get', async (_event, ville) => {
    return await MeteoApiService.getInstance().getGeolocationByCity(ville)
})
ipcMain.handle('meteo:geolocation', async (_event, latitude, longitude) => {
    console.warn(latitude, longitude)
    return await MeteoApiService.getInstance().getMeteo(latitude, longitude)
})

ipcMain.handle('guess:check', (_event, number) => {
    const result = GuessService.getInstance().check(number)
    if (result.status === 'win' || result.status === 'gameover') {
        const playerName = currentSettings.playerName || 'John Doe'
        ScoreService.getInstance().addGame(playerName, result.status === 'win' ? 'win' : 'lose')
    }
    return result
})
ipcMain.handle('guess:start', _event => GuessService.getInstance().reset())

let currentSettings = {
    playerName: '',
    minSecret: 1,
    maxSecret: 100,
    maxLife: 5,
}

ipcMain.handle('score:getPlayer', (_event, playerName) => {
    return ScoreService.getInstance().getPlayer(playerName)
})

ipcMain.handle('settings:get', () => currentSettings)

ipcMain.handle('settings:save', (_event, settings) => {
    currentSettings = { ...currentSettings, ...settings }
    const service = GuessService.getInstance()
    service.setMinMaxSecret(currentSettings.minSecret, currentSettings.maxSecret)
    service.setMaxLife(currentSettings.maxLife)
    return currentSettings
})

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('before-quit', () => {
    DatabaseService.getInstance().closeDb()
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

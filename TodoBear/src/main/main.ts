import { app, BrowserWindow, ipcMain } from 'electron'
import path from 'node:path'
import started from 'electron-squirrel-startup'

import DatabaseService from '../repositories/DatabaseService'
import TodoService from '../service/TodoService'
import { LoggerService } from '../service/LoggerService'
import { LogLevel } from '../interfaces/ILogger'
import { registerTodoHandlers } from './handlers/todoHandler.js'

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
    app.quit()
}

const createWindow = () => {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 1280,
        height: 768,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        },
    })

    // and load the index.html of the app.
    if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
        mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL)
    } else {
        mainWindow.loadFile(path.join(__dirname, `renderer/app/dist/app/browser/index.html`))
    }

    // Open the DevTools.
    mainWindow.webContents.openDevTools()
}

app.whenReady().then(async () => {
    const logger = LoggerService.getInstance(LogLevel.INFO, 'Todobear')
    await DatabaseService.getInstance()
        .initDb()
        .catch((error: any) => {
            logger.error('main','initDb', `Message: ${error}`)
            app.quit()
        })

        registerTodoHandlers(ipcMain)

    createWindow()
})

app.on('before-quit', async () => {
  await DatabaseService.getInstance().closeDb()
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

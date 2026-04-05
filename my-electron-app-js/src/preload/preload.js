import { contextBridge } from 'electron'
import counter from './counter.js'
import meteo from './meteo.js'
import guess from './guess.js'
import settings from './settings.js'
import score from './score.js'

contextBridge.exposeInMainWorld('counter', counter)
contextBridge.exposeInMainWorld('meteo', meteo)
contextBridge.exposeInMainWorld('guess', guess)
contextBridge.exposeInMainWorld('settings', settings)
contextBridge.exposeInMainWorld('score', score)

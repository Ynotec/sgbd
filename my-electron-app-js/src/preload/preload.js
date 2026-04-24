import { contextBridge } from 'electron'
import counter from './counter.js'
import meteo from './meteo.js'
import guess from './guess.js'
import settings from './settings.js'
import score from './score.js'

contextBridge.exposeInMainWorld('api', {
    ...counter,
    ...meteo,
    ...guess,
    ...settings,
    ...score,
})

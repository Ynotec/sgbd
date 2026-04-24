import { init as initNavigation } from './sections/nav.js'
import { init as initCounter } from './sections/counter.js'
import { init as initWeather } from './sections/weather.js'
import { init as initSecretIpc } from './sections/secretRenderer.js'
import { init as initSecretRenderer } from './sections/secretIpc.js'
import { init as initSettings } from './sections/settings.js'
import { init as initProfile } from './sections/profile.js'

initNavigation()
initCounter()
initSecretIpc()
initWeather()
initSecretRenderer()
initSettings()
initProfile()

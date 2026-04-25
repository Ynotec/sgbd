import { ICounterApi } from "./ICounter.js"
import { ITodoApi } from "./ITodo.js"

export interface ElectronApi {
  counter : ICounterApi
  todo: ITodoApi
}

declare global {
    interface Window {
        api : ElectronApi
    }
}


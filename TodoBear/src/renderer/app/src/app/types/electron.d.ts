import { ITodoApi } from "./ITodo.js"

export interface ElectronApi {
  todo: ITodoApi
}

declare global {
    interface Window {
        api : ElectronApi
    }
}


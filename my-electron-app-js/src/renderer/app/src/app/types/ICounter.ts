export interface ICounterApi {
    add: () => Promise<{ counter: number }>
    remove: () => Promise<{ counter: number }>
    reset: () => Promise<{ counter: number }>
    get: () => Promise<{ counter: number }>
}
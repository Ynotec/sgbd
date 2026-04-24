export interface ElectronApi {
    // Counter
    addCount: () => Promise<{ counter: number }>
    removeCount: () => Promise<{ counter: number }>
    resetCount: () => Promise<{ counter: number }>
    getCount: () => Promise<{ counter: number }>
    
    // Météo

    // Settings

    // Score

    //
}

declare global {
    interface Window {
        api : ElectronApi
    }
}


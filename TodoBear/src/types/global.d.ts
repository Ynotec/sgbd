interface Window {
    todo: {
        getAll: () => Promise<import("../interfaces/ITodo").TodoData>
        add: (task: string) => Promise<void>
        clear: () => Promise<void>
        updateStatus: (name: string, status: string) => Promise<void>
    }
}
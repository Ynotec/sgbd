export interface TodoItem {
    status: string,
    date: string
}

export interface TodoData {
    [name: string]: TodoItem
}

export interface TodoEntry extends TodoItem {
    name: string
}


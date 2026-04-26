export interface IListe {
    id: number
    titre: string
}

export interface IEtiquette {
    id: number
    nom: string
    couleur: string
}

export interface ITodo {
    id: number
    titre: string
    description: string | null
    statut: string
    priorite: number
    date_echeance: Date | string | null
    liste_id: number
    liste: IListe | null
    etiquettes: IEtiquette[] | null
}

export interface ITodoApi {
    getAll: () => Promise<ITodo[]>
    getById: (id: number) => Promise<ITodo | null>
    add: (name: string, listeId?: number, dateEcheance?: string | null) => Promise<ITodo | null>
    edit: (id: number, data: { titre?: string; description?: string; statut?: string }) => Promise<ITodo | null>
    delete: (id: number) => Promise<ITodo>
    doneTask: (id: number, done: boolean) => Promise<ITodo>
    addEtiquette: (tacheId: number, etiquetteId: number) => Promise<ITodo>
    removeEtiquette: (tacheId: number, etiquetteId: number) => Promise<ITodo>
    clear: () => Promise<void>
}
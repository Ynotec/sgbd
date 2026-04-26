export interface IListe {
    id: number
    titre: string
}

export interface IEtiquette {
    id: number
    nom: string
    couleur: string
}

export default interface ITodo {
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


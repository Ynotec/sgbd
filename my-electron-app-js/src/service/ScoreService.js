import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

class ScoreService {
    static #instance = null

    #filePath

    constructor() {
        this.#filePath = path.join(__dirname, '../../data/scores.json')
    }

    static getInstance() {
        if (!ScoreService.#instance) {
            ScoreService.#instance = new ScoreService()
        }
        return ScoreService.#instance
    }

    #read() {
        if (!fs.existsSync(this.#filePath)) {
            return {}
        }
        const raw = fs.readFileSync(this.#filePath, 'utf-8')
        return JSON.parse(raw)
    }

    #write(data) {
        fs.mkdirSync(path.dirname(this.#filePath), { recursive: true })
        fs.writeFileSync(this.#filePath, JSON.stringify(data, null, 2), 'utf-8')
    }

    // Enregistre une partie pour un joueur
    // status: 'win' | 'lose'
    addGame(playerName, status) {
        const scores = this.#read()

        if (!scores[playerName]) {
            scores[playerName] = { wins: 0, losses: 0, games: [] }
        }

        if (status === 'win') {
            scores[playerName].wins++
        } else {
            scores[playerName].losses++
        }

        scores[playerName].games.push({
            status,
            date: new Date().toISOString(),
        })

        this.#write(scores)
    }

    // Retourne les stats d'un joueur
    getPlayer(playerName) {
        const scores = this.#read()
        return scores[playerName] ?? { wins: 0, losses: 0, games: [] }
    }

    // Retourne tous les joueurs et leurs stats (sans l'historique détaillé)
    getLeaderboard() {
        const scores = this.#read()
        return Object.entries(scores).map(([name, data]) => ({
            name,
            wins: data.wins,
            losses: data.losses,
            total: data.wins + data.losses,
        }))
    }

    resetPlayer(playerName) {
        const scores = this.#read()
        delete scores[playerName]
        this.#write(scores)
    }

    resetAll() {
        this.#write({})
    }
}

export default ScoreService

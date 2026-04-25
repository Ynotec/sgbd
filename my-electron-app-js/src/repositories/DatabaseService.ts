import path from 'path'
import { fileURLToPath } from 'url'
import Database from 'better-sqlite3'
import { DB } from '../types/db.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

class DatabaseService {
    private static instance: DatabaseService
    private db: DB
    private static readonly DB_PATH = path.join(__dirname, '../../data', 'database.db')

    private constructor() {
        this.db = new Database(DatabaseService.DB_PATH)
    }

    static getInstance(): DatabaseService {
        if (!DatabaseService.instance) {
            DatabaseService.instance = new DatabaseService()
        }
        return DatabaseService.instance
    }

    getDb(): DB {
        return this.db
    }

    initDb() {
        // Counter
        this.db.exec(`
            CREATE TABLE IF NOT EXISTS Counter (
            id INTEGER PRIMARY KEY,
            value INTEGER NOT NULL DEFAULT 0
            )
        `)
        this.db.prepare('INSERT OR IGNORE INTO Counter (id, value) VALUES (1, 0)').run()

        // Todo
        this.db.exec(`
            CREATE TABLE IF NOT EXISTS Todo (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            date TEXT NOT NULL,
            done INTEGER NOT NULL DEFAULT 0
            )
        `)
    }

    closeDb() {
        this.db.close()
    }
}

export default DatabaseService
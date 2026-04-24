import DatabaseService from './DatabaseService.js'
import { DB } from '../types/db.js'

class CounterRepository {
    private static instance : CounterRepository
    private db : DB

    constructor() {
        this.db = DatabaseService.getInstance().getDb()
    }

    static getInstance() {
        if(!CounterRepository.instance) {
            CounterRepository.instance = new CounterRepository
        }
        return CounterRepository.instance

    }

    getCounter() {
        const row = this.db.prepare('SELECT value FROM Counter WHERE id = 1').get() as { value: number }
        return row.value
    }

    add() {
        this.db.prepare('UPDATE Counter SET value = value + 1 WHERE id = 1').run()
        const row = this.db.prepare('SELECT value FROM Counter WHERE id = 1').get() as { value : number}
        return row.value
    }

    remove() {
        this.db.prepare('UPDATE Counter SET value = value -1 WHERE id = 1').run()
        const row = this.db.prepare('SELECT value FROM Counter WHERE id = 1').get() as { value: number }
        return row.value
    }

    reset() {
        this.db.prepare('UPDATE Counter SET value = 0 WHERE id = 1').run()
        return 0
    }

}

export default CounterRepository
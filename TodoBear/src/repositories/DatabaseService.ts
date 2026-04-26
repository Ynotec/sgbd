import path from 'path'
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3'
import { PrismaClient } from '../generated/prisma/client.js'
import { LoggerService } from '../service/LoggerService.js'


class DatabaseService {
    private static instance: DatabaseService
    private adapter: PrismaBetterSqlite3
    private prisma: PrismaClient
    private DB_PATH = path.join(__dirname , '..', '..', 'dev.db')

    private get logger(): LoggerService {
        return LoggerService.getInstance()
    }
    private serviceName = 'DatabaseService'

    private constructor() {
        const dbPath = 'file:' + this.DB_PATH
        const adapter = new PrismaBetterSqlite3({ url: dbPath })
        this.adapter = adapter

        this.prisma = new PrismaClient({ adapter })

    }

    static getInstance(): DatabaseService {
        if (!DatabaseService.instance) {
            DatabaseService.instance = new DatabaseService()
        }
        return DatabaseService.instance
    }

    public async initDb(): Promise<void> {
        const methodName = 'initDb'
        try {
            this.logger.debug(this.serviceName, methodName, 'Start')

            await this.prisma.liste.upsert({
                        where: { id: 1},
                        update: {},
                        create: {
                            id: 1,
                            titre: "Ma liste"
                        },
                    })
            this.logger.info(this.serviceName, methodName, 'Database initialize with success')

        } catch (error) {
            this.logger.error(this.serviceName, methodName, `Failed to initialize the database ${error}`)
            throw error
        } finally {
            this.logger.debug(this.serviceName, methodName, 'End')
        }
    }

    public getPrisma() {
        const methodName = 'getPrisma'
        try{
            this.logger.debug(this.serviceName, methodName, 'Start')

            this.logger.info(this.serviceName, methodName, 'get prisma to databaseService')
            return this.prisma
        } catch (error) {
            this.logger.error(this.serviceName, methodName, `Message : ${error}`)
            throw error
        } finally {
            this.logger.debug(this.serviceName, methodName, 'End')
        }
    }

    closeDb() {
        const methodName = 'closeDb'
        try {
            this.logger.debug(this.serviceName, methodName, 'Start')

            this.logger.info(this.serviceName, methodName, 'Disconnect to database properly..')
            this.prisma.$disconnect()
        } catch(error) {
            this.logger.error(this.serviceName, methodName, `Message : ${error}`)
            throw error
        } finally {
            this.logger.debug(this.serviceName, methodName, 'End')
        }
    }
}

export default DatabaseService
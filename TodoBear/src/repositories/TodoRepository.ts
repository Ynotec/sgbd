import { PrismaClient } from '../generated/prisma/client.js'
import DatabaseService from './DatabaseService.js'
import ITodo from '../interfaces/ITodo.js'
import { LoggerService } from '../service/LoggerService.js'


class TodoRepository {
    private static instance: TodoRepository
    private db: PrismaClient

    private get logger(): LoggerService {
        return LoggerService.getInstance()
    }
    private serviceName = 'TodoRepository'

    constructor() {
        this.db = DatabaseService.getInstance().getPrisma()
    }

    static getInstance() {
        if (!TodoRepository.instance) {
            TodoRepository.instance = new TodoRepository()
        }
        return TodoRepository.instance
    }

    async getTodo(): Promise<ITodo[]> {
        const methodName = 'getTodo'
        try {
            this.logger.debug(this.serviceName, methodName, 'Start')

            const taches = await this.db.tache.findMany({
                include: {
                    liste: true,
                    etiquettes: true,
                },
                orderBy: { id: 'asc' },
            })

            this.logger.info(this.serviceName, methodName, `getting all tasks : ${taches.length}`)
            return taches
        } catch (error) {
            this.logger.error(this.serviceName, methodName, `Message : ${error}`)
            throw error
        } finally {
            this.logger.debug(this.serviceName, methodName, 'End')
        }
    }

    async getTodoById(id: number): Promise<ITodo | null> {
        const methodName = 'getTodoById'
        try {
            this.logger.debug(this.serviceName, methodName, 'Start')

            const tache = await this.db.tache.findUnique({
                where: { id },
                include: {
                    liste: true,
                    etiquettes: true,
                },
            })

            this.logger.info(this.serviceName, methodName, `getting tache id :${tache?.id}`)
            return tache
        } catch (error) {
            this.logger.error(this.serviceName, methodName, `Message : ${error}`)
            throw error
        } finally {
            this.logger.debug(this.serviceName, methodName, 'End')
        }
    }

    async addTask(titre: string, listeId: number = 1, dateEcheance?: string | null): Promise<ITodo> {
        const methodName = 'addTask'
        try {
            this.logger.debug(this.serviceName, methodName, 'Start')

            const createTask = await this.db.tache.create({
                data: {
                    titre: titre,
                    statut: 'à faire',
                    priorite: 2,
                    date_echeance: dateEcheance,
                    liste_id: listeId,
                },
                include: {
                    liste: true,
                    etiquettes: true,
                },
            })
            this.logger.info(
                this.serviceName,
                methodName,
                `Creating task with id : ${createTask.id}`
            )
            return createTask
        } catch (error) {
            this.logger.error(this.serviceName, methodName, `Message : ${error}`)
            throw error
        } finally {
            this.logger.debug(this.serviceName, methodName, 'End')
        }
    }

    async editTask(
        id: number,
        data: {
            titre?: string
            description?: string
            statut?: string
            priorite?: number
            date_echeance?: Date | null
            liste_id?: number
        }
    ): Promise<ITodo> {
        const methodName = 'editTask'
        try {
            this.logger.debug(this.serviceName, methodName, 'Start')

            const updateTask = await this.db.tache.update({
                where: { id },
                data: data,
                include: {
                    liste: true,
                    etiquettes: true,
                },
            })
            this.logger.info(
                this.serviceName,
                methodName,
                `Updating task with id : ${updateTask.id}`
            )
            return updateTask
        } catch (error) {
            this.logger.error(this.serviceName, methodName, `Message : ${error}`)
            throw error
        } finally {
            this.logger.debug(this.serviceName, methodName, 'End')
        }
    }

    async removeTask(id: number): Promise<ITodo> {
        const methodName = 'removeTask'
        try {
            this.logger.debug(this.serviceName, methodName, 'Start')

            const deleteTask = await this.db.tache.delete({
                where: { id },
                include: {
                    liste: true,
                    etiquettes: true,
                },
            })
            this.logger.info(this.serviceName, methodName, `Delete task with id : ${deleteTask.id}`)

            return deleteTask
        } catch (error) {
            this.logger.error(this.serviceName, methodName, `Message : ${error}`)
            throw error
        } finally {
            this.logger.debug(this.serviceName, methodName, 'End')
        }
    }

    async setDoneTask(id: number, statut: string): Promise<ITodo> {
        const methodName = 'setDoneTask'
        try {
            this.logger.debug(this.serviceName, methodName, 'Start')

            const doneTask = await this.db.tache.update({
                where: { id },
                data: {
                    statut,
                },
                include: {
                    liste: true,
                    etiquettes: true,
                },
            })
            this.logger.info(this.serviceName, methodName, `update done task id : ${doneTask.id}`)
            return doneTask
        } catch (error) {
            this.logger.error(this.serviceName, methodName, `Message : ${error}`)
            throw error
        } finally {
            this.logger.debug(this.serviceName, methodName, 'End')
        }
    }

    async addEtiquetteToTache(tacheId: number, etiquetteId: number): Promise<ITodo> {
        const methodName = 'addEtiquetteToTache'
        try {
            this.logger.debug(this.serviceName, methodName, 'Start')

            const addEtiquette = await this.db.tache.update({
                where: { id: tacheId },
                data: {
                    etiquettes: {
                        connect: { id: etiquetteId },
                    },
                },
                include: {
                    liste: true,
                    etiquettes: true,
                },
            })

            this.logger.info(
                this.serviceName,
                methodName,
                `add etiquetteId : ${etiquetteId} to tacheId : ${tacheId}`
            )

            return addEtiquette
        } catch (error) {
            this.logger.error(this.serviceName, methodName, `Message : ${error}`)
            throw error
        } finally {
            this.logger.debug(this.serviceName, methodName, 'End')
        }
    }

    async removeEtiquetteFromTache(tacheId: number, etiquetteId: number): Promise<ITodo> {
        const methodName = 'removeEtiquetteFromTache'
        try {
            this.logger.debug(this.serviceName, methodName, 'Start')

            const removeEtiquette = await this.db.tache.update({
            where: { id: tacheId },
            data: {
                etiquettes: { disconnect: { id: etiquetteId } },
            },
            include: {
                liste: true,
                etiquettes: true
            }})

            this.logger.info(this.serviceName, methodName, `remove etiquetteId : ${etiquetteId} to tacheId : ${tacheId}`)
            return removeEtiquette
        } catch (error) {
            this.logger.error(this.serviceName, methodName, `Message : ${error}`)
            throw error
        } finally {
            this.logger.debug(this.serviceName, methodName, 'End')
        }
    }

    async clearTodo(): Promise<void> {
        const methodName = 'clearTodo'
        try {
            this.logger.debug(this.serviceName, methodName, 'Start')

            await this.db.tache.deleteMany({})

            this.logger.info(this.serviceName, methodName, 'Clear all task to Todo')
        } catch (error) {
            this.logger.error(this.serviceName, methodName, `Message : ${error}`)
            throw error
        } finally {
            this.logger.debug(this.serviceName, methodName, 'End')
        }
    }
}

export default TodoRepository

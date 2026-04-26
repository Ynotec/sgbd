import ITodo from "../interfaces/ITodo.js"
import TodoRepository from "../repositories/TodoRepository.js"
import { LoggerService } from "./LoggerService.js"

class TodoService {
    private static instance : TodoService
    private todoRepository : TodoRepository

    private get logger(): LoggerService {
        return LoggerService.getInstance()
    }
    private serviceName = 'TodoService'

    constructor() {
        this.todoRepository = TodoRepository.getInstance()
    }

    static getInstance() {
        if (!TodoService.instance) {
            TodoService.instance = new TodoService()
        }
        return TodoService.instance
    }

    private isValidName(titre: string): boolean {
        const methodName = 'isValidName'
        try {
            this.logger.debug(this.serviceName, methodName, 'Start')

            if (titre && titre.trim() !== '') {
                return true
            } else {
                this.logger.info(this.serviceName, methodName, `Title is not valid`)
                return false
            }
        } catch (error) {
            this.logger.error(this.serviceName, methodName, `Message : ${error}`)
            throw error
        } finally {
            this.logger.debug(this.serviceName, methodName, 'End')
        }
    }

    async getAll(): Promise<ITodo[]> {
        const methodName = 'getAll'
        try {
            this.logger.debug(this.serviceName, methodName, 'Start')

            const todo = await this.todoRepository.getTodo()

            this.logger.info(this.serviceName, methodName, `Task count : ${todo.length}`)
            return todo
        } catch (error) {
            this.logger.error(this.serviceName, methodName, `Message : ${error}`)
            throw error
        } finally {
            this.logger.debug(this.serviceName, methodName, 'End')
        }
    }

    async getById(id: number): Promise<ITodo | null> {
        const methodName = 'getById'
        try {
            this.logger.debug(this.serviceName, methodName, 'Start')

            const todo = await this.todoRepository.getTodoById(id)

            this.logger.info(this.serviceName, methodName, `Getting task id : ${id}`)
            return todo
        } catch (error) {
            this.logger.error(this.serviceName, methodName, `Message : ${error}`)
            throw error
        } finally {
            this.logger.debug(this.serviceName, methodName, 'End')
        }
    }

    async add(name: string, listeId: number = 1, dateEcheance: string | null): Promise<ITodo | null> {
        const methodName = 'add'
        try {
            this.logger.debug(this.serviceName, methodName, 'Start')

            if (!this.isValidName(name)) return null

            const todo = await this.todoRepository.addTask(name.trim(), listeId, dateEcheance)

            this.logger.info(this.serviceName, methodName, `Task created with id : ${todo.id}, title : ${todo.titre} with date : ${todo.date_echeance}`)
            return todo
        } catch (error) {
            this.logger.error(this.serviceName, methodName, `Message : ${error}`)
            throw error
        } finally {
            this.logger.debug(this.serviceName, methodName, 'End')
        }
    }

    async edit(
        id: number,
        data: {
            titre?: string
            description?: string
            statut?: string
        }
    ): Promise<ITodo | null> {
        const methodName = 'edit'
        try {
            this.logger.debug(this.serviceName, methodName, 'Start')

            if (data.titre) {
                if (!id || !this.isValidName(data.titre)) return null
            }

            const todo = await this.todoRepository.editTask(id, data)

            this.logger.info(this.serviceName, methodName, `Task updated with id : ${todo.id}`)
            return todo
        } catch (error) {
            this.logger.error(this.serviceName, methodName, `Message : ${error}`)
            throw error
        } finally {
            this.logger.debug(this.serviceName, methodName, 'End')
        }
    }

    async delete(id: number): Promise<ITodo> {
        const methodName = 'delete'
        try {
            this.logger.debug(this.serviceName, methodName, 'Start')

            const todo = await this.todoRepository.removeTask(id)

            this.logger.info(this.serviceName, methodName, `Task deleted with id : ${id}`)
            return todo
        } catch (error) {
            this.logger.error(this.serviceName, methodName, `Message : ${error}`)
            throw error
        } finally {
            this.logger.debug(this.serviceName, methodName, 'End')
        }
    }

    async doneTask(id: number, done: boolean): Promise<ITodo> {
        const methodName = 'doneTask'
        try {
            this.logger.debug(this.serviceName, methodName, 'Start')

            const todo = await this.todoRepository.setDoneTask(id, done ? 'terminé' : 'à faire')

            this.logger.info(this.serviceName, methodName, `Task id : ${id} set to : ${todo.statut}`)
            return todo
        } catch (error) {
            this.logger.error(this.serviceName, methodName, `Message : ${error}`)
            throw error
        } finally {
            this.logger.debug(this.serviceName, methodName, 'End')
        }
    }

    async addEtiquette(tacheId: number, etiquetteId: number): Promise<ITodo> {
        const methodName = 'addEtiquette'
        try {
            this.logger.debug(this.serviceName, methodName, 'Start')

            const todo = await this.todoRepository.addEtiquetteToTache(tacheId, etiquetteId)

            this.logger.info(this.serviceName, methodName, `add etiquetteId : ${etiquetteId} to tacheId : ${tacheId}`)
            return todo
        } catch (error) {
            this.logger.error(this.serviceName, methodName, `Message : ${error}`)
            throw error
        } finally {
            this.logger.debug(this.serviceName, methodName, 'End')
        }
    }

    async removeEtiquette(tacheId: number, etiquetteId: number): Promise<ITodo> {
        const methodName = 'removeEtiquette'
        try {
            this.logger.debug(this.serviceName, methodName, 'Start')

            const todo = await this.todoRepository.removeEtiquetteFromTache(tacheId, etiquetteId)

            this.logger.info(this.serviceName, methodName, `remove etiquetteId : ${etiquetteId} from tacheId : ${tacheId}`)
            return todo
        } catch (error) {
            this.logger.error(this.serviceName, methodName, `Message : ${error}`)
            throw error
        } finally {
            this.logger.debug(this.serviceName, methodName, 'End')
        }
    }

    async clear(): Promise<void> {
        const methodName = 'clear'
        try {
            this.logger.debug(this.serviceName, methodName, 'Start')

            await this.todoRepository.clearTodo()

            this.logger.info(this.serviceName, methodName, 'All tasks cleared')
        } catch (error) {
            this.logger.error(this.serviceName, methodName, `Message : ${error}`)
            throw error
        } finally {
            this.logger.debug(this.serviceName, methodName, 'End')
        }
    }


}

export default TodoService

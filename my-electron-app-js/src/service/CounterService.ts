import CounterRepository from "../repositories/CounterRepository.js"

class CounterService {
    private static instance : CounterService
    private counterRepo : CounterRepository

    private constructor() {
        this.counterRepo = CounterRepository.getInstance()
    }

    static getInstance() {
        if (!CounterService.instance) {
            CounterService.instance = new CounterService()
        }
        return CounterService.instance
    }

    add() {
        return { counter: this.counterRepo.add() }
    }

    removeCount() {
        return { counter: this.counterRepo.remove() }
    }

    resetCount() {
        return { counter: this.counterRepo.reset() }
    }

    getCount() {
        return { counter: this.counterRepo.getCounter() }
    }
}

export default CounterService
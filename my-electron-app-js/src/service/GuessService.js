class GuessService {
    static #instance = null

    minSecret = 1
    maxSecret = 100
    secret = Math.floor(Math.random() * this.maxSecret) + this.minSecret

    maxLife = 5
    life = this.maxLife

    static getInstance() {
        if (!GuessService.#instance) {
            GuessService.#instance = new GuessService()
        }
        return GuessService.#instance
    }

    setMinMaxSecret(min, max) {
        this.minSecret = min
        this.maxSecret = max
    }

    setMaxLife(max) {
        this.maxLife = max
    }

    reset() {
        this.life = this.maxLife
        this.isGameOver = false
        this.secret = Math.floor(Math.random() * this.maxSecret) + this.minSecret
    }

    check(number) {
        if (number > this.maxSecret || number < this.minSecret) {
            return { status: 'invalid', minSecret: this.minSecret, maxSecret: this.maxSecret }
        }
        if (this.life > 0) {
            if (number === this.secret) {
                return { status: 'win', secret: this.secret, life: this.life }
            } else if (number < this.secret) {
                --this.life
                return { status: 'higher', life: this.life }
            } else {
                --this.life
                return { status: 'lower', life: this.life }
            }
        } else {
            return { status: 'gameover', secret: this.secret }
        }
    }
}

export default GuessService

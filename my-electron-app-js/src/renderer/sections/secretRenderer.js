export function init() {
    let secret = Math.floor(Math.random() * 100) + 1
    const secretFeedback = document.getElementById('secret-feedback')
    let life = 5
    let gameFinish = false

    function updateFeedbackSecret(data, cssClass) {
        const line = document.createElement('p')
        line.textContent = data
        if (cssClass) line.classList.add('secret-feedback', cssClass)
        secretFeedback.appendChild(line)
    }

    function clearFeedBackSecret() {
        secretFeedback.innerHTML = ''
    }

    function setDisableButton(bool) {
        document.getElementById('secret-guess').disabled = bool
    }

    document.getElementById('secret-guess').addEventListener('click', async () => {
        const number = parseInt(document.getElementById('secret-input').value)

        if (!gameFinish) {
            const check = number === secret
            if (number > 100 || number <= 0) {
                updateFeedbackSecret('Le nombre doit être entre 1 et 100 attention !')
            }
            if (life > 0) {
                if (check) {
                    updateFeedbackSecret('Vous avez trouvé', 'win')
                    gameFinish = true
                    setDisableButton(true)
                } else if (number < secret) {
                    updateFeedbackSecret(`Plus grand ! : plus que ${life} essai`, 'low')
                    life--
                } else {
                    updateFeedbackSecret(`Plus petit ! : plus que ${life} essai`, 'high')
                    life--
                }
            } else {
                clearFeedBackSecret()
                updateFeedbackSecret(
                    'Tu as perdu!, la partie est finie, Continuer ? appuie sur Rejouer.'
                )
                gameFinish = true
                setDisableButton(true)
            }
        }
    })

    document.getElementById('secret-reset').addEventListener('click', async () => {
        clearFeedBackSecret()
        gameFinish = false
        life = 5
        secret = Math.floor(Math.random() * 100) + 1
        setDisableButton(false)
        document.getElementById('secret-input').value = ''
    })
}

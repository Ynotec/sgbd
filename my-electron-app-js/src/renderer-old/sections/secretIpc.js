export function init() {
    const secretFeedback = document.getElementById('secret-feedback-2')

    function clearFeedBackSecret() {
        secretFeedback.innerHTML = ''
    }

    function updateFeedbackSecret(data, cssClass) {
        const line = document.createElement('p')
        line.textContent = data
        if (cssClass) line.classList.add('secret-feedback-2', cssClass)
        secretFeedback.appendChild(line)
    }

    function setDisableButton(bool) {
        document.getElementById('secret-guess-2').disabled = bool
    }

    document.getElementById('secret-reset-2').addEventListener('click', async () => {
        window.guess.start()
        setDisableButton(false)
        clearFeedBackSecret()
    })

    document.getElementById('secret-guess-2').addEventListener('click', async () => {
        const data = document.getElementById('secret-input-2').value
        const number = parseInt(data)

        const result = await window.guess.check(number)

        switch (result.status) {
            case 'win':
                updateFeedbackSecret(
                    `Bravo, tu as trouvé le nombre ${result.secret} ! il te reste ${result.life} vie et le chiffre était ${result.secret}.`,
                    'win'
                )
                setDisableButton(true)
                break
            case 'lower':
                updateFeedbackSecret(`Plus petit ! il te reste ${result.life} vie..`, 'low')
                break
            case 'higher':
                updateFeedbackSecret(
                    `
                    Plus grand ! il te reste ${result.life} vie..`,
                    'high'
                )
                break
            case 'invalid':
                updateFeedbackSecret(
                    `Le nombre doit être compris entre ${result.minSecret} et ${result.maxSecret}.`,
                    'high'
                )
                break
            case 'gameover':
                clearFeedBackSecret()
                setDisableButton(true)
                updateFeedbackSecret(
                    `Tu n'as plus de vie.. le nombre secret était ${result.secret}, tu veux rejouer ?`,
                    'high'
                )
                break
            default:
                updateFeedbackSecret(`Tu veux tenter ta chance ?`)
        }
    })
}

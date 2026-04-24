export async function init() {
    const saved = await window.settings.get()
    const secretHint = document.getElementById('secret-hint-2')
    const feedback = document.getElementById('secret-feedback-2')

    document.getElementById('settings-player-name').value = saved.playerName
    document.getElementById('settings-min-secret').value = saved.minSecret
    document.getElementById('settings-max-secret').value = saved.maxSecret
    document.getElementById('settings-max-life').value = saved.maxLife

    function updateSecretHint(playerName, minSecret, maxSecret, maxLife) {
        secretHint.textContent = `Bonjour ${playerName}, devine le nombre entre ${minSecret} et ${maxSecret}, tu commences avec ${maxLife}`
    }

    document.getElementById('settings-save').addEventListener('click', async () => {
        const playerName = document.getElementById('settings-player-name').value.trim()
        const minSecret = parseInt(document.getElementById('settings-min-secret').value)
        const maxSecret = parseInt(document.getElementById('settings-max-secret').value)
        const maxLife = parseInt(document.getElementById('settings-max-life').value)

        if (minSecret >= maxSecret) {
            showFeedback('Le min doit être inférieur au max.', 'error')
            return
        }
        if (maxLife < 1) {
            showFeedback('Le nombre de vies doit être au moins 1.', 'error')
            return
        }

        await window.settings.save({ playerName, minSecret, maxSecret, maxLife })
        updateSecretHint(playerName, minSecret, maxSecret, maxLife)
        window.guess.start()
        feedback.textContent = ''
        showFeedback('Paramètres sauvegardés !', 'success')
    })
}

function showFeedback(message, type) {
    const el = document.getElementById('settings-feedback')
    el.textContent = message
    el.className = 'settings-feedback ' + type
    setTimeout(() => {
        el.textContent = ''
        el.className = 'settings-feedback'
    }, 3000)
}

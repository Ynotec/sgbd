export function init() {
    document.getElementById('profile-search').addEventListener('click', async () => {
        const playerName = document.getElementById('profile-input').value.trim()

        if (!playerName) return

        const data = await window.score.getPlayer(playerName)

        document.getElementById('profile-name').textContent = playerName
        document.getElementById('profile-wins').textContent = data.wins
        document.getElementById('profile-losses').textContent = data.losses
        document.getElementById('profile-total').textContent = data.wins + data.losses

        const list = document.getElementById('profile-history-list')
        list.innerHTML = ''
        ;[...data.games].reverse().forEach(game => {
            const li = document.createElement('li')
            li.className = 'profile-history-item ' + game.status
            const date = new Date(game.date).toLocaleString('fr-FR')
            li.textContent = `${game.status === 'win' ? 'Victoire' : 'Défaite'} — ${date}`
            list.appendChild(li)
        })

        document.getElementById('profile-result').classList.remove('hidden')
    })
}

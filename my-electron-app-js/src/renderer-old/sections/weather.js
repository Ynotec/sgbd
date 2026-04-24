export function init() {
    const feedback = document.getElementById('meteo-feedback')

    document.getElementById('meteo-refresh').addEventListener('click', async () => {
        const ville = document.getElementById('meteo-input').value
        feedback.innerHTML = await window.meteo.get(ville)
    })

    document.getElementById('meteo-geolocate').addEventListener('click', () => {
        
        window.navigator.geolocation.getCurrentPosition(
            async position => {
                const { latitude, longitude } = position.coords
                feedback.innerHTML = await window.meteo.geolocation(latitude, longitude)
            },
            error => {
                console.error('Géolocalisation échouée :', error.code, error.message)
                feedback.textContent = 'Impossible de récupérer la position.'
            }
        )
    })
}

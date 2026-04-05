class MeteoApiService {
    static #instance = null

    static getInstance() {
        if (!MeteoApiService.#instance) {
            MeteoApiService.#instance = new MeteoApiService()
        }
        return MeteoApiService.#instance
    }

    async getGeolocationByCity(ville) {
        const geo = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(ville)}&count=1&language=fr`
        )
        const geoData = await geo.json()
        if (!geoData.results?.length) {
            return `Ville introuvable : ${ville}`
        }

        const { latitude, longitude } = geoData.results[0]
        return await MeteoApiService.getInstance().getMeteo(latitude, longitude)
    }

    async getMeteo(latitude, longitude) {
        const meteo = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
        )
        const meteoData = await meteo.json()

        return await this.displayInfoCity(meteoData.current_weather, latitude, longitude)
    }

    async getCityByCoords(latitude, longitude) {
        const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
            { headers: { 'Accept-Language': 'fr', 'User-Agent': 'sgbd-electron-app/1.0' } }
        )
        const data = await res.json()
        return data.address.city ?? data.address.town ?? data.address.village
    }

    async displayInfoCity(data, latitude = null, longitude = null) {
        const villeData = await this.getCityByCoords(latitude, longitude)

        if (data.temperature) {
            return `
        Ville : ${villeData}<br>
        Température : ${data.temperature} °C<br>
        Vent : ${data.windspeed} km/h<br>
        Direction : ${data.winddirection}°<br>
        Horloge : ${new Date(data.time).toString()}<br>
      `
        } else {
            return 'Ville introuvable'
        }
    }
}

export default MeteoApiService

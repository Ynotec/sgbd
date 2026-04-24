export function init() {
    const countEl = document.getElementById('count')

    function updateDisplay(value) {
        countEl.textContent = value

        countEl.classList.remove('positive', 'negative', 'zero')
        if (value > 0) countEl.classList.add('positive')
        else if (value < 0) countEl.classList.add('negative')
        else countEl.classList.add('zero')

        countEl.classList.remove('bump')
        void countEl.offsetWidth
        countEl.classList.add('bump')
        setTimeout(() => countEl.classList.remove('bump'), 150)
    }

    document.getElementById('add').addEventListener('click', async () => {
        const value = await window.counter.add()
        updateDisplay(value)
    })

    document.getElementById('remove').addEventListener('click', async () => {
        const value = await window.counter.remove()
        updateDisplay(value)
    })

    document.getElementById('clear').addEventListener('click', async () => {
        const value = await window.counter.clear()
        updateDisplay(value)
    })
}

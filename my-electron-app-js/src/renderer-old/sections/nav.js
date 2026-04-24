export function init() {
    const menuItems = document.querySelectorAll('.menu-item')
    const sections = document.querySelectorAll('.section')

    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            menuItems.forEach(i => i.classList.remove('active'))
            sections.forEach(s => s.classList.remove('active'))

            item.classList.add('active')
            document.getElementById('section-' + item.dataset.target).classList.add('active')
        })
    })
}

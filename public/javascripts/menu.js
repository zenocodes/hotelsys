let btns = document.querySelectorAll('.btn')
let items = document.querySelectorAll('.item')


btns.forEach(btn => {
    btn.addEventListener('click', () => {
        let id = btn.textContent.toLowerCase().trim().replace(' ', '-') 
        let item = document.querySelector(`#${id}`)

        items.forEach(item => item.style.display = 'none')
        item.style.display = 'flex'
    })
})
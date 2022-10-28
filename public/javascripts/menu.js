let btns = document.querySelectorAll('.btn')
let items = document.querySelectorAll('.item')
let orderList = document.querySelector('#order-list')
let menus = document.querySelectorAll('.menu')


btns.forEach(btn => {
    btn.addEventListener('click', () => {
        let id = btn.textContent.toLowerCase().trim().replace(' ', '-') 
        let item = document.querySelector(`#${id}`)

        items.forEach(item => item.style.display = 'none')
        item.style.display = 'flex'
    })
})

menus.forEach(menu => {
    menu.addEventListener('click', () => {
        let li = document.createElement('li')
        let itemName = menu.children[1].textContent
        let itemPrice = menu.lastElementChild.textContent.split('KES ')[1]
        li.innerHTML = `${itemName} - <span>${itemPrice}</span>`
        orderList.appendChild(li)
    })
})
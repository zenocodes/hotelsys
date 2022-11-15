let btns = document.querySelectorAll('.btn')
let items = document.querySelectorAll('.item')
let orderList = document.querySelector('#order-list')
let menus = document.querySelectorAll('.menu')
let amount = document.querySelector('#amount')

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
        li.innerHTML = `${itemName} : <span class="price">${itemPrice}</span>`
        let img = document.createElement('img')
        img.src = '/images/remove.png'
        img.style.marginLeft = '7px'
        img.addEventListener('click', removeItem)
        li.appendChild(img)
        orderList.appendChild(li)
        checkOrderList()
    })
})

// remove item from list
const removeItem = (e) => {
    let item = e.target.parentElement
    orderList.removeChild(item)
    checkOrderList()
}


// show amount & make order button iff orderlist has items
const checkOrderList = () => {
    if (orderList.children.length === 0) {
        orderList.nextElementSibling.style.display = 'none'
    } else {
        orderList.nextElementSibling.style.display = 'block'
        let total = 0
        let prices = document.querySelectorAll('.price')
        prices.forEach(price => total += parseInt(price.textContent))
        amount.textContent = `Total: KES ${total}`
        let itemList = document.querySelector('input[name="items"]')
        let items = []
        for (const li of orderList.children) {
            items.push(li.firstChild.data.toString().split(' : ')[0])
        }
        itemList.value = items
        let amountHidden = document.querySelector('input[name="amount"]')
        amountHidden.value = total
    }
    
}

checkOrderList()
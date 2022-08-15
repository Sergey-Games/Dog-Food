export const cart = () => {

    const cartButton = document.getElementById('cart-button');

    const modalCart = document.querySelector('.modal-cart'),
          close = modalCart.querySelector('.close'),
          body = modalCart.querySelector('.modal-body'),
          buttenSend = modalCart.querySelector('.button-primary');

    const resetCart = () => {
        body.innerHTML = ''
        localStorage.removeItem('cart')
        modalCart.classList.remove('is-open')
    }

    const incCount = (id) => {
        const cartArray = JSON.parse(localStorage.getItem('cart'))

        cartArray.map((item) => {
            if (item.id === id) {
                item.count++
            }

            return item
        })
        
        localStorage.setItem('cart', JSON.stringify(cartArray))
        renderItems(cartArray)
    }

    const decCount = (id) => {
        const cartArray = JSON.parse(localStorage.getItem('cart'))

        cartArray.map((item) => {
            if (item.id === id) {
                item.count = item.count > 0 ? item.count - 1 : 0 
            }

            return item
        })
        
        localStorage.setItem('cart', JSON.stringify(cartArray))
        renderItems(cartArray)
    }

    const renderItems = (data) => {
        body.innerHTML = '';

        data.forEach(({ name, price, id, count }) => {
            const cartDiv = document.createElement('div')
            cartDiv.classList.add('food-row')

            cartDiv.innerHTML = `
                <span class="food-name">${name}</span>
				<strong class="food-price">${price} ₽</strong>
				<div class="food-counter">
					<button class="counter-button btn-dec" data-index="${id}">-</button>
					<span class="counter">${count}</span>
					<button class="counter-button btn-inc" data-index="${id}">+</button>
				</div>
            `

            body.append(cartDiv)
        });
    }

    body.addEventListener('click', (event) => {
        event.preventDefault()

        if (event.target.classList.contains('btn-inc')) {
            incCount(event.target.dataset.index)
        } else if (event.target.classList.contains('btn-dec')) {
            decCount(event.target.dataset.index)
        }
    })

    buttenSend.addEventListener('click', () => {
        const cartArray = localStorage.getItem('cart')

        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: cartArray
        })
        .then(response => {
            if (response.ok) {
                resetCart()
            }
        })
        .catch(event => console.error(event))
    })

    cartButton.addEventListener('click', () => {
        if (localStorage.getItem('cart')) {
            renderItems(JSON.parse(localStorage.getItem('cart')))
        }

        modalCart.classList.add('is-open')
    });

    close.addEventListener('click', () => {
        modalCart.classList.remove('is-open')
    });



}
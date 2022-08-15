export const menu = () => {
    const cardMenu = document.querySelector('.cards-menu')

    const cartArray = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []

    const changeTitle = (restaurant) => {
        const title = document.querySelector('.restaurant-title'),
            rating = document.querySelector('.rating'),
            cost = document.querySelector('.price'),
            category = document.querySelector('.category');

        const { name, stars, price, kitchen } = restaurant

        title.textContent = name   
        rating.textContent = stars
        cost.textContent = `От ${price} ₽`
        category.textContent = kitchen
    }

    const addToCard = (cartItem) => {
        if (cartArray.some(item => item.id === cartItem.id)) {
            cartArray.map((item) => {
                if (item.id === cartItem.id) {
                    item.count++
                }
                
                return item
            })
        } else {
            cartArray.push(cartItem)
        }

        localStorage.setItem('cart', JSON.stringify(cartArray))
    }

    const renderItems = (data) => {
        data.forEach(({ id, name, description, price, image }) => {
            const card = document.createElement('div')
            card.classList.add('card')

            card.innerHTML = `
                <img src="${image}" alt="image" class="card-image" />
                <div class="card-text">
                    <div class="card-heading">
                        <h3 class="card-title card-title-reg">${name}</h3>
                    </div>
                    <div class="card-info">
                        <div class="ingredients">${description}</div>
                    </div>
                    <div class="card-buttons">
                        <button class="button button-primary button-add-cart">
                            <span class="button-card-text">В корзину</span>
                            <span class="button-cart-svg"></span>
                        </button>
                        <strong class="card-price-bold">${price} ₽</strong>
                    </div>
                </div>
            `

            card.querySelector('.button-card-text').addEventListener('click', () => {
                const cartItem = { name, price, count: 1, id }
                addToCard(cartItem)
            });
            
            cardMenu.append(card)
        });
    }

    if (localStorage.getItem('restaurant')) {
        // fetch(`./db/${localStorage.getItem('restaurant')}`)
        const link = JSON.parse(localStorage.getItem('restaurant'))

        changeTitle(link)

        fetch(`./db/${link.products}`)
        .then(response => response.json())
        .then(data => renderItems(data))
        .catch(error => console.error(error))
    } else {
        window.location.href = './index.html'
    }


}
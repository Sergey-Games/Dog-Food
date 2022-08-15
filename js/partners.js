export const partners = () => {
    const cardsRestaurants = document.querySelector('.cards-restaurants');

    const renderItems = (data) => {
        data.forEach((item) => {
            const { products, image, name, time_of_delivery, stars, price, kitchen } = item
            const restaurant = document.createElement('a')

            restaurant.setAttribute('href', 'restaurant.html')
            restaurant.classList.add('card', 'card-restaurant')

            restaurant.dataset.products = products

            restaurant.innerHTML = `
                <img src="${image}" alt="image" class="card-image" />
                <div class="card-text">
                    <div class="card-heading">
                        <h3 class="card-title">${name}</h3>
                        <span class="card-tag tag">${time_of_delivery} мин</span>
                    </div>
                    <div class="card-info">
                        <div class="rating">${stars}</div>
                        <div class="price">От ${price} ₽</div>
                        <div class="category">${kitchen}</div>
                    </div>
                </div>
            `

            restaurant.addEventListener('click', (event) => {
                event.preventDefault()

                localStorage.setItem('restaurant', JSON.stringify(item))

                window.location.href = 'restaurant.html'
            })

            cardsRestaurants.append(restaurant)
        });
    }

    fetch('./db/partners.json')
        .then(response => response.json())
        .then(data => renderItems(data))
        .catch(error => console.error(error))

}

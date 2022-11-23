const items = document.getElementById('zapatillas')
const templateCard = document.getElementById('cartas').content
const fragment = document.createDocumentFragment();
let bag = {}

document.addEventListener('DOMContentLoaded', () => {
    fetchdata()
})

items.addEventListener('click', e => {
    addBag(e)
})

const fetchdata = async () => {
    try {
        const res = await fetch('data.json')
        const data = await res.json()
        drawProduct(data)
    } catch (error) {
        console.log(error)
    }
}

const drawProduct = data => {
    data.forEach(producto => {
        templateCard.querySelector('h2').textContent = producto.nombre
        templateCard.querySelector('h3').textContent = producto.genero
        templateCard.querySelector('h4').textContent = producto.color
        templateCard.querySelector('p').textContent = producto.precio
        templateCard.querySelector('img').setAttribute("src", producto.imagen)
        templateCard.querySelector('.cart-modal__Checkout').dataset.id = producto.id




        const clone = templateCard.cloneNode(true)
        fragment.appendChild(clone)
    });
    items.appendChild(fragment)
}


const addBag = e => {

    if (e.target.classList.contains('cart-modal__Checkout')) {
        setBag(e.target.parentElement)
    }
}

let cartNotification = document.querySelector(".header__cart--notification");
let lastValue = parseInt(cartNotification.innerText);

const setBag = objeto => {
    const producto = {
        id: objeto.querySelector('.cart-modal__Checkout').dataset.id,
        nombre: objeto.querySelector('h2').textContent,
        precio: objeto.querySelector('p').textContent,
        cantidad: 1

    }
    if (bag.hasOwnProperty(producto.id)) {
        producto.cantidad = bag[producto.id].cantidad + 1
        
    }

    bag[producto.id] = { ...producto }
    console.log(bag)
}


/* MODAL CARRITO */






/* * MENU HAMBURGESA */

function menuHamburgesa() {
    let menuIcon = document.querySelector(".header__menu");
    let closeIcon = document.querySelector(".modal-navbar__close-icon");
    let modalNavbar = document.querySelector(".modal-navbar__background");

    menuIcon.addEventListener("click", () => {
        modalNavbar.style.display = "block";
    });

    closeIcon.addEventListener("click", () => {
        modalNavbar.style.display = "none";
    });
}

menuHamburgesa();

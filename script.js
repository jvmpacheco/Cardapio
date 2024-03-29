const menuItems = [
  {
    id: 1,
    title: "X-burguer",
    description: "Delicioso hambúrguer com queijo e molho especial.",
    price: "R$ 15,90",
    image: "x-burguer.jpg",
  },
  {
    id: 2,
    title: "Anéis de Cebola",
    description: "Porção de anéis de cebola. Serve 1 pessoa.",
    price: "R$ 16,50",
    image: "aneis de cebola.jpg",
  },
  {
    id: 3,
    title: "Batata Frita",
    description: "Porção de batata frita. Serve 1 pessoa.",
    price: "R$ 12,90",
    image: "batata frita.jpg",
  },
  {
    id: 4,
    title: "Lanche 4",
    description: "Descrição aqui...",
    price: "R$ 17,00",
    image: "sua foto aqui.jpg",
  },
  {
    id: 5,
    title: "Lanche 5",
    description: "Descrição aqui...",
    price: "R$ 23,00",
    image: "sua foto aqui.jpg",
  },
  {
    id: 6,
    title: "Lanche 6",
    description: "Descrição aqui...",
    price: "R$ 25,90",
    image: "sua foto aqui.jpg",
  },
  {
    id: 7,
    title: "Lanche 7",
    description: "Descrição aqui...",
    price: "R$ 27,50",
    image: "sua foto aqui.jpg",
  },
  {
    id: 8,
    title: "Lanche 8",
    description: "Descrição aqui...",
    price: "R$ 29,90",
    image: "sua foto aqui.jpg",
  },
  // Adicione mais itens conforme necessário
]

const cart = []

function addToCart(itemId) {
  const item = menuItems.find((item) => item.id === itemId)
  cart.push(item)
  alert(`${item.title} adicionado ao carrinho!`)
  updateCartView()
}

function viewCart() {
  const cartView = document.getElementById("cart-view")
  cartView.style.display = "block"
}

function updateCartView() {
  const cartItemsContainer = document.getElementById("cart-items")
  cartItemsContainer.innerHTML = "" // Clear the cart view
  cart.forEach((item) => {
    const cartItem = document.createElement("div")
    cartItem.className = "cart-item"
    cartItem.innerHTML = `
      <img src="${item.image}" alt="${item.title}" style="width:50px; height:auto;">
      <span>${item.title}</span> - <span>${item.price}</span>
    `
    // Adicionando um botão para remover itens do carrinho
    const removeButton = document.createElement("button")
    removeButton.innerText = "X"
    removeButton.onclick = () => removeFromCart(item.id)
    cartItem.appendChild(removeButton)
    cartItemsContainer.appendChild(cartItem)
  })
  updateTotal()
}

// Função para remover itens do carrinho
function removeFromCart(itemId) {
  const itemIndex = cart.findIndex((item) => item.id === itemId);
  if(itemIndex > -1) {
    cart.splice(itemIndex, 1);
  }
  updateCartView();
}

function updateTotal() {
  const cartTotal = cart.reduce((total, item) => {
    const priceNumber = parseFloat(
      item.price.replace("R$ ", "").replace(",", ".")
    )
    return total + priceNumber
  }, 0)
  const formattedTotal = `R$ ${cartTotal.toFixed(2)}`.replace(".", ",")
  document.getElementById("cart-total").textContent = formattedTotal
}

function finishOrder() {
  let message = "Olá, gostaria de pedir os seguintes itens:\n"
  cart.forEach((item, index) => {
    message += `${index + 1}. ${item.title} - ${item.price}\n`
  })
  message += `\nTotal: ${document.getElementById("cart-total").textContent}`
  // Replace 'SEUNUMEROWHATSAPP' with your WhatsApp number
  const whatsappURL = `https://wa.me/+5521973058890?text=${encodeURIComponent(
    message
  )}`
  window.open(whatsappURL, "_blank")
}

function createMenuItem(item) {
  const div = document.createElement("div")
  div.className = "menu-item"
  div.innerHTML = `<img src="${item.image}" alt="${item.title}">
     <h3>${item.title}</h3>
     <p>${item.description}</p>
     <p>Preço: ${item.price}</p>
     <button onclick="addToCart(${item.id})">Adicionar ao Carrinho</button>`
  return div
}

function renderMenu() {
  const menu = document.getElementById("menu")
  menuItems.forEach((item) => {
    const menuItemElement = createMenuItem(item)
    menu.appendChild(menuItemElement)
  })
}

function searchItems() {
  const searchInput = document.getElementById("search-input")
  const filter = searchInput.value.toLowerCase()
  const menuItemsContainer = document.getElementById("menu")
  const menuItemElements =
    menuItemsContainer.getElementsByClassName("menu-item")

  for (let i = 0; i < menuItemElements.length; i++) {
    const titleElement = menuItemElements[i].getElementsByTagName("h3")[0]
    const descriptionElement = menuItemElements[i].getElementsByTagName("p")[0]
    const titleText = titleElement.textContent || titleElement.innerText
    const descriptionText =
      descriptionElement.textContent || descriptionElement.innerText

    if (
      titleText.toLowerCase().indexOf(filter) > -1 ||
      descriptionText.toLowerCase().indexOf(filter) > -1
    ) {
      menuItemElements[i].style.display = ""
    } else {
      menuItemElements[i].style.display = "none"
    }
  }
}

function closeCart() {
  const cartView = document.getElementById("cart-view")
  cartView.style.display = "none"
}

document.getElementById("close-cart").addEventListener("click", closeCart)

document.getElementById("finish-order").addEventListener("click", finishOrder)
document.getElementById("view-cart").addEventListener("click", viewCart)

renderMenu()

const fetchData = async () => {
  const res = await fetch("https://fakestoreapi.com/products");
  const data = await res.json();
  return data;
};

let cartItems = [];

const productContainer = document.querySelector(".productList");
const cartContainer = document.querySelector(".cartContainer");
const cartBtn = document.querySelector(".cartToggler");
const cart = document.querySelector(".cart");
const cartItemCount = document.querySelector(".cartToggler span");

cartBtn.addEventListener(
  "click",
  (e) => {
    e.stopPropagation();
    if (cart.contains(cartContainer)) {
      cart.removeChild(cartContainer);
    } else {
      cart.appendChild(cartContainer);
    }
  },
  false
);

document.addEventListener(
  "click",
  (e) => {
    e.stopPropagation();
    if (
      cart.contains(cartContainer) &&
      !e.target.classList.contains(".cartToggler")
    ) {
      cart.removeChild(cartContainer);
    }
  },
  false
);

const createProductCard = (data) => {
  const { id, title, price, image, description } = data;

  const product = document.createElement("div");
  const img = document.createElement("img");
  const desc = document.createElement("p");
  const name = document.createElement("h3");
  const textContainer = document.createElement("div");
  const cena = document.createElement("h2");
  const btn = document.createElement("button");
  btn.id = `productBtn-${id}`;

  product.id = `product-${id}`;

  product.className = "product";
  img.src = image;
  btn.textContent = "Add to cart";

  btn.onclick = (e) => {
    addToCart(e, data);
  };

  desc.textContent = description;
  name.textContent = title;
  cena.textContent = price;

  textContainer.append(name, desc, cena);
  product.append(img, textContainer, btn);
  return product;
};

const createCartItem = (d) => {
  const { image, title, description, id } = d;
  return `<li class="cartItem" id="${id}">
            <img src="${image}" alt="${title}">
            <div class="cartItem-text">
                <h4>${title}</h4>
                <p>${description}</p>
            </div>
            <button onClick="removeCartItem(this)">&times;</button>
        </li>`;
};    

const removeCartItem = (e) => {
  const parent = e.parentElement.id;
  cartItems = cartItems.filter((ci) => ci.id !== Number(parent));
  document.querySelector(`#productBtn-${parent}`).classList.remove("active");
  rerenDerCart();
};

const rerenDerCart = () => {
  cartContainer.innerHTML = "";
  cartItemCount.textContent = cartItems.length;
  cartItems.forEach((cartItem) => {
    const newElem = createCartItem(cartItem);
    cartContainer.innerHTML += newElem;
  });
};

const addToCart = (e, product) => {
  const elemIndex = cartItems.find((d) => d.id === product.id);
  if (elemIndex === -1 || elemIndex === undefined) {
    e.target.classList.add("active");
    cartItems.push(product);
    rerenDerCart();
  }
};

async function renderProducts() {
  const products = await fetchData();
  products.forEach((prod) => {
    const newProduct = createProductCard(prod);
    productContainer.appendChild(newProduct);
  });
}

renderProducts();

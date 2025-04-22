const cardsContenaire = document.querySelector(".cards-contenaire");
const cartcontenaireListItem = document.querySelector(".cart-contenaire");
const listItems = document.querySelector(".list-items");
let Data = [];

async function fecthMeal() {
  try {
    const res = await fetch("data.json");
    if (!res.ok) {
      throw new Error(`Erreur HTTP: ${res.status} ${res.statusText}`);
    }
    Data = await res.json();
    displayFetch();
    ButtonInit();
    addGlobalListeners();
  } catch (error) {
    console.error("Erreur lors du chargement des données :", error);
  }
}

function displayFetch() {
  cardsContenaire.innerHTML = Data.map((data, index) => {
    return `
      <div class='cards-foods' id="${index}">
        <img src="${data.image.desktop}" class="imgItem" data-img="${index}">
        <div class="parent-btn">
          <button class="btn-add" data-btn="${index}">
            <div class="contenaire-icon">
              <img src="./assets/images/icon-add-to-cart.svg" class="icon-add-to-cart"/>
              <span>Add to Cart</span>
            </div>
          </button>
        </div>
        <div class="down-liste">
          <p>${data.category}</p>
          <b>${data.name}</b>
          <p class="price">${data.price}$</p>
        </div>
      </div>
    `;
  }).join("");
}
function ButtonInit() {
  cardsContenaire.addEventListener("click", (e) => {
    const btnAdd = e.target.closest(".btn-add");
    if (btnAdd) {
      const index = btnAdd.dataset.btn;
      const button = document.createElement("button");
      const Imgborder = document.querySelector(`.imgItem[data-img="${index}"]`);

      button.setAttribute("data-button", `${index}`);
      button.classList.add("btn-increment");

      button.innerHTML = `
        <div class="Elementbtn-increment">
          <div class="parent-icon" id="iconDecrementMoin" data-moin="moin">
            <img src="./assets/images/icon-decrement-quantity.svg" />
          </div>
          <span id="displaynumber">${Data[index].btnIncrement}</span>
          <div class="parent-icon plus" id="iconincrementPlus" data-plus="plus">
            <img src="./assets/images/icon-increment-quantity.svg" alt="" />
          </div>
        </div>
      `;

      btnAdd.parentNode.replaceChild(button, btnAdd);
      if (Imgborder) {
        Imgborder.style.border = "solid 3px hsl(16, 69%, 49%)";
      }

      addcard(index);
    }
  });
}

function addGlobalListeners() {
  cardsContenaire.addEventListener("click", (e) => {
    const btnPlus = e.target.closest(`[data-plus="plus"]`);
    const btnMoin = e.target.closest(`[data-moin="moin"]`);

    if (btnPlus || btnMoin) {
      const parent = (btnPlus || btnMoin).closest(".Elementbtn-increment");
      const index = getIndexFromElement(parent);

      if (index !== null) {
        if (btnPlus) {
          Data[index].btnIncrement++;
        } else if (btnMoin && Data[index].btnIncrement > 1) {
          Data[index].btnIncrement--;
        }

        const displayincrement = parent.querySelector("#displaynumber");
        if (displayincrement) {
          displayincrement.textContent = Data[index].btnIncrement;

          //  Mettre à jour le panier s’il existe
          const itemQty = document.querySelector(`#qty-${index}`);
          if (itemQty) {
            itemQty.textContent = Data[index].btnIncrement;
          }
        }
        const itemTotal = document.querySelector(`#total-${index}`);
        if (itemTotal) {
          const price = Data[index].price;
          const qty = Data[index].btnIncrement;
          itemTotal.textContent = `${(price * qty).toFixed(2)}$`;
        }
      }
    }
  });
}

function getIndexFromElement(el) {
  const parentBtn = el.closest(".btn-increment");
  if (parentBtn) {
    const index = parentBtn.getAttribute("data-button");
    return parseInt(index);
  }
  return null;
}
function addcard(btnaddValue) {
  const calculmeal = document.querySelector(".calcul-meal");

  // Empêche les doublons dans le panier
  if (document.querySelector(`#item-${btnaddValue}`)) return;

  const divChidlCalculmeal = document.createElement("div");
  divChidlCalculmeal.id = `item-${btnaddValue}`;

  const listItem = document.createElement("li");

  
  listItem.innerHTML = `
    <div class="meal-name">${Data[btnaddValue].name}</div>
    <span>x</span>
    <span id="qty-${btnaddValue}">${Data[btnaddValue].btnIncrement}</span> =
    <span class="meal-price">${Data[btnaddValue].price}$</span> x
    <span id="total-${btnaddValue}">${
    Data[btnaddValue].price * Data[btnaddValue].btnIncrement
  }$</span>
  `;

  divChidlCalculmeal.appendChild(listItem);
  calculmeal.appendChild(divChidlCalculmeal);
}

window.addEventListener("load", fecthMeal);

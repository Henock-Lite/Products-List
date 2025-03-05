const cardsContenaire = document.querySelector(".cards-contenaire");
const cartcontenaireListItem = document.querySelector(".cart-contenaire");
const listItems = document.querySelector(".list-items");
let Data;

async function fecthMeal() {
  try {
    const res = await fetch("data.json");

    if (!res.ok) {
      throw new Error(`Erreur HTTP: ${res.status} ${res.statusText}`);
    }

    Data = await res.json();
    displayFetch();
    ButtonInit();
    addcart();
  } catch (error) {
    console.error("Erreur lors du chargement des données :", error);
  }
}

function displayFetch() {
  cardsContenaire.innerHTML = Data.map((data, index) => {
    return `
  <div class= 'cards-foods' id=${index}>
    <img src= "${data.image.desktop}" class="imgItem" data-img=${index}>
  <div class= "parent-btn">
    <button class="btn-add" data-btn=${index}>
     <div class="contenaire-icon">
    <img src="./assets/images/icon-add-to-cart.svg"  class="icon-add-to-cart"/>
    <span>Add to Cart</span>
     </button>
    </div>
    <div class="down-liste" >
       <p>${data.category}</p>
       <b>${data.name}</b>
       <p class ="price">${data.price}$</p>
    </div>
  </div>
    
    `;
  }).join("");
}

function addcart(btnaddValue) {
  const AllFoodscards = document.querySelectorAll(".cards-foods");
  const cardOrder = document.querySelector(".card-order");
  const ParentlistItems = document.querySelector(".List-ItemsParent");
  const ListItem = document.createElement("li");
  const Listchild = ParentlistItems.appendChild(ListItem);
  const downliste = document.querySelector(".down-liste");

  AllFoodscards.forEach((cardsFoods, index) => {
    if (cardsFoods.id == btnaddValue) {
      Listchild.textContent = `${Data[index].name}`;
    }
  });
}

function ButtonInit() {
  let buttonInnerhtml = `
   <div class="Elementbtn-increment">
           <div class="parent-icon" id= "iconDecrementMoin" data-moin="moin">
             <img
                src="./assets/images/icon-decrement-quantity.svg"
              />
            </div>
              <span id ="displaynumber">1</span>
          <div class="parent-icon  plus" id="iconincrementPlus"  data-plus="plus">
             <img
           src="./assets/images/icon-increment-quantity.svg"
           alt=""
            />
          </div>
   </div>
              `;

  cardsContenaire.addEventListener("click", (e) => {
    if (e.target.closest(".btn-add")) {
      const btnAdd = e.target.closest(".btn-add");
      const index = btnAdd.dataset.btn;
      const button = document.createElement("button");
      const Imgborder = document.querySelector(`.imgItem[data-img="${index}"]`);

      button.setAttribute("data-button", `"${index}"`);
      button.innerHTML = buttonInnerhtml;
      button.classList.add("btn-increment");
      btnAdd.parentNode.replaceChild(button, btnAdd);
      if (Imgborder) {
        Imgborder.style.border = "solid 3px hsl(16, 69%, 49%)";
      }
      addcart(index);
    }
  });
  cardsContenaire.addEventListener("click", (e) => {
    if (e.target.closest(`[data-plus="plus"]`)) {
      const btnPlus = e.target.closest(`[data-plus="plus"]`);
      const parent = btnPlus.closest(".Elementbtn-increment");
      const displayincrement = parent.querySelector("#displaynumber");
      let increment = parseInt(displayincrement.textContent);
      increment++;
      displayincrement.textContent = `${increment}`;
    }

    if (e.target.closest(`[data-moin="moin"]`)) {
      const btnMoin = e.target.closest(`[data-moin="moin"]`);
      const parent = btnMoin.closest(".Elementbtn-increment");
      const displayincrement = parent.querySelector("#displaynumber");
      if (displayincrement.textContent != 1) {
        let decrementation = parseInt(displayincrement.textContent);
        decrementation--;
        displayincrement.textContent = `${decrementation}`;
      }
    }
  });
}

window.addEventListener("load", fecthMeal);

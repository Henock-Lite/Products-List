let cardsContenaire = document.querySelector(".cards-contenaire");

async function fecthMeal() {
  const res = await fetch("data.json");
  Data = await res.json();
  displayfecth();
  console.log(Data);
  ButtonInnit();
}

function displayfecth() {
  cardsContenaire.innerHTML = Data.map((data, index) => {
    return `
  <div class= 'cards-foods'>
    <img src= "${data.image.desktop}" class="imgItem" data-img=${index}>
  <div class= "parent-btn">
    <button class="btn-add" data-btn=${index}>
     <div class="contenaire-icon">
    <img src="./assets/images/icon-add-to-cart.svg"  class="icon-add-to-cart"/>
    <span>Add to Cart</span>
     </button>
    </div>
    <div class="down-liste">
       <p>${data.category}</p>
       <b>${data.name}</b>
       <p class ="price">${data.price}$</p>
    </div>
  </div>
    
    `;
  }).join("");
}

function ButtonInnit() {
  let buttonInnerhtml = `
  <div class="Elementbtn-increment">
        <div class="parent-icon" id= "icon-incrementMoin">
             <img
                src="./assets/images/icon-decrement-quantity.svg"
              />
          </div>
      <span>1</span>
       <div class="parent-icon" id="icon-incrementPlus">
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
      // console.log(index);
      
      let button = document.createElement("button");

      button.setAttribute("data-button", `"${index}"`);
      button.innerHTML = buttonInnerhtml;
      button.classList.add("btn-increment");
      btnAdd.parentNode.replaceChild(button, btnAdd);
      let Imgborder = document.querySelector(`.imgItem[data-img="${index}"]`);

      if (Imgborder) {
        Imgborder.style.border = "solid 3px hsl(16, 69%, 49%)";
      }
    }

    if (e.target.closest(".parent-icon")) {
      const IconBtnincre = e.target.closest(".parent-icon");

      // console.log(indexes);
      
      
      
    }
  });
}
window.addEventListener("load", fecthMeal);

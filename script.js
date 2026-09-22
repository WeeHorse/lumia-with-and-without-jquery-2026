// skapa dina event listerens och funktioner här


// när man skriver text i sökfältet kallar vi på funktionen "search"
document.querySelector('#search').addEventListener('keyup', search);

/*
  funktionen search
  - jämför texten i vår input med produktnamnen,
  och om den finns med så visar vi de matchande produkterna
*/
function search() {
  console.log('calling search');
  // Gömmer produkterna när man suddar ut det man skrivit
  document.querySelectorAll('.product').forEach(product => {
    product.style.display = 'none';
  });

  // lägger texten jag skriver (i sökfältet) i variabeln searchText (små bokstäver)
  let searchText = document.querySelector('#search').value.toLowerCase();

  // loop, går igenom alla produkter
  document.querySelectorAll('.product h2').forEach(function (heading) {
    // lägger texten ifrån varje produkt i variabeln product text
    let productText = heading.textContent.toLowerCase();

    // om söktexten finns och om produkttexten och söktexten matchar
    if (searchText && productText.indexOf(searchText) >= 0) {
      // letar vi upp <div class="product ..."> och visar den
      // (vi är på h2, första parent blir .content, dess parent blir .product)
      heading.parentElement.parentElement.style.display = '';
    }
  });
}


// när man klickar på "lägg till"-knappen kallar vi på funktionen "add"
document.querySelectorAll('.product button').forEach(button => {
  button.addEventListener('click', add);
});

// vi skapar den tomma arrayen (listan) items för att lägga produkter i varukorgen
let items = [];

/*
  funktionen add lägger till produkten, vars "lägg till"-knapp vi klickat på, i varukorgen
*/
function add() {
  console.log('calling add');
  // vi hämtar produktnamnet ifrån h2:an och lägger i minnet (variablen) productName
  let productName = this.parentElement.querySelector('h2').textContent;
  // vi hämtar priset ifrån en <span> inuti knappen, och lägger i minnet (variablen) productPrice
  let productPrice = this.querySelector('span').textContent;

  // om jag hittar produktnamnet i en produkt i varukorgslistan (items), lägger jag den i theItem
  let theItem = items.filter(item => item.name === productName);

  // om jag inte har hittat en produkt (theItem)
  if (!theItem[0]) {
    // lägger jag till produkten i varukorgslistan (items)
    items.push({ name: productName, price: productPrice, count: 1 });
    // om jag hittat produkten (theItem)
  } else {
    // ökar jag istället antalet
    theItem[0].count++;
  }

  // vi skapar variabel total för slutsumman (börjar på 0)
  let total = 0;
  // vi tömmer först listan på produkter i varukorgen ifrån DOM:en
  let cartList = document.querySelector('#cart ul');
  cartList.replaceChildren();

  //för varje produkt i varukorgen:
  for (let item of items) {
    // ökar vi på totalen med antal * pris
    total += (item.count * item.price);
    // och lägger till en rad i varukorgens DOM, med produktnamn, pris, antal och delsumma
    let row = document.createElement('li');
    row.innerHTML = `
      ${item.name}
      <span>(${item.price}kr,</span>
      <span>${item.count}st)</span>
      <span>${item.count * item.price}kr</span>
    `;
    cartList.append(row);
  }

  // slutligen lägger vi till sista raden i varukorgen för att visa slutsumman (total)
  let totalRow = document.createElement('li');
  totalRow.classList.add('total');
  totalRow.innerHTML = `Total <span>${total}kr</span>`;
  cartList.append(totalRow);
}


// när man klickar på en produktbild kallar vi på funktionen "toggle"
document.querySelectorAll('.product img').forEach(image => {
  image.addEventListener('click', toggle);
});

/*
  funktionen toggle växlar bildstorleken på en produktbild mellan stor och liten
*/
function toggle() {
  console.log('calling toggle');
  // OM bildens förälder redan har klassen "big"
  if (this.parentElement.classList.contains('big')) {
    // så tar vi bort klassen (då blir bilden liten, p g a css)
    this.parentElement.classList.remove('big');
    // vi måste ta hand om cart separat (visa)
    document.querySelector('#cart').style.display = '';
    // ANNARS (bildens förälder har inte klassen "big")
  } else {
    // lägg till klassen (så bilden blir stor, p g a css)
    this.parentElement.classList.add('big');
    // vi måste ta hand om cart separat (gömma)
    document.querySelector('#cart').style.display = 'none';
  }
}
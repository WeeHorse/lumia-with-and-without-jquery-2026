// skapa dina event listerens och funktioner här


// när man klickar på en produktbild kallar vi på funktionen "toggle"
$('.product img').on('click', toggle);

/*
  funktionen toggle växlar bildstorleken på en produktbild mellan stor och liten
*/
function toggle() {
  console.log('calling toggle');
  // OM bildens förälder redan har klassen "big"
  if ($(this).parent().hasClass('big')) {
    // så tar vi bort klassen (då blir bilden liten, p g a css)
    $(this).parent().removeClass('big');
    // vi måste ta hand om cart separat (visa)
    $('#cart').show();
    // ANNARS (bildens förälder har inte klassen "big")
  } else {
    // lägg till klassen (så bilden blir stor, p g a css)
    $(this).parent().addClass('big');
    // vi måste ta hand om cart separat (gömma)
    $('#cart').hide();
  }
}


// när man skriver text i sökfältet kallar vi på funktionen "search"
$('#search').on('keyup', search);

/*
  funktionen search
  - jämför texten i vår input med produktnamnen,
  och om den finns med så visar vi de matchande produkterna
*/
function search() {
  console.log('calling search');
  // Gömmer produkterna när man suddar ut det man skrivit
  $('.product').hide();

  // lägger texten jag skriver (i sökfältet) i variabeln searchText (små bokstäver)
  let searchText = $('#search').val().toLowerCase();

  // loop, går igenom alla produkter
  $('.product h2').each(function () {
    // lägger texten ifrån varje produkt i variabeln product text
    let productText = $(this).text().toLowerCase();

    // om söktexten finns och om produkttexten och söktexten matchar
    if (searchText && productText.indexOf(searchText) >= 0) {
      // letar vi upp <div class="product ..."> och visar den
      // (vi är på h2, första parent blir .content, dess parent blir .product)
      $(this).parent().parent().show();
    }

  });

}



// när man klickar på "lägg till"-knappen kallar vi på funktionen "add"
$('.product button').on('click', add);

// vi skapar den tomma arrayen (listan) items för att lägga produkter i varukorgen
let items = [];

/*
  funktionen add lägger till produkten, vars "lägg till"-knapp vi klickat på, i varukorgen
*/
function add() {
  console.log('calling add');
  // vi hämtar produktnamnet ifrån h2:an och lägger i minnet (variablen) productName
  let productName = $(this).parent().children('h2').text();
  // vi hämtar priset ifrån en <span> inuti knappen, och lägger i minnet (variablen) productPrice
  let productPrice = $(this).children('span').text();

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
  $('#cart ul').html('');
  //för varje produkt i varukorgen:
  for (let item of items) {
    // ökar vi på totalen med antal * pris
    total += (item.count * item.price);
    // och lägger till en rad i varukorgens DOM, med produktnamn, pris, antal och delsumma
    $('#cart ul').append('<li>' + item.name + '<span>(' + item.price + 'kr,</span><span>' + item.count + 'st)</span><span>' + (item.count * item.price) + 'kr</span></li>');
  }
  // slutligen lägger vi till sista raden i varukorgen för att visa slutsumman (total)
  $('#cart ul').append('<li class="total">Total <span>' + total + '</span></li>');
}
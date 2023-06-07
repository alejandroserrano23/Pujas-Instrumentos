// Obtener los elementos de la página
const bidButtons = document.querySelectorAll('.instrument button');
const customBidInput = document.getElementById('custom-bid-input');
const bidsList = document.getElementById('bids-list');
const highestBidElement = document.getElementById('highest-bid');

// Variable para almacenar las pujas
let bids = [];

// Función para colocar una puja
function placeBid(instrumentIndex) {
  let bidAmount;
  
  if (instrumentIndex === 0) {
    bidAmount = parseInt(customBidInput.value);
  } else {
    bidAmount = parseInt(customBidInput.value);
  }

  if (!isNaN(bidAmount) && bidAmount > 0) {
    // Crear un objeto de puja
    const bid = {
      instrumentIndex,
      amount: bidAmount
    };

    // Agregar la puja al array y mostrarla en la lista
    bids.push(bid);
    const bidItem = document.createElement('li');
    const instrumentName = getInstrumentName(instrumentIndex);
    bidItem.textContent = `${instrumentName} ${bidAmount} euros`;
    bidsList.appendChild(bidItem);

    // Actualizar la puja más alta si corresponde
    if (!highestBidElement.dataset.highestBid || bidAmount > parseInt(highestBidElement.dataset.highestBid)) {
      highestBidElement.dataset.highestBid = bidAmount;
      highestBidElement.textContent = `Puja más alta: ${instrumentName} ${bidAmount} €`;
    }

      customBidInput.value = '';

    // Guardar las pujas en el localStorage
    saveBidsToLocalStorage();
  }
}

// Función para obtener el nombre del instrumento según el índice
function getInstrumentName(instrumentIndex) {
  switch (instrumentIndex) {
    case 1:
      return 'Violín';
    case 2:
      return 'Guitarra';
    case 3:
      return 'Trompeta';
    default:
      return 'Instrumento Desconocido';
  }
}

// Función para guardar las pujas en el localStorage
function saveBidsToLocalStorage() {
  localStorage.setItem('bids', JSON.stringify(bids));
}

// Función para cargar las pujas del localStorage
function loadBidsFromLocalStorage() {
  const savedBids = localStorage.getItem('bids');
  if (savedBids) {
    bids = JSON.parse(savedBids);
    for (const bid of bids) {
      const bidItem = document.createElement('li');
      const instrumentName = getInstrumentName(bid.instrumentIndex);
      bidItem.textContent = `${instrumentName} ${bid.amount} euros`;
      bidsList.appendChild(bidItem);
    }

    // Actualizar la puja más alta si corresponde
    const highestBid = Math.max(...bids.map(bid => bid.amount));
    highestBidElement.dataset.highestBid = highestBid;
    const highestBidInstrumentIndex = bids.find(bid => bid.amount === highestBid).instrumentIndex;
    const highestBidInstrumentName = getInstrumentName(highestBidInstrumentIndex);
    highestBidElement.textContent = `Puja más alta: ${highestBidInstrumentName} ${highestBid} €`;
  }
}

// Cargar las pujas almacenadas al cargar la página
loadBidsFromLocalStorage();

/**
 * 2C = 'two of clubs 
 * 2D = 'two of diaminds
 * 2H = 'two of hearts
 * 2S = 'two of spades
 */

let deck = [];
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];

let puntosJugador = 0,
    puntosComputadora = 0;



//referencias de html
const btnPedir = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');
const btnNuevi = document.querySelector('#btnNuevo');
const puntosHTML = document.querySelectorAll('small');
const divCartasJugador = document.querySelector('#jugador-cartas');
const divCartasComputadora = document.querySelector('#computadora-cartas');

//esta función crea un nuevo deck
const crearDeck = () => {

    for (let i = 2; i <= 10; i++) {
        for (let tipo of tipos) {
            deck.push(i + tipo)
        }
    }

    for (let tipo of tipos) {
        for (let esp of especiales) {
            deck.push(esp + tipo)
        }
    }
    //console.log(deck);
    deck = _.shuffle(deck);
    console.log(deck);
    return deck;
}

crearDeck();

// esta funcion ,e permite tomar una carta

const perdircarta = () => {
    if (deck.length === 0) {
        throw "No hay cartas en el deck";
    }
    let carta = deck.pop();


    return carta;


}


//perdircarta();

const valorcarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1);
    return (isNaN(valor)) ?
        (valor === 'A') ? 11 : 10
        : valor * 1;
    //let puntos =0;

    // if (isNaN(valor)){
    //     puntos = (valor === 'A') ? 11 : 10;
    // }else {

    //     puntos = valor*1;
    // }
    // console.log(puntos );

}

//turno de la computadora
const turnoComputadora = (puntosMinimos) => {

    do {
        const carta = perdircarta();
        puntosComputadora = puntosComputadora + valorcarta(carta);
        puntosHTML[1].innerText = puntosComputadora;

        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.svg`;
        imgCarta.classList.add('carta');

        divCartasComputadora.append(imgCarta)

        if (puntosMinimos > 21) {
            break;
        }
    } while (puntosComputadora < puntosMinimos && puntosMinimos <= 21);

    if (puntosComputadora === puntosMinimos) {
        alert('Madie gana :(')
    } else if (puntosMinimos > 21) {
        alert('La computadora gana');
    } else if (puntosComputadora > 21) {
        alert('Jugador gana');
    } else { alert('Computadora gana'); }

}


//eventos
btnPedir.addEventListener('click', () => {
    const carta = perdircarta();
    puntosJugador = puntosJugador + valorcarta(carta);
    puntosHTML[0].innerText = puntosJugador;

    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${carta}.svg`;
    imgCarta.classList.add('carta');

    divCartasJugador.append(imgCarta)

    if (puntosJugador > 21) {
        console.warn('Lo siento, perdiste');
        btnPedir.disabled = true;
        turnoComputadora(puntosJugador);

    } else if (puntosJugador === 21) {
        console.warn('21, genial');
        btnPedir.disabled = true;
        turnoComputadora(puntosJugador);

    }

});

btnDetener.addEventListener('click', () => {
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora();

});

btnNuevi.addEventListener('click', () => {
    console.clear();
    deck = [];
    deck = crearDeck();

    puntosJugador =0;
    puntosComputadora =0;

    puntosHTML[0].innerText = 0;
    puntosHTML[1].innerText = 0;

    divCartasComputadora.innerHTML='';
    divCartasJugador.innerHTML='';

    btnPedir.disabled = false;
    btnDetener.disabled = false;


});



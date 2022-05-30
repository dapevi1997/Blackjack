/**
 * 2C = 'two of clubs 
 * 2D = 'two of diaminds
 * 2H = 'two of hearts
 * 2S = 'two of spades
 */

let deck = [];
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];

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

    console.log(deck);
    console.log(carta);
    return carta;


}


//perdircarta();

const valorcarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1);
    return (isNaN(valor)) ?
        (valor === 'A') ? 11 : 10
        : valor*1;
    //let puntos =0;

    // if (isNaN(valor)){
    //     puntos = (valor === 'A') ? 11 : 10;
    // }else {

    //     puntos = valor*1;
    // }
    // console.log(puntos );

}

const valor = valorcarta(perdircarta());
console.log({valor});
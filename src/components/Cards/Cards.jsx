import Card from "../Card/Card";
import s from "./Cards.module.scss";
import { useState } from "react";

function Cards(props) {
  const [doubledCards, setDoubledCards] = useState(
    getRandomDoubledArr(props.cards)
  );

  function getRandomIndex(arr) {
    return Math.round(Math.random() * (arr.length - 1));
  }

  function getRandomDoubledArr(arr) {
    let doubledArr = [];

    do {
      const index = getRandomIndex(arr);
      const randElem = { ...arr[index] };
      randElem.active = false;
      randElem.found = false;
      doubledArr.push(randElem);

      // Сколько уже таких элементов есть в массиве
      const elemCount = doubledArr.filter(
        (elem) => elem.id === randElem.id
      ).length;
      // Если элемента уже 2, убираем его из изначального массива
      if (elemCount === 2) {
        arr = arr.filter((elem) => elem.id !== randElem.id);
      }
    } while (arr.length !== 0);

    return doubledArr;
  }

  function clickCardHandler(index) {
    if (doubledCards[index].found || doubledCards[index].active) {
      return;
    }

    setDoubledCards((prev) => {
      let newArr = [...prev];

      if (isTwoCardsOpened(prev)) {
        newArr = newArr.map((card) => {
          if (!card.found) {
            return { ...card, active: false };
          } else {
            return card;
          }
        });
      }

      newArr[index].active = !prev[index].active;

      newArr = setFoundCards(newArr);

      return newArr;
    });
  }

  function isTwoCardsOpened(cards) {
    const openedCardsCount = cards.filter(
      (card) => card.active && !card.found
    ).length;

    return openedCardsCount === 2;
  }

  function setFoundCards(cards) {
    const _cards = [...cards];
    const openedCards = cards.filter((card) => card.active && !card.found);

    openedCards.forEach((card, index) => {
      const openedCardsWithSameId = openedCards.filter((a) => a.id === card.id);

      if (openedCardsWithSameId.length === 2) {
        _cards.forEach((_card) => {
          if (_card.id === card.id) {
            _card.found = true;
          }
        });
      }
    });

    return _cards;
  }

  function tryAgainHandler() {
    setDoubledCards(getRandomDoubledArr(props.cards));
  }

  const isWin =
    doubledCards.length === doubledCards.filter((card) => card.found).length;

  return (
    <>
      <div className={s.cards}>
        {doubledCards.map((card, index) => (
          <Card
            text={card.text}
            key={index}
            bg={card.bg}
            active={card.active}
            onClick={() => clickCardHandler(index)}
          />
        ))}
      </div>
      {isWin && (
        <>
          <h3>Победа!</h3>
          <button onClick={tryAgainHandler}>Попробовать снова</button>
        </>
      )}
    </>
  );
}

export default Cards;

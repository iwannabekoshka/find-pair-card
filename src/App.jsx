import Cards from "./components/Cards/Cards";
import s from "./App.module.scss";

function App() {
  const CARDS = [
    {
      id: 1,
      text: "Koshka",
      bg: "cornflowerblue",
    },
    {
      id: 2,
      text: "Sobaka",
      bg: "salmon",
    },
    {
      id: 3,
      text: "Ribka",
      bg: "gold",
    },
    {
      id: 4,
      text: "Lev",
      bg: "lightgreen",
    },
    {
      id: 5,
      text: "Martishka",
      bg: "plum",
    },
    {
      id: 6,
      text: "Bug",
      bg: "bisque",
    },
  ];

  return (
    <main className={s.main}>
      <div className="container">
        <Cards cards={CARDS} />
      </div>
    </main>
  );
}

export default App;

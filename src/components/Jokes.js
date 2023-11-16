import React, { useState, useEffect } from "react";
import spinner from "../assets/spinner1.jpg";
const Jokes = () => {
  const [joke, setJoke] = useState({});
  const [randomNumber, setRandomNumber] = useState(null);
  const [loading, setLoading] = useState(true);

  const getJokes = () => {
    setLoading(true);
    fetch("https://api.chucknorris.io/jokes/random")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setJoke(data);
        setTimeout(() => setLoading(false), 1000);
      })
      .catch((error) => {
        console.error("Error fetching jokes:", error);
        setTimeout(() => setLoading(false), 1000);
      });
  };
  const generateRandomNumber = () => {
    const newRandomNumber = Math.floor(Math.random() * 100) + 1;
    setRandomNumber(newRandomNumber);
  };

  const handleClick = () => {
    getJokes();
    generateRandomNumber();
  };

  useEffect(() => {
    getJokes();
    generateRandomNumber();
  }, []);

  return (
    <section className="--flex-center --100vh --bg-grey">
      <div className="container --card --bg-light --p">
        <h2>Random Jokes Generator</h2>
        <div className="--line"></div>
        {loading ? (
          <img src={spinner} alt="loading" width={50} />
        ) : (
          <div>
            {joke.value ? (
              <>
                <h4>Joke id: {joke.value ? randomNumber : ""}</h4>
                <br />
                <p>{joke.value}</p>
              </>
            ) : (
              <p>No data available ....</p>
            )}
          </div>
        )}
        <br />
        <button className="--btn --btn-primary" onClick={handleClick}>
          Generate Joke
        </button>
      </div>
    </section>
  );
};
export default Jokes;

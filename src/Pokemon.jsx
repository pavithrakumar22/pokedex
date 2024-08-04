//imports
import { useEffect, useState } from "react";
import "./index.css";
import { PokemonCards } from "./assets/PokemonCards";

export const Pokemon = () => {
  const API = "https://pokeapi.co/api/v2/pokemon?limit=600";
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const fetchPokemon = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();
      //console.log(data)

      const detailedPokemonData = data.results.map(async (curPokemon) => {
        const res = await fetch(curPokemon.url);
        const data = await res.json();
        return data;
      });
      //console.log(detailedPokemonData);
      //Promise.all checks if all the promises are fulfilled or not. if fulfilled then it displays it else it doesnot display the data
      const detailedResponses = await Promise.all(detailedPokemonData);
      setPokemon(detailedResponses);
      setLoading(false);
      console.log(detailedResponses);
    } catch (error) {
      console.log(error);
      setError(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchPokemon();
  }, []);

  //search functionality
  const searchData = pokemon.filter((curPokemon) =>
    curPokemon.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }
  if (error) {
    return (
      <div>
        <h1>{error.message}</h1>
      </div>
    );
  }
  return (
    <>
      <section className="container">
        <header>
          <h1>Let's Catch Pokemon</h1>
        </header>
        <div className="pokemon-search">
          <input
            type="text"
            placeholder="search pokemon"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </div>
      </section>

      <div>
        <ul className="cards">
          {searchData.map((curPokemon) => {
            return (
              <PokemonCards key={curPokemon.id} pokemonData={curPokemon} />
            );
          })}
        </ul>
      </div>
    </>
  );
};

import React, { useEffect, useState } from 'react'
import '../Styles/WhosThatPokemon.css'
import axios from 'axios'
import Button from './Button'
import Loader from './Loader'

const WhosThatPokemon = () => {
  const [pokemon, setPokemon] = useState(null)
  const [loading, setLoading] = useState(true)
  const [hidden, setHidden] = useState(true)
  const [options, setOptions] = useState([])

  const howManyPokemons = 1000

  const randomNumber = Math.floor(Math.random() * howManyPokemons) + 1
  const option1 = Math.floor(Math.random() * howManyPokemons) + 1
  const option2 = Math.floor(Math.random() * howManyPokemons) + 1


  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      try {
        const [pokemonResponse, option1Response, option2Response] = await Promise.all([
          axios.get(`https://pokeapi.co/api/v2/pokemon/${randomNumber}`),
          axios.get(`https://pokeapi.co/api/v2/pokemon/${option1}`),
          axios.get(`https://pokeapi.co/api/v2/pokemon/${option2}`),
        ]);

        setPokemon(pokemonResponse.data);
        setOptions([pokemonResponse.data.name, option1Response.data.name, option2Response.data.name])
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [])

  const handleReset = () => {
    window.location.reload()
  }



  let shuffledOptions = options
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)

  return (
    <div>
      <h1>¿Cuál es este Pokémon?</h1>
      {loading && <Loader />}
      {pokemon &&
        <div className='pokemon'>
          <img
            src={pokemon.sprites.other.home.front_default} alt={pokemon.name}
            className={`pokemon__image ${hidden ? 'hidden' : ''}`}
          />
          {hidden
            ?
            <div className='button-container'>
              {shuffledOptions.map(option => (
                <Button
                  key={option}
                  onClick={() => setHidden(false)}
                  value={option}
                />
              ))}
            </div>

            :
            <div className='solution'>
              <h2>Es... ¡ {pokemon.name} !</h2>
              <Button
                onClick={() => handleReset()}
                value='Volver a jugar'
              />
            </div>
          }
        </div>
      }
    </div>
  )
}

export default WhosThatPokemon

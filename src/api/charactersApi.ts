import { PokemonClient } from 'pokenode-ts'
import { TOTAL_CHARACTERS } from '../constants/index'

const pokemonClient = new PokemonClient()

export const characters = Object.freeze({
  getPokemons: (offset = 0, limit = TOTAL_CHARACTERS) => pokemonClient.listPokemons(offset, limit),
  getPokemonsDetails: (names: string[]) => Promise.all(
    names.map(name => pokemonClient.getPokemonByName(name)),
  ),
})

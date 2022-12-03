import { PokemonClient } from 'pokenode-ts'
import { LIMIT_DEFAULT } from '../constants/index'

const pokemonClient = new PokemonClient()

export const pokemon = Object.freeze({
  getPokemons: (offset = 0, limit = LIMIT_DEFAULT) => pokemonClient.listPokemons(offset, limit),
})

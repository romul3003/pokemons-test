import { PokemonClient } from 'pokenode-ts'

const pokemonClient = new PokemonClient()

export const types = Object.freeze({
  getTypesList: () => pokemonClient.listTypes(),
})

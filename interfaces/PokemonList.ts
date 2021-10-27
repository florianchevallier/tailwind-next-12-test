export interface IPokemonList {
  count: number
  next: string
  previous: any
  results: IPokemonListResult[]
}

export interface IPokemonListResult {
  name: string
  url: string
}
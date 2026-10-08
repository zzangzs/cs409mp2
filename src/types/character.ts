export interface Talent {
  name: string
  unlock: string
  description: string
}

export interface Character {
  id: string
  name: string
  title?: string
  vision: string
  weapon: string
  rarity: number
  nation?: string
  description?: string
  skillTalents?: Talent[]
}
import axios from 'axios'
import type { Character } from '../types/character'

const api = axios.create({
  baseURL: 'https://genshin.jmp.blue',
  timeout: 15000,
})

export async function getCharacters(): Promise<Character[]> {
  const response = await api.get<Character[]>('/characters/all', {
    params: { lang: 'en' },
  })

  if (
    !Array.isArray(response.data) ||
    response.data.some(character => !character.id)
  ) {
    throw new Error('Unexpected character response')
  }

  return response.data
}

export function characterImage(id: string): string {
  return `https://genshin.jmp.blue/characters/${encodeURIComponent(id)}/card`
}
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

export function elementIcon(vision: string): string | undefined {
  const element = vision.trim().toLowerCase()
  const supported = ['anemo', 'geo', 'electro', 'dendro', 'hydro', 'pyro', 'cryo']

  if (!supported.includes(element)) return undefined

  return `https://genshin.jmp.blue/elements/${element}/icon`
}

export function nationIcon(nation?: string): string | undefined {
  const id = nation?.trim().toLowerCase()
  const supported = ['mondstadt', 'liyue', 'inazuma', 'sumeru', 'fontaine']

  if (!id || !supported.includes(id)) return undefined

  return `https://genshin.jmp.blue/nations/${id}/icon`
}

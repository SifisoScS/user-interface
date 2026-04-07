export interface Track {
  id: string
  title: string
  artist: string
  album: string
  duration: number   // seconds
  hue: number        // album art gradient base hue
}

export const mockPlaylist: Track[] = [
  { id: 'tr1', title: 'Bohemian Rhapsody',   artist: 'Queen',              album: 'A Night at the Opera', duration: 354, hue: 280 },
  { id: 'tr2', title: 'Blinding Lights',     artist: 'The Weeknd',         album: 'After Hours',          duration: 200, hue: 10  },
  { id: 'tr3', title: 'Levitating',          artist: 'Dua Lipa',           album: 'Future Nostalgia',     duration: 203, hue: 190 },
  { id: 'tr4', title: 'As It Was',           artist: 'Harry Styles',       album: "Harry's House",        duration: 167, hue: 330 },
  { id: 'tr5', title: 'Anti-Hero',           artist: 'Taylor Swift',       album: 'Midnights',            duration: 200, hue: 50  },
]

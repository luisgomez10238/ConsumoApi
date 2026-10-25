# PokéDex Explorer

App hecha con Expo y React Native que consume la PokéAPI. Lista Pokémon con scroll infinito, permite buscarlos por nombre o número y muestra su ficha con imagen, tipos y estadísticas.

**Integrantes:** Deysi lorena Gomez y Luis Alberto Gomez
**Curso:** Desarrollo Movil · **Docente:** Paula Andrea Muñoz 

## Cómo ejecutarlo

```bash
npm install
npx expo start
```

Escanear el QR con Expo Go (SDK 58).

## Estructura de carpetas

```
pokedex-explorer/
├── App.js
├── README.md
└── src/
    ├── services/
    │   └── pokeApi.js
    ├── hooks/
    │   ├── usePokemonList.js
    │   └── usePokemonDetail.js
    ├── screens/
    │   ├── ListScreen.js
    │   └── DetailScreen.js
    ├── components/
    │   ├── PokemonCard.js
    │   ├── SearchBar.js
    │   ├── TypeBadge.js
    │   └── StatBar.js
    └── constants/
        └── pokemonTypes.js
```

## Responsabilidad de cada archivo

| Archivo | Responsabilidad |
|---|---|
| `App.js` | Guarda qué Pokémon está seleccionado y alterna entre la lista y la ficha |
| `services/pokeApi.js` | Todas las llamadas `fetch` a la API; revisa `response.ok` y devuelve solo los datos que usa la app |
| `hooks/usePokemonList.js` | Estados de la lista (datos, carga, error), paginación y scroll infinito |
| `hooks/usePokemonDetail.js` | Estados de la ficha de un Pokémon (datos, carga, error y reintento) |
| `screens/ListScreen.js` | Pantalla de la lista y la búsqueda; decide qué estado mostrar |
| `screens/DetailScreen.js` | Pantalla de la ficha con sus estados y el botón de volver |
| `components/PokemonCard.js` | Tarjeta con imagen, número y nombre |
| `components/SearchBar.js` | Campo de texto y botón "Buscar" |
| `components/TypeBadge.js` | Distintivo de color por tipo |
| `components/StatBar.js` | Estadística con barra proporcional (máximo 255) |
| `constants/pokemonTypes.js` | Colores y nombres en español de los tipos y las estadísticas |

## Por qué organizamos así el proyecto

Usamos la estructura vista en clase, que separa el proyecto en `components/`,
`screens/`, `services/` y `hooks/`. 

- **`services/`:** todas las llamadas a la API están aquí, separadas de los
  estilos y el JSX, como pide la guía.
- **`hooks/`:** guarda los estados y los `useEffect` de cada petición, así el
  array de dependencias queda en un archivo pequeño y la pantalla solo se
  ocupa de mostrar.
- **`screens/`:** arman la vista según el estado (cargando, error, sin
  resultados, éxito).
- **`components/`:** solo reciben props y se dibujan, sin hacer peticiones.
- **`constants/` ** guarda los colores y nombres en
  español de los tipos y las estadísticas.
- **La lista no se desmonta** al abrir una ficha (se oculta), para conservar
  el scroll y lo ya cargado.

## Estados de la interfaz

| Estado | Qué ve el usuario |
|---|---|
| Cargando | Indicador con texto |
| Error | Mensaje en español y botón "Reintentar" |
| Sin resultados | Mensaje cuando el nombre buscado no existe |
| Éxito | La lista o la ficha |

## Capturas
![
    
](<WhatsApp Image 2026-10-24 at 9.20.26 PM (1).jpeg>) ![
    
](<WhatsApp Image 2026-10-24 at 9.20.26 PM (2).jpeg>) ![
    
](<WhatsApp Image 2026-10-24 at 9.20.26 PM (3).jpeg>) ![
    
](<WhatsApp Image 2026-10-24 at 9.20.26 PM (4).jpeg>) ![
    
](<WhatsApp Image 2026-10-24 at 9.20.26 PM.jpeg>)
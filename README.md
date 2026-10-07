# TéléSport - Historique des Jeux Olympiques

Dashboard React qui affiche les performances des pays aux Jeux Olympiques :
- **Accueil** : nombre de pays, nombre d'éditions et camembert des médailles par pays. Un clic sur un pays ouvre sa page détail.
- **Détail pays** (`/country/:id`) : participations, total médailles, total athlètes et courbe d'évolution des médailles.
- **Page 404** : URL inconnue ou pays inexistant.

## Prérequis

- **Node.js** 22 LTS ou plus
- **npm** (installé avec Node.js)

## Installation

```bash
git clone https://github.com/qatd/openclassrooms-projet2.git
cd openclassrooms-projet2
npm install
```

## Lancer le projet

```bash
npm run dev       # serveur de dev -> http://localhost:5173
npm run build     # vérification TypeScript + build de production
npm run lint      # vérification ESLint
npm run preview   # sert le build de production
```

## Stack

- **React 19** + **React Compiler** (mémoïsation automatique)
- **TypeScript** (mode strict)
- **Vite 7** (serveur de dev et build)
- **React Router 6** (navigation)
- **Chart.js 4** + **react-chartjs-2** (graphiques)
- **Tailwind CSS 4** (style et responsive)
- **ESLint** (qualité du code)

## Structure du projet

```
public/data/olympics.json   # données mockées
src/
├── main.tsx                # point d'entrée
├── index.css               # Tailwind + couleur principale
└── app/
    ├── App.tsx
    ├── router.tsx          # routes : /, /country/:id, * (404)
    ├── models/             # interfaces TypeScript (Country, Participation)
    ├── api/                # récupération des données (fetch)
    ├── hooks/              # useData : data / loading / error
    ├── utils/              # calculs (médailles, athlètes) + config des graphiques
    ├── components/         # composants d'affichage réutilisables
    └── pages/              # une page par route : Home, Country, NotFound
```

Le détail des composants et du flux de données est dans [ARCHITECTURE.md](./ARCHITECTURE.md).

## Choix techniques

- **Découpage par rôle** : les pages récupèrent les données ("smart"), les composants ne font que les afficher à partir de leurs props ("dumb").
- **Un seul point d'accès aux données** : les pages passent toujours par le hook `useData`, qui appelle `api/olympics.ts`. Pour brancher une vraie API REST, il suffira de changer l'URL dans `api/`.
- **États gérés** : chargement (`Loader`), erreur de chargement (`ErrorMessage`), URL inconnue ou pays inexistant (redirection vers la page 404).
- **Navigation sans rechargement** avec React Router : `useNavigate` au clic sur le graphique, `Link` pour le bouton Retour.
- **Chart.js** : chaque graphique n'enregistre que les éléments dont il a besoin. Les données et options des graphiques sont dans `utils/charts.ts`.
- **Tailwind CSS 4** : pas de fichier de config, la couleur principale est définie avec `@theme` dans `index.css`. Le responsive est mobile-first (classes `md:`).
- **TypeScript strict** : interfaces dans `models/`, aucun `any`.
- **React Compiler** : pas de `useMemo` / `useCallback` manuels, le compilateur s'en charge.

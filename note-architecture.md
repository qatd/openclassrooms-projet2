#### problèmes remarqué avant changements
- presque tout le code est dans app.tsx, les composants ne sont pas dans des fichiers séparés
- le projet ne build pas quand run `npm run build`
- Lint fail quand on fait `npm run lint`
- pas de typage strict, tous les types sont `any`
- des consoles logs laissé un peu partout
- données hardcodés dans le code pour olympicsData
- pas de onClick pour cliquer sur les pays et avoir les details dans la page détail du pays
- le setTimeout dans le useEffect n'est jamais unload/cleané
- la logique du useEffect dans Home pourrait être gérée dans un custom hook, avec une gestion de l'etat, ou géré par une lib de fetching (tanstack Query par ex) et qui serait réutilisable dans l'app
- le nom du composant qui est "Home", dans un fichier qui s'appelle App
- pour calculateTotalMedals, la logique est dans le composant, elle devrait être dans un fichier .ts dédié
- le chargement qui vient de l'absence ou non de data, au lieu d'un etat dedié (loading/error)
- les cartes sont dupliquées au lieu d'être un seul composant avec des props dédiées pour la couleur, le texte et leur value
- dans Country il faudrait un fichier .ts dédié pour préparer les datas & options des graphiques
- routing dans App.tsx, il faudrait qu'il soit dans un module dedié
- si on indique un id superieur à 5, on n'a pas de redirection, on a juste un ecran blanc, car absent des datas. Il faudrait par exemple verifier avant si le pays est présent dans les données, et afficher un epage d'erreur (en plus d'une redirection ou page d'erreur dans le routeur en cas d'url inconnue)
- il ne devrait y avoir qu'une seule source pour les données, Country utilise les données directement, et Home les utilisent aussi de son côté. Il faudrait une seule source de data. Comme indiqué au dessus, un custom hook ou une lib de fetching pour l'app.

#### conception nouvelle architecture

##### arborescence
- public/
    - data/
        - olympics.json - données mockées
- src/
    - main.tsx - point d'entrée
    - index.css
    - app/
        - App.tsx
        - router.tsx
        - models/
            - olympics.ts - interfaces pour country, participation
        - api/
            - olympics.ts - récupère données avec fetch (l'utilisation de fetch prépare le terrain pour le vrai backend. Il faudra remplacer le json actuel par l'url de l'api)
        - hooks/ - point d'accès data pour les composants
            - useOlympics.ts - data / loading / error, utilisé par Home et Country
        - utils/
            - olympics.ts - logique pour calculer total medailles, athlètes..
            - charts.ts - data + options des graphiques
        - components/ - composants dumb : reçoivent props, uniquement apparence
            - Indicator.tsx - item qui affiche les stats, réutilisable
            - MedalsPieChart.tsx
            - MedalsLineChart.tsx
            - Loader.tsx
            - ErrorMessage.tsx
        - pages/ - composants smart : récupèrent data via hooks
            - Home.tsx
            - Country.tsx - avec fallback pour pays inexistants
            - NotFound.tsx

##### déplacement des éléments actuel vers la nouvelle architecture
- App.tsx
    - olympicsData -> public/data/olympics.json
    - Home -> pages/Home.tsx
    - Country -> pages/Country.tsx
    - calculateTotalMedals -> utils/olympics.tsx
    - Home
        - useEffect -> hooks/useOlympics.ts & api/olympics.ts
        - card item dupliqué -> components/Indicator.tsx
        - chartData / chartOptions -> utils/charts.ts
    - Pie / Line -> components/MedalsPieChart, components/MedalsLineChart.tsx
    - div html loading -> components/loader.tsx
    - routes -> router.tsx

Tous ces changements permettront de rendre l'app bien plus facilement maintenable et évoluable, car chaque fichier a un rôle bien défini.
Les composants dumb, les smart, les utils et hooks qui gère la logique..
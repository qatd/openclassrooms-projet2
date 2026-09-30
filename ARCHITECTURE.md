# Architecture frontend
Dashboard React des JO : une page d'accueil avec les médailles par pays, et une page détail par pays.
Tout le code de l'app est dans `src/app/`, organisé par rôle.

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
            - useData.ts - data / loading / error, utilisé par Home et Country
        - utils/
            - olympics.ts - logique pour calculer total medailles, athlètes..
            - charts.ts - data + options des graphiques
        - components/ - composants dumb : reçoivent props, uniquement apparence
            - Indicator.tsx - item qui affiche les stats
            - MedalsPieChart.tsx
            - MedalsLineChart.tsx
            - Loader.tsx
            - ErrorMessage.tsx
        - pages/ - une page par route. Home et Country récupèrent la data, ils sont "smart"
            - Home.tsx
            - Country.tsx - avec fallback pour pays inexistants
            - NotFound.tsx

##### composants
- smart (pages/)
    - Home - récupère les données, affiche les indicateurs + le graphique des médailles par pays
    - Country - récupère les données, trouve le pays via l'id de l'url, affiche ses indicateurs + évolution des médailles
- page simple
    - NotFound - s'affichée si url inconnue
- dumb (components/)
    - Indicator - carte avec titre et value (props : title, value, color)
    - MedalsPieChart - camembert médailles par pays (props : countries)
    - MedalsLineChart - courbe médailles par année (props : participations)
    - Loader - affiché pendant le loading
    - ErrorMessage - affiche message d'erreur (props : message)

##### données : hook useData + service api pour bien séparer les usages
- chemin des données : page -> useData -> api/olympics.ts -> olympics.json
- les pages n'accèdent jamais directement aux données, uniquement via useData
- useData renvoie `{ data, loading, error }` :
    - data - liste des pays (Country[])
    - loading - true pendant le loading -> page affiche Loader
    - error - message si le chargement échoue -> page affiche ErrorMessage
- api/olympics.ts (service) - unique fichier qui fait le fetch et sait d'où viennent les datas

##### connexion future au back-end
- uniquement api/olympics.ts devra être modifié : changer url par celle de l'api
- useData gère déjà loading / error et annulation de la requête, il peut gérer des vraies requêtes
- pages et composants ne changent pas, ils dépendent seulement de useData et des interfaces de models/

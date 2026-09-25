#### problèmes remarqué avant changements
- presque tout le code est dans app.tsx, les composants ne sont pas dans des fichiers séparés
- le projet ne build pas quand run `npm run build`
- Lint fail quand on fait `npm run lint`
- pas de typage strict, tous les types sont `any`
- des consoles logs laissé un peu partout
- données hardcodés dans le code pour olympicsData
- pas de onClick pour cliquer sur les pays et avoir les details dans la page détail du pays
- le setTimeout dans le useEffect n'est jamais unload/cleané
- la logique du useEffect dans Home pourrait être géré dans un custom hook, avec une gestion de l'etat, ou géré par une lib de fetching (tanstack Query par ex) et qui serait réutilisable dans l'app
- le nom du composant qui est "Home", dans un fichier qui s'appelle App
- pour calculateTotalMedals, la logique est dans le composant, elle devrait être dans un fichier .ts dédié
- le chargement qui vient de l'absence ou non de data, au lieu d'un etat dedié (loading/error)
- les cartes sont dupliquées au lieu d'être un seul composant avec des props dédiées pour la couleur, le texte et leur value
- dans Country il faudrait un fichier .ts dédié pour préparer les datas & options des graphiques
- routing dans App.tsx, il faudrait qu'il soit dans un module dedié
- si on indique un id superieur à 6, on n'a pas de redirection, on a juste un ecran blanc, car absent des datas. Il faudrait par exemple verifier avant si le pays est présent dans les données, et afficher un epage d'erreur (en plus d'une redirection ou page d'erreur dans le routeur en cas d'url inconnue)
- il ne devrait y avoir qu'une seule source pour les données, Country utilise les données directement, et Home les utilisent aussi de son côté. Il faudrait une seule source de data. Comme indiqué au dessus, un custom hook ou une lib de fetching pour l'app.

#### fix
- corriger build
> - ajouter route country, utiliser composant Country

- Corriger erreur Lint
> - ajouter typage
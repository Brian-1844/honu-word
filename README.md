# Word Pas à Pas — Apprendre Word

Application (PWA) pour apprendre Microsoft Word, du **débutant** à l'**avancé**, pensée pour Android.

- 27 leçons en 3 niveaux (Débutant · Intermédiaire · Avancé)
- Un Word simulé et **animé** dans chaque leçon (▶ Regarder), puis un **exercice guidé** (✋ À vous !)
- Conseils « Sur Android » et astuces, une question par leçon, un examen par niveau (70 % pour débloquer le suivant)
- Étoiles et progression enregistrées sur le téléphone
- Fonctionne **hors ligne** et s'installe sur l'écran d'accueil

## Mettre en ligne sur GitHub Pages
1. Créez un dépôt (par ex. `word-pas-a-pas`) et envoyez **tous les fichiers** à la racine (Add file › Upload files), en gardant le dossier `icons/`.
2. Settings › Pages › Source : *Deploy from a branch* › branche `main`, dossier `/ (root)` › Save.
3. Ouvrez `https://VOTRE-NOM.github.io/word-pas-a-pas/` dans Chrome sur Android, puis **Installer** (ou menu ⋮ › Ajouter à l'écran d'accueil).

## Modifier les leçons
Tout le contenu est dans `lessons.js`. Chaque leçon a une `scene` avec des étapes (`tab`, `btn`, `sel`, `type`, `key`, `menu`, `ctx`, `grid`, `dialog`, `file`, `point`).
Après une modification, changez `CACHE` dans `sw.js` (ex. `v2`) pour que les téléphones reçoivent la nouvelle version.

## Google Play (plus tard)
Une PWA peut être emballée pour le Play Store avec PWABuilder (pwabuilder.com) ou Bubblewrap (TWA).

---
Application éducative indépendante, non affiliée à Microsoft. Word est une marque de Microsoft Corporation.

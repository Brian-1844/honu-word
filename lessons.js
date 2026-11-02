/* =========================================================
   Word Pas à Pas — contenu des leçons
   Chaque leçon : intro, scène animée (steps), "Comment faire",
   astuce, conseil Android et une question de vérification.
   ========================================================= */

/* Petites "photos" dessinées (pour la leçon Images) */
window.PHOTO = function (v) {
  const sky = ['#8fd3f4', '#ffd6a5', '#b8e6c1'][v % 3];
  if (v === 2) {
    return `<svg viewBox="0 0 120 80" preserveAspectRatio="xMidYMid slice"><rect width="120" height="80" fill="#4f9a5b"/><circle cx="20" cy="20" r="14" fill="#3f8a4b"/><circle cx="100" cy="64" r="18" fill="#3f8a4b"/>
    ${[0,45,90,135,180,225,270,315].map(a=>`<ellipse cx="60" cy="27" rx="7" ry="15" fill="#fffdf5" stroke="#e8e2cc" transform="rotate(${a} 60 42)"/>`).join('')}
    <circle cx="60" cy="42" r="6" fill="#f5d36b"/></svg>`;
  }
  if (v === 1) {
    return `<svg viewBox="0 0 120 80" preserveAspectRatio="xMidYMid slice"><rect width="120" height="80" fill="${sky}"/><circle cx="92" cy="20" r="10" fill="#fff3b0"/>
    <path d="M0 52 Q30 46 60 52 T120 50 V80 H0Z" fill="#2bb3c0"/><path d="M0 62 Q40 56 120 64 V80 H0Z" fill="#f3dfa9"/>
    <path d="M30 64 Q34 40 40 26" stroke="#7a5230" stroke-width="3" fill="none"/>
    <path d="M40 26 q-14 -4 -22 6 M40 26 q14 -6 22 4 M40 26 q-6 -12 -18 -12 M40 26 q8 -12 20 -10" stroke="#2e7d32" stroke-width="4" fill="none" stroke-linecap="round"/></svg>`;
  }
  return `<svg viewBox="0 0 120 80" preserveAspectRatio="xMidYMid slice"><rect width="120" height="80" fill="${sky}"/>
  <path d="M0 50 L25 22 L45 40 L70 14 L100 44 L120 30 V80 H0Z" fill="#3c8d5a"/>
  <rect x="14" y="44" width="92" height="30" fill="#f7efe1"/>
  ${[0,1,2,3,4,5,6,7].map(i=>`<rect x="${14+i*11.5}" y="38" width="11.5" height="9" fill="${i%2?'#fff':'#e4572e'}"/>`).join('')}
  <circle cx="30" cy="62" r="6" fill="#f4a259"/><circle cx="44" cy="63" r="5" fill="#f7d046"/><circle cx="58" cy="62" r="6" fill="#8cc152"/>
  <circle cx="74" cy="63" r="5" fill="#e4572e"/><circle cx="88" cy="62" r="6" fill="#f4a259"/></svg>`;
};

window.LEVELS = [
/* ======================= DÉBUTANT ======================= */
{
  id: 'd', name: 'Débutant', sub: 'Les bases pour bien démarrer', color: '#14A396', emoji: '🌱',
  lessons: [
  {
    id: 'd1', e: '🖥️', t: 'Découvrir l’écran de Word',
    intro: 'Avant d’écrire, faisons le tour de l’écran. Word est toujours organisé de la même façon : une fois les zones connues, tout devient plus simple.',
    scene: { tab: 'Accueil', doc: '<p id="t" class="h1">Mon premier document</p><p id="p">Bienvenue ! Voici la page blanche où l’on écrit.</p>', steps: [
      { t: 'point', el: '.wm-title', say: 'En haut : la barre de titre, avec le nom du document.' },
      { t: 'point', el: '.wm-tabs', say: 'Les onglets : Fichier, Accueil, Insertion… Chacun ouvre une partie du ruban.' },
      { t: 'point', el: '.wm-ribbon', say: 'Le ruban : les boutons de l’onglet choisi, rangés par groupes.' },
      { t: 'point', el: '.wm-page', say: 'La page : c’est ici que vous écrivez. Le trait qui clignote est le curseur.' },
      { t: 'point', el: '.wm-status', say: 'En bas : la barre d’état (pages, nombre de mots, zoom).' },
      { t: 'tab', name: 'Insertion', say: 'Touchez un autre onglet : le ruban change. Voici Insertion.' }
    ]},
    how: [
      'La <b>barre de titre</b> affiche le nom du fichier.',
      'Les <b>onglets</b> (Accueil, Insertion, Mise en page…) changent le contenu du ruban.',
      'Le <b>ruban</b> regroupe les commandes par familles : Presse-papiers, Police, Paragraphe, Styles…',
      'La <b>page</b> est votre zone d’écriture ; le <b>curseur</b> clignotant montre où le texte va apparaître.',
      'La <b>barre d’état</b>, tout en bas, indique le nombre de pages et de mots, et permet de zoomer.'
    ],
    tip: 'Le ruban prend trop de place ? <b>Ctrl+F1</b> le replie et le déplie.',
    android: 'Sur téléphone, touchez le <b>crayon ✏️</b> pour passer en modification. Le ruban s’ouvre en bas de l’écran avec la petite flèche <b>▲</b> ; touchez le nom de l’onglet (« Accueil ») pour en choisir un autre.',
    q: { q: 'Où se trouvent les boutons comme « Gras » ou « Images » ?', o: ['Dans la barre d’état', 'Dans le ruban', 'Dans la barre de titre'], a: 1, why: 'Le ruban, sous les onglets, contient tous les boutons de commande.' }
  },
  {
    id: 'd2', e: '💾', t: 'Créer et enregistrer un document',
    intro: 'Un document qui n’est pas enregistré peut être perdu. Voyons comment créer une page vierge, lui donner un nom et l’enregistrer.',
    scene: { tab: 'Accueil', doc: '<p id="p">Ancien texte…</p>', steps: [
      { t: 'file', pick: 'Nouveau', then: 'Document vierge', tiles: ['Document vierge', 'Lettre', 'CV'], say: 'Fichier › Nouveau › Document vierge : une page blanche s’ouvre.', fx: h => h.html('.content', '<p id="p"></p>') },
      { t: 'type', el: '#p', text: 'Liste de courses : riz, pain, fruits', say: 'On écrit son texte…' },
      { t: 'file', pick: 'Enregistrer sous', then: 'Parcourir', tiles: ['OneDrive', 'Ce PC', 'Parcourir'], say: 'Fichier › Enregistrer sous : on choisit où ranger le fichier.' },
      { t: 'dialog', title: 'Enregistrer sous', html: '<div class="fl"><label>Nom du fichier</label><div class="fld">Courses</div></div><div class="fl"><label>Type</label><div class="fld">Document Word (*.docx) ▾</div></div>', ok: 'Enregistrer', say: 'On donne un nom clair, puis « Enregistrer ».', fx: h => h.title('Courses.docx') },
      { t: 'key', keys: ['Ctrl', 'S'], say: 'Ensuite, Ctrl+S enregistre vos changements en un geste.' }
    ]},
    how: [
      '<b>Fichier › Nouveau › Document vierge</b> (ou <b>Ctrl+N</b>) pour une nouvelle page.',
      'La première fois : <b>Fichier › Enregistrer sous</b>, choisissez le dossier et donnez un nom clair.',
      'Le format habituel est <b>.docx</b>.',
      'Ensuite, enregistrez souvent avec <b>Ctrl+S</b>.',
      'Pour rouvrir un fichier : <b>Fichier › Ouvrir</b> (ou <b>Ctrl+O</b>).'
    ],
    tip: 'Si votre fichier est sur OneDrive, l’<b>enregistrement automatique</b> (en haut à gauche) sauvegarde pour vous à chaque modification.',
    android: 'Sur Android, un document placé sur OneDrive s’enregistre tout seul. Pour faire une copie ou changer de nom, ouvrez le menu du fichier en haut de l’écran puis <b>Enregistrer une copie</b>.',
    q: { q: 'Quel raccourci enregistre le document ?', o: ['Ctrl+S', 'Ctrl+P', 'Ctrl+Z'], a: 0, why: 'Ctrl+S = « Save » (enregistrer). Ctrl+P imprime, Ctrl+Z annule.' }
  },
  {
    id: 'd3', e: '⌨️', t: 'Écrire et corriger',
    intro: 'Écrire dans Word, c’est simple : on tape, Word passe à la ligne tout seul. Voyons les touches essentielles pour corriger.',
    scene: { tab: 'Accueil', doc: '<p id="p"></p>', steps: [
      { t: 'type', el: '#p', text: 'Bonjour à tous,', say: 'On tape le texte : il apparaît à l’endroit du curseur.' },
      { t: 'key', keys: ['Entrée ↵'], say: 'Entrée crée un nouveau paragraphe.', fx: h => h.after('#p', '<p id="p2"></p>') },
      { t: 'type', el: '#p2', text: 'Rendez-vous samedi à 8hh', say: 'Oups, une lettre en trop…' },
      { t: 'key', keys: ['⌫ Retour arrière'], say: 'Retour arrière efface la lettre à gauche du curseur.', fx: h => h.chop('#p2') },
      { t: 'type', el: '#p2', text: '. Venez tôt !', say: 'On continue à écrire…' },
      { t: 'key', keys: ['Ctrl', 'Z'], say: 'Changement d’avis ? Ctrl+Z annule la dernière action.', fx: h => h.text('#p2', 'Rendez-vous samedi à 8h.') }
    ]},
    how: [
      'Tapez simplement : Word passe à la ligne <b>tout seul</b> en bout de ligne.',
      'Appuyez sur <b>Entrée</b> seulement pour commencer un <b>nouveau paragraphe</b>.',
      '<b>Retour arrière ⌫</b> efface à gauche du curseur, <b>Suppr</b> efface à droite.',
      '<b>Ctrl+Z</b> annule la dernière action, <b>Ctrl+Y</b> la rétablit.',
      '<b>Maj+Entrée</b> va à la ligne sans créer de nouveau paragraphe.'
    ],
    tip: 'Ne mettez pas plusieurs espaces pour décaler un texte : utilisez l’alignement ou la touche <b>Tab</b>. Votre mise en page restera propre.',
    android: 'Sur téléphone, touchez la page pour placer le curseur. Pour le déplacer précisément, maintenez le doigt et faites glisser la petite poignée.',
    q: { q: 'Faut-il appuyer sur Entrée à la fin de chaque ligne ?', o: ['Oui, toujours', 'Non : Word passe à la ligne tout seul, Entrée sert à changer de paragraphe'], a: 1, why: 'Word gère le retour à la ligne automatiquement. Entrée marque la fin d’un paragraphe.' }
  },
  {
    id: 'd4', e: '🖍️', t: 'Sélectionner du texte',
    intro: 'Pour modifier un texte (gras, couleur, copier…), il faut d’abord le sélectionner. Le texte sélectionné apparaît surligné en bleu.',
    scene: { tab: 'Accueil', doc: '<p id="p">Le <span id="w">lagon</span> est calme ce matin.</p><p id="p2">Les pirogues partent à six heures.</p>', steps: [
      { t: 'sel', el: '#w', say: 'Double-clic sur un mot : il est sélectionné.' },
      { t: 'sel', el: '#p2', say: 'Triple-clic : tout le paragraphe est sélectionné.' },
      { t: 'key', keys: ['Ctrl', 'A'], say: 'Ctrl+A sélectionne tout le document.', fx: h => h.cls('.content p', 'sel') },
      { t: 'point', el: '.wm-scroll', say: 'Un clic ailleurs dans la page annule la sélection.', fx: h => h.unsel() }
    ]},
    how: [
      '<b>Glisser</b> la souris sur le texte pour sélectionner exactement ce que vous voulez.',
      '<b>Double-clic</b> : un mot. <b>Triple-clic</b> : un paragraphe.',
      '<b>Maj + flèches</b> : agrandir la sélection lettre par lettre.',
      '<b>Ctrl+A</b> : tout le document.',
      'Un clic ailleurs <b>désélectionne</b>.'
    ],
    tip: 'Attention : si vous tapez une lettre pendant qu’un texte est sélectionné, elle le <b>remplace</b>. Ctrl+Z pour revenir en arrière.',
    android: 'Touchez <b>deux fois</b> un mot pour le sélectionner, puis faites glisser les <b>poignées ●</b> pour agrandir la sélection.',
    q: { q: 'Comment sélectionner tout le document d’un coup ?', o: ['Ctrl+A', 'Ctrl+T', 'Un double-clic'], a: 0, why: 'Ctrl+A (« All » = tout) sélectionne l’ensemble du document.' }
  },
  {
    id: 'd5', e: '🅶', t: 'Gras, italique, souligné',
    intro: 'Pour faire ressortir un mot important, on le met en gras, en italique ou on le souligne. Dans Word en français, les boutons s’appellent G, I et S.',
    scene: { tab: 'Accueil', doc: '<p id="p">Réunion <span id="w">importante</span> demain à <span id="w2">9 heures</span>.</p>', steps: [
      { t: 'sel', el: '#w', say: 'On sélectionne d’abord le mot.' },
      { t: 'btn', id: 'bold', say: 'G = Gras : le mot devient épais.', fx: h => h.st('#w', { fontWeight: '700' }) },
      { t: 'sel', el: '#w2', say: 'On sélectionne « 9 heures »…' },
      { t: 'btn', id: 'underline', say: 'S = Souligné.', fx: h => h.st('#w2', { textDecoration: 'underline' }) },
      { t: 'key', keys: ['Ctrl', 'I'], say: 'Ctrl+I = Italique (texte penché).', fx: h => h.st('#w2', { fontStyle: 'italic' }) }
    ]},
    how: [
      '<b>Sélectionnez</b> le texte.',
      'Accueil › groupe Police : <b>G</b> (gras), <b>I</b> (italique), <b>S</b> (souligné).',
      'Raccourcis : <b>Ctrl+G</b> gras, <b>Ctrl+I</b> italique, <b>Ctrl+U</b> souligné (sur un Word en anglais : Ctrl+B pour le gras).',
      'Cliquez à nouveau sur le bouton pour <b>enlever</b> l’effet.'
    ],
    tip: 'Utilisez le gras avec modération : si tout est en gras, plus rien ne ressort !',
    android: 'Sélectionnez le mot, puis touchez <b>G</b>, <b>I</b> ou <b>S</b> dans la barre en bas de l’écran.',
    q: { q: 'Que faut-il faire AVANT de cliquer sur Gras ?', o: ['Sélectionner le texte', 'Enregistrer le document', 'Fermer Word'], a: 0, why: 'Word applique la mise en forme au texte sélectionné.' }
  },
  {
    id: 'd6', e: '🎨', t: 'Police, taille et couleur',
    intro: 'La police est le style des lettres. On peut aussi changer leur taille et leur couleur pour rendre un titre plus visible.',
    scene: { tab: 'Accueil', doc: '<p id="t">Fête du quartier</p><p id="p">Samedi, venez nombreux avec vos enfants !</p>', steps: [
      { t: 'sel', el: '#t', say: 'On sélectionne le titre.' },
      { t: 'menu', from: 'font', items: ['Calibri', 'Arial', '<span style="font-family:Georgia,serif">Georgia</span>', '<span style="font-family:\'Comic Sans MS\',cursive">Comic Sans MS</span>'], pick: 2, say: 'Liste des polices : choisissons Georgia.', fx: h => { h.st('#t', { fontFamily: 'Georgia, serif' }); h.lbl('font', 'Georgia'); } },
      { t: 'menu', from: 'size', items: ['11', '14', '20', '28'], pick: 3, say: 'Taille : 28 points pour un titre bien visible.', fx: h => { h.st('#t', { fontSize: '24px' }); h.lbl('size', '28'); } },
      { t: 'menu', from: 'color', items: ['<i class="swt" style="background:#000"></i>Automatique', '<i class="swt" style="background:#c62828"></i>Rouge', '<i class="swt" style="background:#1f5fbf"></i>Bleu', '<i class="swt" style="background:#2e7d32"></i>Vert'], pick: 2, say: 'Couleur de police : bleu.', fx: h => h.st('#t', { color: '#1f5fbf' }) }
    ]},
    how: [
      'Sélectionnez le texte.',
      'Accueil › <b>Police</b> : ouvrez la liste et choisissez une police.',
      'À côté, la <b>taille</b> se mesure en points (11 pt pour un texte normal, 16 à 28 pt pour un titre).',
      'Le bouton <b>A</b> souligné de couleur change la <b>couleur de police</b>.',
      'Le bouton surligneur met un <b>fond coloré</b> derrière le texte.'
    ],
    tip: 'Limitez-vous à <b>deux polices</b> par document : une pour les titres, une pour le texte. C’est plus lisible.',
    android: 'Touchez le nom de la police dans le ruban (ex. « Calibri ») pour ouvrir la liste. La taille et la couleur sont juste à côté.',
    q: { q: 'La taille du texte se mesure en…', o: ['points (pt)', 'centimètres', 'kilos'], a: 0, why: 'Dans Word, la taille de police est indiquée en points : 11, 12, 14…' }
  },
  {
    id: 'd7', e: '↔️', t: 'Aligner le texte',
    intro: 'L’alignement place le texte à gauche, au centre, à droite ou bien droit des deux côtés (justifié).',
    scene: { tab: 'Accueil', doc: '<p id="t" style="font-size:17px;font-weight:700">Invitation</p><p id="p">Nous serons heureux de vous accueillir pour le repas du dimanche midi, à la salle communale, avec toute la famille.</p><p id="s">L’équipe d’organisation</p>', steps: [
      { t: 'sel', el: '#t', say: 'Sélectionnons le titre…' },
      { t: 'btn', id: 'alignC', say: '…et centrons-le.', fx: h => h.st('#t', { textAlign: 'center' }) },
      { t: 'sel', el: '#p', say: 'Le paragraphe…' },
      { t: 'btn', id: 'alignJ', say: 'Justifier : bords droits à gauche ET à droite.', fx: h => h.st('#p', { textAlign: 'justify' }) },
      { t: 'sel', el: '#s', say: 'La signature…' },
      { t: 'btn', id: 'alignR', say: 'Aligner à droite.', fx: h => h.st('#s', { textAlign: 'right' }) }
    ]},
    how: [
      'Placez le curseur dans le paragraphe (ou sélectionnez-le).',
      'Accueil › groupe <b>Paragraphe</b> : Gauche, Centrer, Droite ou Justifier.',
      '<b>Ctrl+E</b> centre rapidement un paragraphe.',
      'Le texte normal est souvent <b>à gauche</b> ou <b>justifié</b> ; les titres souvent <b>centrés</b>.'
    ],
    tip: 'L’alignement s’applique à <b>tout le paragraphe</b> : inutile de sélectionner chaque mot.',
    android: 'Les boutons d’alignement se trouvent dans l’onglet Accueil du ruban, groupe Paragraphe (faites défiler le ruban vers le bas).',
    q: { q: 'Quel alignement donne des bords bien droits à gauche ET à droite ?', o: ['Centré', 'Justifié', 'À droite'], a: 1, why: 'Justifié étire légèrement les espaces pour que chaque ligne touche les deux marges.' }
  },
  {
    id: 'd8', e: '📋', t: 'Copier, couper, coller',
    intro: 'Inutile de retaper un texte : copiez-le et collez-le ailleurs. Couper sert à le déplacer.',
    scene: { tab: 'Accueil', doc: '<p id="p">Ingrédients : <span id="w">lait de coco</span>, poisson, citron.</p><p id="p2">À acheter : </p>', steps: [
      { t: 'sel', el: '#w', say: 'On sélectionne « lait de coco ».' },
      { t: 'btn', id: 'copy', say: 'Copier (Ctrl+C) : Word garde une copie en mémoire.' },
      { t: 'point', el: '#p2', say: 'On clique là où le texte doit aller.', fx: h => h.unsel() },
      { t: 'btn', id: 'paste', say: 'Coller (Ctrl+V) : le texte apparaît !', fx: h => h.html('#p2', 'À acheter : <span class="flash">lait de coco</span>') }
    ]},
    how: [
      'Sélectionnez le texte.',
      '<b>Copier</b> (Ctrl+C) le garde en mémoire sans l’enlever.',
      '<b>Couper</b> (Ctrl+X) l’enlève pour le déplacer.',
      'Cliquez à l’endroit voulu puis <b>Coller</b> (Ctrl+V).',
      'Vous pouvez coller plusieurs fois le même texte.'
    ],
    tip: 'Texte copié depuis Internet avec une mise en forme bizarre ? Utilisez <b>Coller › Conserver uniquement le texte</b>.',
    android: 'Sélectionnez le texte : un petit menu apparaît avec <b>Copier</b>, <b>Couper</b>, <b>Coller</b>. Pour coller, maintenez le doigt à l’endroit voulu.',
    q: { q: 'Quelle est la différence entre Couper et Copier ?', o: ['Couper enlève le texte de son endroit d’origine', 'Il n’y a aucune différence', 'Copier efface le texte'], a: 0, why: 'Couper sert à déplacer ; Copier garde l’original en place.' }
  },
  {
    id: 'd9', e: '📝', t: 'Listes à puces et numérotées',
    intro: 'Une liste rend une information claire : des puces pour une énumération, des numéros pour des étapes dans l’ordre.',
    scene: { tab: 'Accueil', doc: '<div id="l1"><p>Riz</p><p>Œufs</p><p>Bananes</p></div><div id="l2"><p>Laver le riz</p><p>Cuire 15 minutes</p><p>Servir chaud</p></div>', steps: [
      { t: 'sel', el: '#l1', say: 'On sélectionne la liste des courses…' },
      { t: 'btn', id: 'bullets', say: 'Puces : chaque ligne reçoit un point.', fx: h => h.list('#l1', 'ul') },
      { t: 'sel', el: '#l2', say: 'On sélectionne les étapes de la recette…' },
      { t: 'btn', id: 'numbering', say: 'Numérotation : 1, 2, 3… automatiquement.', fx: h => h.list('#l2', 'ol') }
    ]},
    how: [
      'Sélectionnez les lignes (ou placez le curseur sur une ligne vide).',
      'Accueil › <b>Puces</b> ou <b>Numérotation</b>.',
      '<b>Entrée</b> ajoute un nouvel élément ; <b>Entrée deux fois</b> termine la liste.',
      '<b>Tab</b> crée un sous-niveau, <b>Maj+Tab</b> remonte d’un niveau.'
    ],
    tip: 'Tapez « 1. » puis un espace au début d’une ligne : Word lance la numérotation tout seul !',
    android: 'Les boutons Puces et Numérotation sont dans Accueil, groupe Paragraphe.',
    q: { q: 'Pour une recette expliquée étape par étape, on choisit…', o: ['Une liste à puces', 'Une liste numérotée'], a: 1, why: 'Les numéros indiquent un ordre à suivre.' }
  },
  {
    id: 'd10', e: '✔️', t: 'Vérifier l’orthographe',
    intro: 'Word repère les fautes possibles et vous propose des corrections. Encore faut-il savoir les lire !',
    scene: { tab: 'Accueil', doc: '<p id="p">Merci pour votre <span id="e" class="err">acceuil</span> chaleureux.</p>', steps: [
      { t: 'point', el: '#e', say: 'Un trait rouge ondulé : mot inconnu ou faute d’orthographe.' },
      { t: 'ctx', el: '#e', items: ['<b>accueil</b>', 'accueils', 'Ignorer tout', 'Ajouter au dictionnaire'], pick: 0, say: 'Clic droit sur le mot : on choisit la bonne orthographe.', fx: h => { h.text('#e', 'accueil'); h.rm('#e', 'err'); h.flash('#e'); } },
      { t: 'tab', name: 'Révision', say: 'Pour tout vérifier : onglet Révision…' },
      { t: 'btn', id: 'spell', say: '…bouton Orthographe et grammaire (touche F7).' },
      { t: 'dialog', title: 'Éditeur', html: '<p style="margin:4px 0">✅ Vérification terminée.<br>Aucune autre suggestion.</p>', ok: 'OK', say: 'Word parcourt tout le document.' }
    ]},
    how: [
      'Trait <b>rouge ondulé</b> : orthographe. Double trait <b>bleu</b> : grammaire.',
      '<b>Clic droit</b> sur le mot souligné pour voir les suggestions.',
      '<b>Révision › Orthographe et grammaire</b> (ou <b>F7</b>) vérifie tout le document.',
      '« <b>Ajouter au dictionnaire</b> » pour un nom propre que Word ne connaît pas.'
    ],
    tip: 'Word ne voit pas tout : « ver / vert / verre » bien orthographiés mais mal choisis passent souvent. Relisez-vous !',
    android: 'Touchez le mot souligné : les suggestions s’affichent. Vous pouvez aussi lancer la vérification depuis l’onglet Révision.',
    q: { q: 'Que veut dire un trait rouge ondulé sous un mot ?', o: ['Une faute d’orthographe possible', 'Un lien Internet', 'Un texte en gras'], a: 0, why: 'Le rouge ondulé signale un mot que Word ne reconnaît pas.' }
  }
  ]
},
/* ======================= INTERMÉDIAIRE ======================= */
{
  id: 'i', name: 'Intermédiaire', sub: 'Mettre en page comme un pro', color: '#2F6FD0', emoji: '🚀',
  lessons: [
  {
    id: 'i1', e: '🔠', t: 'Les styles de titres',
    intro: 'Les styles appliquent en un clic une mise en forme complète. Surtout, ils indiquent à Word ce qui est un titre : c’est la base des documents longs.',
    scene: { tab: 'Accueil', doc: '<p id="t">Rapport annuel</p><p id="s">1. Nos activités</p><p id="p">Cette année, nous avons organisé douze ateliers.</p>', steps: [
      { t: 'sel', el: '#t', say: 'Le titre principal…' },
      { t: 'btn', id: 'styleT1', say: 'Style « Titre 1 ».', fx: h => h.cls('#t', 'h1') },
      { t: 'sel', el: '#s', say: 'Le sous-titre…' },
      { t: 'btn', id: 'styleT2', say: 'Style « Titre 2 ».', fx: h => h.cls('#s', 'h2') },
      { t: 'point', el: '#p', say: 'Le texte courant reste en style « Normal ».', fx: h => h.unsel() }
    ]},
    how: [
      'Placez le curseur dans le titre.',
      'Accueil › galerie <b>Styles</b> : <b>Titre 1</b> pour les grandes parties, <b>Titre 2</b> pour les sous-parties.',
      'Le texte ordinaire reste en <b>Normal</b>.',
      'Clic droit sur un style › <b>Modifier</b> : tous les titres de ce style changent d’un coup.'
    ],
    tip: 'Les styles de titres permettent ensuite la <b>table des matières automatique</b> et le <b>volet de navigation</b> (niveau Avancé).',
    android: 'Dans Accueil, touchez <b>Styles</b> pour voir la liste et choisir Titre 1, Titre 2…',
    q: { q: 'Pourquoi utiliser Titre 1 / Titre 2 plutôt que mettre en gras à la main ?', o: ['Pour une mise en forme cohérente et une table des matières automatique', 'Parce que le gras est interdit', 'Pour réduire la taille du fichier'], a: 0, why: 'Les styles disent à Word quelle est la structure du document.' }
  },
  {
    id: 'i2', e: '🖼️', t: 'Insérer une image',
    intro: 'Une photo rend un document vivant. Il faut ensuite choisir comment le texte se place autour : c’est l’habillage.',
    scene: { tab: 'Accueil', doc: '<p id="p">Le marché de Papeete ouvre dès l’aube. On y trouve des fruits, des fleurs et du poisson frais. C’est un lieu animé et coloré, à visiter absolument.</p>', steps: [
      { t: 'point', el: '#p', say: 'On place le curseur là où l’image doit aller.' },
      { t: 'tab', name: 'Insertion', say: 'Onglet Insertion…' },
      { t: 'menu', from: 'image', items: ['Cet appareil…', 'Images de stock…', 'Images en ligne…'], pick: 0, say: 'Images › Cet appareil : une photo de votre ordinateur.' },
      { t: 'dialog', title: 'Insérer une image', html: '<div class="thumbs"><div class="th on">' + PHOTO(0) + '<span>marche.jpg</span></div><div class="th">' + PHOTO(1) + '<span>plage.jpg</span></div><div class="th">' + PHOTO(2) + '<span>tiare.jpg</span></div></div>', ok: 'Insérer', say: 'On choisit la photo puis « Insérer ».', fx: h => h.before('#p', '<div id="img" class="img flash">' + PHOTO(0) + '</div>') },
      { t: 'ctx', el: '#img', items: ['Aligné sur le texte', '<b>Carré</b>', 'Rapproché', 'Haut et bas', 'Derrière le texte'], pick: 1, say: 'Habillage du texte › Carré : le texte entoure l’image.', fx: h => h.cls('#img', 'float') }
    ]},
    how: [
      'Cliquez à l’endroit voulu.',
      '<b>Insertion › Images › Cet appareil</b>, choisissez la photo, puis <b>Insérer</b>.',
      'Agrandissez ou réduisez avec les <b>poignées d’angle</b> (pour garder les proportions).',
      'Bouton <b>Options de disposition</b> (ou clic droit › Habillage du texte) : <b>Carré</b> pour que le texte entoure l’image.',
      'Onglet <b>Format de l’image</b> : rogner, ajouter une bordure, une ombre…'
    ],
    tip: 'Une image trop lourde alourdit le fichier : <b>Format de l’image › Compresser les images</b>.',
    android: 'Insertion › <b>Images</b> ouvre la galerie de votre téléphone. Vous pouvez même prendre une photo directement avec <b>Appareil photo</b>.',
    q: { q: 'Quel réglage permet au texte d’entourer l’image ?', o: ['L’habillage du texte', 'La police', 'Le zoom'], a: 0, why: 'L’habillage (Carré, Rapproché…) définit comment le texte se place autour de l’image.' }
  },
  {
    id: 'i3', e: '▦', t: 'Insérer un tableau',
    intro: 'Un tableau range les informations en lignes et colonnes : un planning, une liste de prix, un horaire…',
    scene: { tab: 'Accueil', doc: '<p id="p">Planning de la semaine :</p><div id="tb"></div>', steps: [
      { t: 'tab', name: 'Insertion', say: 'Onglet Insertion…' },
      { t: 'grid', from: 'table', r: 3, c: 3, say: 'Tableau : on glisse sur la grille pour choisir 3 × 3.', fx: h => h.table('#tb', 3, 3) },
      { t: 'type', el: '#c00', text: 'Jour', say: 'On écrit dans la première case.' },
      { t: 'type', el: '#c01', text: 'Matin', say: 'Tab ⇥ passe à la case suivante.' },
      { t: 'type', el: '#c02', text: 'Soir', say: '…et encore Tab.' },
      { t: 'type', el: '#c10', text: 'Lundi', say: 'À la fin d’une ligne, Tab descend à la ligne suivante.' }
    ]},
    how: [
      '<b>Insertion › Tableau</b>, puis glissez sur la grille pour choisir le nombre de colonnes et de lignes.',
      '<b>Tab</b> passe à la cellule suivante. Dans la dernière cellule, Tab <b>ajoute une ligne</b>.',
      'Les onglets <b>Création de tableau</b> et <b>Disposition</b> apparaissent quand le curseur est dans le tableau.',
      'Disposition : insérer/supprimer des lignes et colonnes, fusionner des cellules.',
      'Création de tableau : choisir un style de couleurs tout prêt.'
    ],
    tip: 'Mettez la première ligne en gras ou avec un style de tableau : on comprend tout de suite ce que contient chaque colonne.',
    android: 'Insertion › <b>Tableau</b> crée un tableau ; l’onglet <b>Tableau</b> qui apparaît permet d’ajouter des lignes et des colonnes.',
    q: { q: 'Quelle touche passe à la cellule suivante d’un tableau ?', o: ['Tab', 'Entrée', 'Échap'], a: 0, why: 'Tab avance d’une cellule (Maj+Tab recule). Entrée crée un paragraphe dans la même cellule.' }
  },
  {
    id: 'i4', e: '📐', t: 'Marges et orientation',
    intro: 'Les marges sont les bords blancs autour du texte. L’orientation met la page en hauteur (portrait) ou en largeur (paysage).',
    scene: { tab: 'Accueil', doc: '<p class="h1">Affiche</p><p>Grande vente de plantes et de fleurs locales samedi matin sur la place du marché. Venez nombreux !</p><p>Entrée libre.</p>', steps: [
      { t: 'tab', name: 'Mise en page', say: 'Onglet Mise en page.' },
      { t: 'menu', from: 'margins', items: ['Normales (2,5 cm)', '<b>Étroites (1,27 cm)</b>', 'Larges (5 cm)', 'Marges personnalisées…'], pick: 1, say: 'Marges › Étroites : plus de place pour le texte.', fx: h => h.cls('.wm-page', 'narrow') },
      { t: 'menu', from: 'orientation', items: ['Portrait', '<b>Paysage</b>'], pick: 1, say: 'Orientation › Paysage : la page passe en largeur.', fx: h => h.cls('.wm-page', 'land') }
    ]},
    how: [
      '<b>Mise en page › Marges</b> : Normales, Étroites, Larges ou personnalisées.',
      '<b>Mise en page › Orientation</b> : Portrait (en hauteur) ou Paysage (en largeur).',
      '<b>Mise en page › Taille</b> : A4 (le format standard), A5, Lettre…',
      'Ces réglages s’appliquent à tout le document (ou à une section, niveau Avancé).'
    ],
    tip: 'Un grand tableau trop large ? Passez en <b>paysage</b> plutôt que de réduire la police.',
    android: 'L’onglet <b>Mise en page</b> existe aussi sur Android : Marges, Orientation, Taille.',
    q: { q: 'Pour imprimer un tableau très large, on choisit l’orientation…', o: ['Portrait', 'Paysage'], a: 1, why: 'Paysage donne plus de largeur à la page.' }
  },
  {
    id: 'i5', e: '↕️', t: 'Interligne et espacement',
    intro: 'Un texte trop serré fatigue les yeux. L’interligne règle l’espace entre les lignes.',
    scene: { tab: 'Accueil', doc: '<p id="p">Chers parents, la rentrée aura lieu lundi à 7 h 30. Merci de prévoir un cahier, une trousse complète et une gourde d’eau pour chaque enfant.</p>', steps: [
      { t: 'sel', el: '#p', say: 'On sélectionne le paragraphe.' },
      { t: 'menu', from: 'spacing', items: ['1,0', '1,15', '<b>1,5</b>', '2,0', 'Options d’interligne…'], pick: 2, say: 'Interligne › 1,5 : le texte respire.', fx: h => h.st('#p', { lineHeight: '1.95' }) }
    ]},
    how: [
      'Sélectionnez le ou les paragraphes.',
      'Accueil › bouton <b>Interligne et espacement</b> : 1,0 / 1,15 / 1,5 / 2,0.',
      '<b>Options d’interligne</b> règle aussi l’espace <b>avant</b> et <b>après</b> chaque paragraphe.',
      'Utilisez l’espace après paragraphe plutôt que des lignes vides avec Entrée.'
    ],
    tip: 'Pour des personnes qui lisent difficilement, un interligne de <b>1,5</b> et une police de <b>12 à 14 pt</b> facilitent beaucoup la lecture.',
    android: 'Dans Accueil, cherchez le bouton <b>Interligne</b> dans le groupe Paragraphe.',
    q: { q: 'L’interligne règle…', o: ['l’espace entre les lignes', 'la taille des lettres', 'les marges'], a: 0, why: 'Inter-ligne = espace entre deux lignes.' }
  },
  {
    id: 'i6', e: '🔢', t: 'En-tête, pied de page et numéros',
    intro: 'L’en-tête et le pied de page se répètent sur chaque page. Parfait pour un titre, une date ou le numéro de page.',
    scene: { tab: 'Accueil', doc: '<p class="h1">Bulletin</p><p>Ce mois-ci : la sortie au jardin botanique, les nouveaux livres et l’agenda des rencontres.</p>', steps: [
      { t: 'tab', name: 'Insertion', say: 'Onglet Insertion…' },
      { t: 'menu', from: 'header', items: ['<b>Vide</b>', 'Vide (trois colonnes)', 'Austin', 'Modifier l’en-tête'], pick: 0, say: 'En-tête › Vide : une zone s’ouvre en haut de la page.', fx: h => h.cls('.wm-page', 'hfe') },
      { t: 'type', el: '.hdr', text: 'Club de lecture — Bulletin n° 3', say: 'On tape le texte de l’en-tête.' },
      { t: 'menu', from: 'pagenum', items: ['Haut de page ›', '<b>Bas de page › Numéro simple (centré)</b>', 'Marges de la page ›', 'Format des numéros…'], pick: 1, say: 'N° de page › Bas de page : le numéro s’affiche tout seul.', fx: h => h.html('.ftr', '<span class="flash">1</span>') },
      { t: 'point', el: '.content', say: 'Double-clic dans la page pour revenir au texte.', fx: h => h.rm('.wm-page', 'hfe') }
    ]},
    how: [
      '<b>Insertion › En-tête</b> (ou Pied de page) et choisissez un modèle.',
      'Tapez votre texte : il apparaîtra sur <b>toutes les pages</b>.',
      '<b>Insertion › Numéro de page</b> : haut ou bas de page, à gauche, au centre ou à droite.',
      'Pour en sortir : <b>double-clic dans la page</b> ou bouton <b>Fermer l’en-tête</b>.',
      'Option « <b>Première page différente</b> » pour ne pas numéroter la page de garde.'
    ],
    tip: 'Ne tapez jamais les numéros de page à la main : Word les met à jour tout seul si vous ajoutez des pages.',
    android: 'Insertion › <b>En-tête et pied de page</b>, puis <b>Numéros de page</b> dans le même menu.',
    q: { q: 'Le numéro de page inséré dans le pied de page…', o: ['se met à jour tout seul sur chaque page', 'doit être retapé sur chaque page'], a: 0, why: 'C’est un champ automatique : Word calcule le numéro de chaque page.' }
  },
  {
    id: 'i7', e: '📄', t: 'Le saut de page',
    intro: 'Pour commencer un chapitre en haut d’une nouvelle page, on n’appuie pas vingt fois sur Entrée : on insère un saut de page.',
    scene: { tab: 'Accueil', doc: '<p id="p">… et c’est ainsi que se termine le premier chapitre.</p><p id="c2" class="h1">Chapitre 2</p><p>Le lendemain matin, le soleil se leva sur la baie.</p>', steps: [
      { t: 'point', el: '#c2', say: 'Curseur au début de « Chapitre 2 ».' },
      { t: 'tab', name: 'Insertion', say: 'Onglet Insertion…' },
      { t: 'btn', id: 'pagebreak', say: 'Saut de page (raccourci : Ctrl+Entrée).', fx: h => h.before('#c2', '<div class="pgap"><span>Page 2</span></div>') },
      { t: 'tab', name: 'Accueil', say: 'Retour dans Accueil…' },
      { t: 'btn', id: 'marks', say: '¶ Afficher tout montre les marques cachées, dont le saut de page.', fx: h => { h.cls('.wm-page', 'marks'); h.act('marks', true); } }
    ]},
    how: [
      'Placez le curseur au début du texte qui doit passer à la page suivante.',
      '<b>Insertion › Saut de page</b> ou <b>Ctrl+Entrée</b>.',
      'Pour voir (et supprimer) un saut de page : <b>Accueil › ¶ Afficher tout</b>.',
      'Pour le supprimer : sélectionnez la ligne « Saut de page » et appuyez sur <b>Suppr</b>.'
    ],
    tip: 'Avec des Entrée en série, la moindre modification décale tout. Le saut de page, lui, reste toujours au bon endroit.',
    android: 'Insertion › <b>Saut</b> › Saut de page.',
    q: { q: 'Pourquoi utiliser un saut de page plutôt que plein de fois Entrée ?', o: ['Le chapitre reste en haut de page même si le texte avant change', 'C’est juste plus joli'], a: 0, why: 'Le saut de page garantit le début d’une nouvelle page, quoi qu’il arrive avant.' }
  },
  {
    id: 'i8', e: '🔍', t: 'Rechercher et remplacer',
    intro: 'Une faute répétée vingt fois ? Word peut toutes les corriger d’un coup.',
    scene: { tab: 'Accueil', doc: '<p>Arrivée à <span class="r">Papetee</span> lundi. Visite du marché de <span class="r">Papetee</span> mardi. Départ de <span class="r">Papetee</span> jeudi.</p>', steps: [
      { t: 'btn', id: 'replace', say: 'Accueil › Remplacer (Ctrl+H).', fx: h => h.cls('.r', 'hl') },
      { t: 'dialog', title: 'Rechercher et remplacer', html: '<div class="fl"><label>Rechercher</label><div class="fld">Papetee</div></div><div class="fl"><label>Remplacer par</label><div class="fld">Papeete</div></div>', ok: 'Remplacer tout', say: 'On indique le mot faux, le mot juste, puis « Remplacer tout ».', fx: h => { h.text('.r', 'Papeete'); h.rm('.r', 'hl'); h.flash('.r'); } },
      { t: 'dialog', title: 'Microsoft Word', html: '<p style="margin:4px 0">3 remplacements effectués.</p>', ok: 'OK', say: 'Word indique le nombre de remplacements.' }
    ]},
    how: [
      '<b>Ctrl+F</b> : rechercher un mot (il est surligné partout dans le volet de navigation).',
      '<b>Ctrl+H</b> ou Accueil › <b>Remplacer</b> : remplacer un mot par un autre.',
      '<b>Remplacer</b> : un par un (vous vérifiez). <b>Remplacer tout</b> : tout d’un coup.',
      'Bouton <b>Plus</b> : respecter les majuscules, mot entier uniquement…'
    ],
    tip: 'Prudence avec « Remplacer tout » sur des mots courts : remplacer « an » par « année » transformerait aussi « plan » en « plannée » ! Cochez <b>Mot entier</b>.',
    android: 'Touchez la <b>loupe 🔍</b> en haut de l’écran ; la roue ⚙️ à côté propose <b>Remplacer</b>.',
    q: { q: 'Quel est le raccourci de Remplacer ?', o: ['Ctrl+H', 'Ctrl+R', 'Ctrl+P'], a: 0, why: 'Ctrl+F recherche, Ctrl+H remplace.' }
  },
  {
    id: 'i9', e: '🖨️', t: 'Imprimer et exporter en PDF',
    intro: 'Pour envoyer un document qui s’affichera pareil chez tout le monde, on l’exporte en PDF. Et pour l’avoir sur papier, on l’imprime.',
    scene: { tab: 'Accueil', name: 'Programme.docx', doc: '<p class="h1">Programme</p><p>8 h : accueil. 9 h : ateliers. 12 h : repas partagé.</p>', steps: [
      { t: 'file', pick: 'Exporter', then: 'Créer un document PDF/XPS', tiles: ['Créer un document PDF/XPS', 'Modifier le type de fichier'], say: 'Fichier › Exporter › Créer un document PDF.' },
      { t: 'dialog', title: 'Publier au format PDF', html: '<div class="fl"><label>Nom du fichier</label><div class="fld">Programme.pdf</div></div><div class="fl"><label>Type</label><div class="fld">PDF (*.pdf) ▾</div></div>', ok: 'Publier', say: 'On vérifie le nom puis « Publier ».' },
      { t: 'file', pick: 'Imprimer', then: 'Imprimer', tiles: ['Imprimer'], say: 'Fichier › Imprimer (Ctrl+P) : choix de l’imprimante, du nombre de copies, puis Imprimer.' }
    ]},
    how: [
      '<b>Fichier › Exporter › Créer un document PDF/XPS</b> (ou Enregistrer sous › type PDF).',
      'Le PDF garde exactement la mise en page, sur ordinateur comme sur téléphone.',
      '<b>Fichier › Imprimer</b> (Ctrl+P) : un aperçu s’affiche à droite.',
      'Réglez l’imprimante, le nombre de copies, les pages à imprimer (ex. « 1-3 »), recto verso.'
    ],
    tip: 'Regardez toujours l’<b>aperçu avant impression</b> : il évite de gaspiller du papier.',
    android: 'Ouvrez le menu du fichier en haut › <b>Exporter</b> ou <b>Imprimer</b> ; le PDF peut ensuite être partagé directement par message ou e-mail.',
    q: { q: 'Pourquoi envoyer un PDF plutôt qu’un fichier .docx ?', o: ['La mise en page reste identique sur tous les appareils', 'Parce que le PDF est plus facile à modifier'], a: 0, why: 'Le PDF fige la mise en page : polices, images et marges restent en place.' }
  }
  ]
},
/* ======================= AVANCÉ ======================= */
{
  id: 'a', name: 'Avancé', sub: 'Les outils des experts', color: '#8A3FC2', emoji: '🏆',
  lessons: [
  {
    id: 'a1', e: '📑', t: 'Table des matières automatique',
    intro: 'Grâce aux styles de titres, Word fabrique une table des matières avec les numéros de page… et la met à jour en un clic.',
    scene: { tab: 'Accueil', doc: '<div id="toc" class="tocph">↖ ici</div><p class="h1">Introduction</p><p>Notre projet est né en 2024.</p><p class="h2">Contexte</p><p>Le quartier manquait d’un lieu d’accueil.</p><p class="h1">Résultats</p><p>Plus de 300 visiteurs.</p><p id="new" class="h1"></p>', steps: [
      { t: 'point', el: '#toc', say: 'Curseur au tout début du document.' },
      { t: 'tab', name: 'Références', say: 'Onglet Références…' },
      { t: 'menu', from: 'toc', items: ['<b>Table automatique 1</b>', 'Table automatique 2', 'Table manuelle', 'Table des matières personnalisée…'], pick: 0, say: 'Table des matières › Table automatique 1.', fx: h => h.toc('#toc') },
      { t: 'type', el: '#new', text: 'Conclusion', say: 'Plus tard, on ajoute un titre « Conclusion » (style Titre 1)…' },
      { t: 'btn', id: 'updtoc', say: '…puis Mettre à jour la table (ou F9).' },
      { t: 'dialog', title: 'Mettre à jour la table', html: '<p style="margin:2px 0">◯ Mettre à jour les numéros de page uniquement<br>◉ <b>Mettre à jour toute la table</b></p>', ok: 'OK', say: 'On choisit « Mettre à jour toute la table ».', fx: h => h.toc('#toc') }
    ]},
    how: [
      'Appliquez les styles <b>Titre 1, Titre 2, Titre 3</b> à vos titres.',
      'Placez le curseur où la table doit apparaître (souvent page 2).',
      '<b>Références › Table des matières</b> › Table automatique.',
      'Après des modifications : <b>Mettre à jour la table</b> (ou clic dans la table + <b>F9</b>).',
      '<b>Ctrl + clic</b> sur une ligne de la table pour aller directement au chapitre.'
    ],
    tip: 'Un titre manque dans la table ? Il n’a sûrement pas de style Titre : appliquez-le, puis mettez la table à jour.',
    android: 'Sur Android, Word affiche et met à jour une table existante, mais la créer est plus confortable sur ordinateur.',
    q: { q: 'Sur quoi s’appuie la table des matières automatique ?', o: ['Les styles de titre (Titre 1, Titre 2…)', 'Le texte en gras', 'Les numéros tapés à la main'], a: 0, why: 'Word repère les paragraphes en style Titre pour construire la table.' }
  },
  {
    id: 'a2', e: '📰', t: 'Colonnes et sections',
    intro: 'Pour un journal ou un dépliant, on met le texte en colonnes. Word crée alors des « sections » : des parties du document qui ont leur propre mise en page.',
    scene: { tab: 'Accueil', doc: '<p class="h1">La gazette</p><p id="p">Ce mois-ci, le jardin partagé a produit ses premières récoltes : tomates, concombres, pota et basilic. Merci aux bénévoles qui arrosent chaque matin. Le prochain atelier aura lieu samedi : apportez vos graines à échanger !</p><p>Fin de la gazette.</p>', steps: [
      { t: 'sel', el: '#p', say: 'On sélectionne l’article.' },
      { t: 'tab', name: 'Mise en page', say: 'Onglet Mise en page…' },
      { t: 'menu', from: 'columns', items: ['Une', '<b>Deux</b>', 'Trois', 'Gauche', 'Droite', 'Autres colonnes…'], pick: 1, say: 'Colonnes › Deux.', fx: h => { h.unsel(); h.st('#p', { columnCount: '2', columnGap: '14px', textAlign: 'justify' }); h.before('#p', '<div class="sbreak" id="sb1">Saut de section (continu)</div>'); h.after('#p', '<div class="sbreak">Saut de section (continu)</div>'); } },
      { t: 'point', el: '#sb1', say: 'Word a ajouté des sauts de section : seule cette partie est en colonnes.' }
    ]},
    how: [
      'Sélectionnez le texte (ou rien pour tout le document).',
      '<b>Mise en page › Colonnes</b> : deux, trois…',
      'Word insère automatiquement des <b>sauts de section</b> autour de la sélection.',
      '<b>Mise en page › Sauts › Section : page suivante</b> pour, par exemple, mettre une seule page en paysage.',
      'Affichez les sauts avec <b>¶ Afficher tout</b>.'
    ],
    tip: '« Autres colonnes… » permet d’ajouter une <b>ligne séparatrice</b> entre les colonnes, très « journal ».',
    android: 'Mise en page › <b>Colonnes</b> est disponible sur Android.',
    q: { q: 'Un saut de section permet…', o: ['d’avoir une mise en page différente (colonnes, orientation…) dans une partie du document', 'de supprimer une page'], a: 0, why: 'Chaque section peut avoir ses colonnes, marges, orientation, en-têtes…' }
  },
  {
    id: 'a3', e: '¹', t: 'Notes de bas de page',
    intro: 'Une note de bas de page ajoute une précision sans alourdir le texte. Word numérote et place les notes tout seul.',
    scene: { tab: 'Accueil', doc: '<p id="p">Le <span id="w">tiare Tahiti</span><span id="m"></span> est la fleur emblème de la Polynésie.</p>', steps: [
      { t: 'point', el: '#w', say: 'Curseur juste après le mot à expliquer.' },
      { t: 'tab', name: 'Références', say: 'Onglet Références…' },
      { t: 'btn', id: 'footnote', say: 'Insérer une note de bas de page.', fx: h => { h.html('#m', '<sup class="flash">1</sup>'); h.html('#notes', '<div class="fnl"></div><p class="fn"><sup>1</sup> <span id="nt"></span></p>'); } },
      { t: 'type', el: '#nt', text: 'Nom scientifique : Gardenia taitensis.', say: 'Le curseur saute en bas de page : on écrit la note.' }
    ]},
    how: [
      'Placez le curseur après le mot.',
      '<b>Références › Insérer une note de bas de page</b>.',
      'Tapez la note en bas de page.',
      'Les notes sont <b>renumérotées automatiquement</b> si vous en ajoutez ou en supprimez.',
      'Pour supprimer une note : supprimez son <b>numéro dans le texte</b>.'
    ],
    tip: '« Insérer une note de fin » place toutes les notes à la fin du document plutôt qu’en bas de chaque page.',
    android: 'Les notes existantes s’affichent sur Android ; pour en créer, utilisez Références si l’onglet est proposé, sinon l’ordinateur.',
    q: { q: 'Si vous ajoutez une note avant la note 1…', o: ['Word renumérote automatiquement toutes les notes', 'Il faut tout renuméroter à la main'], a: 0, why: 'Les numéros de notes sont automatiques.' }
  },
  {
    id: 'a4', e: '🤝', t: 'Suivi des modifications et commentaires',
    intro: 'Pour relire un document à plusieurs, Word montre chaque changement en couleur. L’auteur peut ensuite accepter ou refuser.',
    scene: { tab: 'Accueil', doc: '<p id="p">La réunion aura lieu <span id="old">mardi</span> <span id="new"></span>à 14 h.</p>', steps: [
      { t: 'tab', name: 'Révision', say: 'Onglet Révision…' },
      { t: 'btn', id: 'track', say: 'On active le Suivi des modifications.', fx: h => h.act('track', true) },
      { t: 'sel', el: '#old', say: 'On sélectionne « mardi »…' },
      { t: 'key', keys: ['Suppr'], say: 'Supprimé : il apparaît barré en couleur.', fx: h => { h.unsel(); h.cls('#old', 'del'); } },
      { t: 'type', el: '#new', text: 'jeudi ', pre: h => h.cls('#new', 'ins'), say: 'Ajouté : il apparaît souligné en couleur.' },
      { t: 'btn', id: 'newcomment', say: 'Nouveau commentaire : une remarque dans la marge.', fx: h => h.after('#p', '<div class="cmt"><b>Hina</b> <span id="ct"></span></div>') },
      { t: 'type', el: '#ct', text: 'Jeudi me convient, merci !', say: 'On écrit le commentaire.' },
      { t: 'btn', id: 'accept', say: 'L’auteur accepte la modification : le texte devient définitif.', fx: h => { h.html('#old', ''); h.st('#old', { display: 'none' }); h.rm('#new', 'ins'); h.flash('#new'); } }
    ]},
    how: [
      '<b>Révision › Suivi des modifications</b> : chaque changement est enregistré.',
      'Texte supprimé = <b>barré</b>, texte ajouté = <b>souligné</b>, en couleur.',
      '<b>Révision › Nouveau commentaire</b> pour une remarque sans modifier le texte.',
      '<b>Accepter</b> ou <b>Refuser</b> chaque modification, ou toutes d’un coup.',
      'Pensez à <b>désactiver</b> le suivi et à tout accepter avant d’envoyer la version finale.'
    ],
    tip: 'Affichage « <b>Marques simples</b> » : le texte paraît propre, avec juste un trait rouge dans la marge là où il y a des changements.',
    android: 'L’onglet <b>Révision</b> existe sur Android : suivi des modifications, commentaires, accepter/refuser.',
    q: { q: 'Avec le suivi des modifications activé, un texte supprimé…', o: ['apparaît barré en couleur jusqu’à ce qu’on accepte ou refuse', 'disparaît définitivement'], a: 0, why: 'Le suivi garde une trace : rien n’est définitif avant d’être accepté.' }
  },
  {
    id: 'a5', e: '✉️', t: 'Le publipostage',
    intro: 'Une même lettre pour 50 personnes, avec le prénom de chacune ? Le publipostage fusionne un modèle de lettre et une liste (par exemple un tableau Excel).',
    scene: { tab: 'Accueil', doc: '<p>Bonjour <span id="f">&nbsp;&nbsp;&nbsp;&nbsp;</span>,</p><p>Vous êtes invité(e) à notre assemblée générale le 12 décembre.</p>', steps: [
      { t: 'tab', name: 'Publipostage', say: 'Onglet Publipostage…' },
      { t: 'menu', from: 'startmerge', items: ['<b>Lettres</b>', 'Messages électroniques', 'Enveloppes', 'Étiquettes'], pick: 0, say: 'Démarrer la fusion › Lettres.' },
      { t: 'menu', from: 'recipients', items: ['Taper une nouvelle liste…', '<b>Utiliser une liste existante…</b>', 'Choisir dans les contacts Outlook…'], pick: 1, say: 'Sélection des destinataires › Utiliser une liste existante.' },
      { t: 'dialog', title: 'Sélectionner la source de données', html: '<div class="fld">📊 Membres.xlsx</div><table class="mini"><tr><th>Prénom</th><th>Nom</th></tr><tr><td>Teva</td><td>Tapu</td></tr><tr><td>Moana</td><td>Lee</td></tr><tr><td>Hiro</td><td>Chang</td></tr></table>', ok: 'Ouvrir', say: 'On choisit le fichier Excel qui contient la liste.' },
      { t: 'point', el: '#f', say: 'Curseur après « Bonjour ».' },
      { t: 'menu', from: 'field', items: ['<b>Prénom</b>', 'Nom', 'Adresse'], pick: 0, say: 'Insérer un champ de fusion › Prénom.', fx: h => h.html('#f', '<span class="mfield flash">«Prénom»</span>') },
      { t: 'btn', id: 'preview', say: 'Aperçu des résultats : on voit la vraie lettre de Teva.', fx: h => { h.html('#f', '<span class="flash">Teva</span>'); h.act('preview', true); } },
      { t: 'menu', from: 'finish', items: ['<b>Modifier des documents individuels…</b>', 'Imprimer des documents…', 'Envoyer des messages électroniques…'], pick: 0, say: 'Terminer et fusionner : une lettre par personne !' }
    ]},
    how: [
      'Préparez votre liste dans Excel : une colonne par information (Prénom, Nom, Adresse…).',
      '<b>Publipostage › Démarrer la fusion › Lettres</b>.',
      '<b>Sélection des destinataires › Utiliser une liste existante</b> et choisissez le fichier.',
      '<b>Insérer un champ de fusion</b> aux bons endroits de la lettre.',
      '<b>Aperçu des résultats</b> pour vérifier, puis <b>Terminer et fusionner</b>.'
    ],
    tip: 'L’<b>Assistant Fusion et publipostage</b> (dans Démarrer la fusion) vous guide pas à pas si c’est la première fois.',
    android: 'Le publipostage n’est pas disponible sur l’application Android : il se fait sur ordinateur.',
    q: { q: 'Le publipostage sert à…', o: ['créer automatiquement une lettre personnalisée pour chaque personne d’une liste', 'corriger l’orthographe'], a: 0, why: 'Il fusionne un document modèle avec une liste de destinataires.' }
  },
  {
    id: 'a6', e: '🧩', t: 'Modifier un style et créer un modèle',
    intro: 'Changez l’apparence de tous les titres en une seule fois, puis enregistrez votre document comme modèle pour le réutiliser.',
    scene: { tab: 'Accueil', name: 'Bulletin.docx', doc: '<p class="h1">Les nouvelles</p><p>Texte de la rubrique…</p><p class="h1">L’agenda</p><p>Texte de la rubrique…</p>', steps: [
      { t: 'ctx', el: '.rb[data-id="styleT1"]', items: ['Mettre à jour Titre 1 pour correspondre à la sélection', '<b>Modifier…</b>', 'Renommer…', 'Supprimer de la galerie'], pick: 1, say: 'Clic droit sur le style Titre 1 › Modifier.' },
      { t: 'dialog', title: 'Modifier le style', html: '<div class="fl"><label>Nom</label><div class="fld">Titre 1</div></div><div class="fl"><label>Mise en forme</label><div class="fld">Georgia ▾ &nbsp; 16 ▾ &nbsp; <i class="swt" style="background:#7b2d8e"></i>▾</div></div><p style="margin:6px 0 0;font-size:11px">☐ Nouveaux documents basés sur ce modèle</p>', ok: 'OK', say: 'Nouvelle police et nouvelle couleur…', fx: h => { h.st('.content .h1', { fontFamily: 'Georgia, serif', color: '#7b2d8e' }); h.flash('.content .h1'); } },
      { t: 'file', pick: 'Enregistrer sous', then: 'Parcourir', tiles: ['OneDrive', 'Ce PC', 'Parcourir'], say: 'Tous les titres ont changé ! Maintenant : Enregistrer sous…' },
      { t: 'dialog', title: 'Enregistrer sous', html: '<div class="fl"><label>Nom du fichier</label><div class="fld">Bulletin</div></div><div class="fl"><label>Type</label><div class="fld"><b>Modèle Word (*.dotx)</b> ▾</div></div>', ok: 'Enregistrer', say: '…type « Modèle Word (.dotx) » : un modèle réutilisable.', fx: h => h.title('Bulletin.dotx') }
    ]},
    how: [
      'Clic droit sur un style de la galerie › <b>Modifier</b> : police, taille, couleur, espacements…',
      'Tous les paragraphes de ce style changent <b>en même temps</b>.',
      'Ou : mettez en forme un titre, puis clic droit › <b>Mettre à jour … pour correspondre à la sélection</b>.',
      '<b>Enregistrer sous › Modèle Word (*.dotx)</b> pour créer un modèle.',
      'Ouvrir un modèle crée un <b>nouveau document</b> : le modèle reste intact.'
    ],
    tip: 'Créez un modèle pour vos courriers habituels (en-tête, logo, styles) : vous gagnerez du temps à chaque lettre.',
    android: 'Les modèles se créent sur ordinateur ; sur Android, vous pouvez ensuite ouvrir des documents créés à partir d’eux.',
    q: { q: 'Un fichier .dotx, c’est…', o: ['un modèle Word réutilisable', 'un PDF', 'une image'], a: 0, why: '.dotx = modèle ; .docx = document normal.' }
  },
  {
    id: 'a7', e: '🧭', t: 'Naviguer dans un long document',
    intro: 'Dans un document de 80 pages, le volet de navigation affiche tous les titres : un clic et vous y êtes.',
    scene: { tab: 'Accueil', doc: '<p class="h1">1. Accueil</p><p>Présentation de l’association.</p><p class="h1">2. Activités</p><p class="h2">Ateliers</p><p>Couture, cuisine, informatique.</p><p class="h2">Sorties</p><p>Randonnées et visites.</p><p class="h1">3. Budget</p><p>Les comptes de l’année.</p><p class="h1">4. Contacts</p><p>Téléphone et adresse.</p>', steps: [
      { t: 'tab', name: 'Affichage', say: 'Onglet Affichage…' },
      { t: 'btn', id: 'navpane', say: 'Volet de navigation : la liste des titres apparaît.', fx: h => { h.nav(); h.act('navpane', true); } },
      { t: 'point', el: '.wm-nav .ni[data-i="5"]', say: 'Un clic sur « 3. Budget »…', fx: h => h.go(5) },
      { t: 'key', keys: ['Ctrl', 'F'], say: 'Ctrl+F : chercher un mot, les résultats s’affichent dans le volet.' }
    ]},
    how: [
      '<b>Affichage › Volet de navigation</b> (ou <b>Ctrl+F</b>).',
      'L’onglet <b>Titres</b> liste les titres (styles Titre 1, 2, 3…).',
      'Cliquez sur un titre pour y aller ; <b>glissez</b> un titre pour déplacer tout le chapitre !',
      'L’onglet <b>Pages</b> montre les miniatures des pages.'
    ],
    tip: 'Glisser-déposer un titre dans le volet déplace <b>toute sa partie</b> (texte, images, tableaux). Idéal pour réorganiser un rapport.',
    android: 'Sur Android, la <b>loupe 🔍</b> permet de rechercher ; le mode Lecture (livre ouvert) aide aussi à parcourir un long document.',
    q: { q: 'Le volet de navigation affiche…', o: ['les titres du document pour s’y rendre d’un clic', 'seulement les images'], a: 0, why: 'Il se base sur les styles de titres.' }
  },
  {
    id: 'a8', e: '⚡', t: 'Les raccourcis des pros',
    intro: 'Les experts gardent les mains sur le clavier. Voici les raccourcis qui font gagner le plus de temps.',
    scene: { tab: 'Accueil', doc: '<p id="t">programme de la journée</p><p id="p">Visite de <span id="w">tahiti</span> et de Moorea en bateau.</p>', steps: [
      { t: 'sel', el: '#w', say: 'Un mot écrit sans majuscule…' },
      { t: 'key', keys: ['Maj', 'F3'], say: 'Maj+F3 change la casse : tahiti → Tahiti…', fx: h => h.text('#w', 'Tahiti') },
      { t: 'key', keys: ['Maj', 'F3'], say: '…et encore : TAHITI.', fx: h => h.text('#w', 'TAHITI') },
      { t: 'key', keys: ['Ctrl', 'Z'], say: 'Ctrl+Z pour revenir à « Tahiti ».', fx: h => h.text('#w', 'Tahiti') },
      { t: 'sel', el: '#t', say: 'Le titre…' },
      { t: 'key', keys: ['Ctrl', 'E'], say: 'Ctrl+E le centre.', fx: h => h.st('#t', { textAlign: 'center', fontWeight: '700' }) }
    ]},
    how: [
      '<b>Ctrl+C / Ctrl+X / Ctrl+V</b> : copier, couper, coller.',
      '<b>Ctrl+Z / Ctrl+Y</b> : annuler, rétablir.',
      '<b>Ctrl+S</b> enregistrer · <b>Ctrl+P</b> imprimer · <b>Ctrl+N</b> nouveau document.',
      '<b>Ctrl+F</b> rechercher · <b>Ctrl+H</b> remplacer · <b>F7</b> orthographe.',
      '<b>Ctrl+Entrée</b> saut de page · <b>Ctrl+E</b> centrer · <b>Maj+F3</b> changer la casse.',
      '<b>Ctrl+Début / Ctrl+Fin</b> : aller au début / à la fin du document.'
    ],
    tip: 'Appuyez sur la touche <b>Alt</b> : des lettres apparaissent sur le ruban. Vous pouvez alors tout piloter au clavier !',
    android: 'Avec un clavier Bluetooth branché sur une tablette Android, la plupart de ces raccourcis fonctionnent aussi.',
    q: { q: 'Quel raccourci insère un saut de page ?', o: ['Ctrl+Entrée', 'Maj+F3', 'Ctrl+E'], a: 0, why: 'Ctrl+Entrée = saut de page. Maj+F3 change la casse, Ctrl+E centre.' }
  }
  ]
}
];

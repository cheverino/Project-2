# Correction du système de design des boutons

## Problèmes résolus

### 1. Rayon des coins (Border Radius) des boutons
**Avant:** Les classes Tailwind (`rounded-xl`) avaient la priorité sur les styles inline
**Après:**
- Utilisation de `[&]:!rounded-none [&]:!p-0` pour neutraliser les classes Tailwind
- Application des styles via inline styles avec les valeurs personnalisées
- Ajout d'un curseur (slider) pour faciliter l'ajustement (0-50px)

### 2. Padding des boutons
**Avant:** Les classes Tailwind (`px-6`, `py-4`) étaient codées en dur
**Après:**
- Neutralisation des classes de padding Tailwind
- Ajout de deux curseurs séparés pour padding horizontal (8-64px) et vertical (4-32px)
- Application via inline styles

### 3. Interface utilisateur améliorée
**Avant:** Champs texte pour saisir les valeurs CSS
**Après:**
- Curseurs (sliders) pour un ajustement visuel et intuitif
- Affichage en temps réel de la valeur sélectionnée
- Plages de valeurs logiques pour éviter les erreurs

## Fichiers modifiés

1. **src/lib/designHelpers.ts**
   - Fonction `getButtonStyles()` retourne maintenant les styles avec les bonnes valeurs par défaut

2. **src/components/PageBuilder/DesignCategories.tsx**
   - Ajout du composant `SliderField` pour les curseurs
   - Remplacement des champs texte par des curseurs pour:
     - Rayon des coins (0-50px)
     - Padding horizontal (8-64px)
     - Padding vertical (4-32px)

3. **src/components/PageBuilder/Widgets/CTAWidget.tsx**
   - Ajout de `[&]:!rounded-none [&]:!p-0` aux classes des boutons
   - Garantit que les styles inline ont la priorité

4. **src/components/PageBuilder/WidgetButton.tsx**
   - Composant réutilisable avec les mêmes corrections
   - Prêt à être utilisé dans d'autres widgets

## Utilisation

Les curseurs sont maintenant disponibles dans le panneau "Boutons" du page builder:

1. **Rayon des coins**: Ajustez de 0px (carré) à 50px (très arrondi)
2. **Padding horizontal**: Contrôlez la largeur du bouton (8-64px)
3. **Padding vertical**: Contrôlez la hauteur du bouton (4-32px)

Les valeurs sont appliquées en temps réel et stockées dans la base de données.

## Options grisées par widget

Le système désactive automatiquement les options non applicables:
- Les widgets sans boutons ont la catégorie "Boutons" grisée
- Les widgets sans contours ont "Contours" grisé
- etc.

Voir `src/lib/widgetDesignCapabilities.ts` pour la configuration par widget.

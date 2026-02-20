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
- Parsing correct des valeurs avec unités (12px, 32px, etc.)

## Fichiers modifiés

1. **src/lib/designHelpers.ts**
   - Fonction `getButtonStyles()` retourne maintenant les styles avec les bonnes valeurs par défaut
   - Retourne borderRadius et padding pour application inline

2. **src/components/PageBuilder/DesignCategories.tsx**
   - Ajout du composant `SliderField` pour les curseurs
   - Remplacement des champs texte par des curseurs pour:
     - Rayon des coins (0-50px)
     - Padding horizontal (8-64px)
     - Padding vertical (4-32px)
   - Parsing correct des valeurs CSS avec `.replace('px', '')` pour extraire les nombres

3. **Widgets mis à jour avec getButtonStyles():**
   - **CTAWidget.tsx**: Tous les boutons (primaire et secondaire)
   - **HeroWidget.tsx**: Import de `getButtonStyles`, tous les boutons dans toutes les variantes
   - **NewsletterWidget.tsx**: Tous les boutons dans les 4 variantes (centered, split, inline, card)
   - **StatsWidget.tsx**: Bouton dans la variante split
   - **WidgetButton.tsx**: Composant réutilisable

4. **Classes CSS appliquées:**
   - Ajout systématique de `[&]:!rounded-none [&]:!p-0` pour neutraliser Tailwind
   - Conservation des autres classes (transitions, hover effects, etc.)

## Utilisation

Les curseurs sont maintenant disponibles dans le panneau "Boutons" du page builder:

1. **Rayon des coins**: Ajustez de 0px (carré) à 50px (très arrondi)
2. **Padding horizontal**: Contrôlez la largeur du bouton (8-64px, pas de 4px)
3. **Padding vertical**: Contrôlez la hauteur du bouton (4-32px, pas de 2px)

Les valeurs sont appliquées en temps réel et stockées dans la base de données.

### Comment ça fonctionne

1. **Parsing des valeurs**: Les valeurs CSS comme "12px" ou "32px" sont parsées avec `.replace('px', '')` pour extraire le nombre
2. **Curseurs synchronisés**: Les curseurs reflètent toujours la valeur actuelle du design
3. **Application inline**: Les styles sont appliqués via `style={buttonStyle}` avec les valeurs de `getButtonStyles(section)`
4. **Override Tailwind**: Les classes `[&]:!rounded-none [&]:!p-0` forcent la réinitialisation des styles Tailwind
5. **Priorité CSS**: Les styles inline ont maintenant la priorité grâce à `!important` dans les classes

## Options grisées par widget

Le système désactive automatiquement les options non applicables:
- Les widgets sans boutons ont la catégorie "Boutons" grisée
- Les widgets sans contours ont "Contours" grisé
- etc.

Voir `src/lib/widgetDesignCapabilities.ts` pour la configuration par widget.

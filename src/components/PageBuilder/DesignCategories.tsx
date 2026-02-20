import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { PageBuilderSection } from '../../lib/pageBuilderTypes';
import { getWidgetCapabilities } from '../../lib/widgetDesignCapabilities';

interface DesignCategoriesProps {
  section: PageBuilderSection;
  updateDesign: (category: string, key: string, value: any) => void;
}

interface CategoryProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  disabled?: boolean;
}

function Category({ title, children, defaultOpen = true, disabled = false }: CategoryProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={`border border-gray-200 rounded-lg overflow-hidden ${disabled ? 'opacity-40' : ''}`}>
      <button
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`w-full flex items-center justify-between px-4 py-3 bg-gray-50 transition-colors ${disabled ? 'cursor-not-allowed' : 'hover:bg-gray-100'}`}
      >
        <span className="text-sm font-semibold text-gray-900">{title}</span>
        {isOpen ? (
          <ChevronDown className="w-4 h-4 text-gray-500" />
        ) : (
          <ChevronRight className="w-4 h-4 text-gray-500" />
        )}
      </button>
      {isOpen && !disabled && <div className="p-4 space-y-3 bg-white">{children}</div>}
    </div>
  );
}

interface ColorFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

function ColorField({ label, value, onChange, disabled = false }: ColorFieldProps) {
  return (
    <div className={disabled ? 'opacity-40' : ''}>
      <label className="block text-xs text-gray-600 mb-1">{label}</label>
      <div className="flex items-center space-x-2">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className={`w-12 h-10 rounded border border-gray-300 ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-black focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
        />
      </div>
    </div>
  );
}

interface TextFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

function TextField({ label, value, onChange, placeholder, disabled = false }: TextFieldProps) {
  return (
    <div className={disabled ? 'opacity-40' : ''}>
      <label className="block text-xs text-gray-600 mb-1">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-black focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
        placeholder={placeholder}
      />
    </div>
  );
}

interface SelectFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string }>;
}

function SelectField({ label, value, onChange, options }: SelectFieldProps) {
  return (
    <div>
      <label className="block text-xs text-gray-600 mb-1">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-black focus:border-transparent bg-white"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default function DesignCategories({ section, updateDesign }: DesignCategoriesProps) {
  const capabilities = getWidgetCapabilities(section.type);

  return (
    <div className="space-y-4">
      <Category title="Couleurs" defaultOpen={false} disabled={!capabilities.colors}>
        <ColorField
          label="Couleur du titre"
          value={section.design.typography?.headingColor || '#111827'}
          onChange={(value) => updateDesign('typography', 'headingColor', value)}
        />
        <ColorField
          label="Couleur du texte"
          value={section.design.typography?.textColor || '#4B5563'}
          onChange={(value) => updateDesign('typography', 'textColor', value)}
        />
        <ColorField
          label="Couleur d'accent"
          value={section.design.colors?.accentColor || '#000000'}
          onChange={(value) => updateDesign('colors', 'accentColor', value)}
        />
      </Category>

      <Category title="Boutons" defaultOpen={false} disabled={!capabilities.buttons}>
        <ColorField
          label="Couleur du fond"
          value={section.design.colors?.buttonBackground || '#000000'}
          onChange={(value) => updateDesign('colors', 'buttonBackground', value)}
        />
        <ColorField
          label="Couleur du texte"
          value={section.design.colors?.buttonText || '#ffffff'}
          onChange={(value) => updateDesign('colors', 'buttonText', value)}
        />
        <ColorField
          label="Couleur au survol"
          value={section.design.colors?.buttonBackgroundHover || '#1F2937'}
          onChange={(value) => updateDesign('colors', 'buttonBackgroundHover', value)}
        />
        <TextField
          label="Rayon des coins"
          value={section.design.button?.borderRadius || '8px'}
          onChange={(value) => updateDesign('button', 'borderRadius', value)}
          placeholder="ex: 8px, 999px"
        />
        <TextField
          label="Padding"
          value={section.design.button?.padding || '12px 24px'}
          onChange={(value) => updateDesign('button', 'padding', value)}
          placeholder="ex: 12px 24px"
        />
      </Category>

      <Category title="Contours" defaultOpen={false} disabled={!capabilities.borders}>
        <TextField
          label="Largeur du contour"
          value={section.design.border?.width || '0px'}
          onChange={(value) => updateDesign('border', 'width', value)}
          placeholder="ex: 1px, 2px"
        />
        <ColorField
          label="Couleur du contour"
          value={section.design.border?.color || '#e5e7eb'}
          onChange={(value) => updateDesign('border', 'color', value)}
        />
        <SelectField
          label="Style du contour"
          value={section.design.border?.style || 'solid'}
          onChange={(value) => updateDesign('border', 'style', value)}
          options={[
            { value: 'solid', label: 'Solide' },
            { value: 'dashed', label: 'Tirets' },
            { value: 'dotted', label: 'Points' },
            { value: 'none', label: 'Aucun' },
          ]}
        />
        <TextField
          label="Rayon des coins"
          value={section.design.border?.radius || '0px'}
          onChange={(value) => updateDesign('border', 'radius', value)}
          placeholder="ex: 8px, 16px"
        />
      </Category>

      <Category title="Ombres" defaultOpen={false} disabled={!capabilities.shadows}>
        <SelectField
          label="Taille de l'ombre"
          value={section.design.shadow?.size || 'none'}
          onChange={(value) => updateDesign('shadow', 'size', value)}
          options={[
            { value: 'none', label: 'Aucune' },
            { value: 'sm', label: 'Petite' },
            { value: 'md', label: 'Moyenne' },
            { value: 'lg', label: 'Grande' },
            { value: 'xl', label: 'Très grande' },
            { value: '2xl', label: 'Extra grande' },
          ]}
        />
        <TextField
          label="Ombre personnalisée"
          value={section.design.shadow?.custom || ''}
          onChange={(value) => updateDesign('shadow', 'custom', value)}
          placeholder="ex: 0 10px 15px rgba(0,0,0,0.1)"
        />
        <ColorField
          label="Couleur de l'ombre"
          value={section.design.shadow?.color || 'rgba(0, 0, 0, 0.1)'}
          onChange={(value) => updateDesign('shadow', 'color', value)}
        />
      </Category>

      <Category title="Arrière-plan" defaultOpen={false} disabled={!capabilities.background}>
        <SelectField
          label="Type"
          value={section.design.background?.type || 'color'}
          onChange={(value) => updateDesign('background', 'type', value)}
          options={[
            { value: 'color', label: 'Couleur unie' },
            { value: 'gradient', label: 'Dégradé' },
            { value: 'image', label: 'Image' },
          ]}
        />
        {section.design.background?.type === 'color' && (
          <ColorField
            label="Couleur"
            value={section.design.background.value || '#ffffff'}
            onChange={(value) => updateDesign('background', 'value', value)}
          />
        )}
        {section.design.background?.type === 'gradient' && (
          <>
            <TextField
              label="Dégradé CSS"
              value={section.design.background.value || 'linear-gradient(to right, #000000, #ffffff)'}
              onChange={(value) => updateDesign('background', 'value', value)}
              placeholder="ex: linear-gradient(to right, #000, #fff)"
            />
          </>
        )}
        {section.design.background?.type === 'image' && (
          <>
            <TextField
              label="URL de l'image"
              value={section.design.background.value || ''}
              onChange={(value) => updateDesign('background', 'value', value)}
              placeholder="https://..."
            />
            <SelectField
              label="Taille"
              value={section.design.background.size || 'cover'}
              onChange={(value) => updateDesign('background', 'size', value)}
              options={[
                { value: 'cover', label: 'Couvrir' },
                { value: 'contain', label: 'Contenir' },
                { value: 'auto', label: 'Auto' },
              ]}
            />
            <SelectField
              label="Position"
              value={section.design.background.position || 'center'}
              onChange={(value) => updateDesign('background', 'position', value)}
              options={[
                { value: 'center', label: 'Centre' },
                { value: 'top', label: 'Haut' },
                { value: 'bottom', label: 'Bas' },
                { value: 'left', label: 'Gauche' },
                { value: 'right', label: 'Droite' },
              ]}
            />
          </>
        )}
      </Category>

      <Category title="Espacement" defaultOpen={false} disabled={!capabilities.spacing}>
        <TextField
          label="Padding haut"
          value={section.design.spacing?.paddingTop || '0px'}
          onChange={(value) => updateDesign('spacing', 'paddingTop', value)}
          placeholder="ex: 80px"
        />
        <TextField
          label="Padding bas"
          value={section.design.spacing?.paddingBottom || '0px'}
          onChange={(value) => updateDesign('spacing', 'paddingBottom', value)}
          placeholder="ex: 80px"
        />
        <TextField
          label="Padding gauche"
          value={section.design.spacing?.paddingLeft || '0px'}
          onChange={(value) => updateDesign('spacing', 'paddingLeft', value)}
          placeholder="ex: 20px"
        />
        <TextField
          label="Padding droit"
          value={section.design.spacing?.paddingRight || '0px'}
          onChange={(value) => updateDesign('spacing', 'paddingRight', value)}
          placeholder="ex: 20px"
        />
        <TextField
          label="Marge haut"
          value={section.design.spacing?.marginTop || '0px'}
          onChange={(value) => updateDesign('spacing', 'marginTop', value)}
          placeholder="ex: 0px"
        />
        <TextField
          label="Marge bas"
          value={section.design.spacing?.marginBottom || '0px'}
          onChange={(value) => updateDesign('spacing', 'marginBottom', value)}
          placeholder="ex: 0px"
        />
      </Category>

      <Category title="Typographie" defaultOpen={false} disabled={!capabilities.typography}>
        <TextField
          label="Famille de police"
          value={section.design.typography?.fontFamily || 'inherit'}
          onChange={(value) => updateDesign('typography', 'fontFamily', value)}
          placeholder="ex: Inter, sans-serif"
        />
        <TextField
          label="Taille du titre"
          value={section.design.typography?.headingSize || '2.5rem'}
          onChange={(value) => updateDesign('typography', 'headingSize', value)}
          placeholder="ex: 2.5rem, 40px"
        />
        <TextField
          label="Taille du texte"
          value={section.design.typography?.fontSize || '1rem'}
          onChange={(value) => updateDesign('typography', 'fontSize', value)}
          placeholder="ex: 1rem, 16px"
        />
        <TextField
          label="Hauteur de ligne"
          value={section.design.typography?.lineHeight || '1.5'}
          onChange={(value) => updateDesign('typography', 'lineHeight', value)}
          placeholder="ex: 1.5"
        />
        <SelectField
          label="Poids du titre"
          value={section.design.typography?.headingWeight || '700'}
          onChange={(value) => updateDesign('typography', 'headingWeight', value)}
          options={[
            { value: '300', label: 'Léger (300)' },
            { value: '400', label: 'Normal (400)' },
            { value: '500', label: 'Moyen (500)' },
            { value: '600', label: 'Semi-gras (600)' },
            { value: '700', label: 'Gras (700)' },
            { value: '800', label: 'Extra-gras (800)' },
            { value: '900', label: 'Noir (900)' },
          ]}
        />
      </Category>

      <Category title="Effets" defaultOpen={false} disabled={!capabilities.effects}>
        <TextField
          label="Opacité"
          value={section.design.effects?.opacity || '1'}
          onChange={(value) => updateDesign('effects', 'opacity', value)}
          placeholder="ex: 1 (0 à 1)"
        />
        <TextField
          label="Transformation"
          value={section.design.effects?.transform || ''}
          onChange={(value) => updateDesign('effects', 'transform', value)}
          placeholder="ex: rotate(5deg)"
        />
        <TextField
          label="Filtre"
          value={section.design.effects?.filter || ''}
          onChange={(value) => updateDesign('effects', 'filter', value)}
          placeholder="ex: blur(5px)"
        />
        <TextField
          label="Transition"
          value={section.design.effects?.transition || 'all 0.3s ease'}
          onChange={(value) => updateDesign('effects', 'transition', value)}
          placeholder="ex: all 0.3s ease"
        />
      </Category>

      <Category title="Mise en page" defaultOpen={false} disabled={!capabilities.layout}>
        <SelectField
          label="Largeur maximale"
          value={section.design.layout?.maxWidth || '1280px'}
          onChange={(value) => updateDesign('layout', 'maxWidth', value)}
          options={[
            { value: '100%', label: 'Pleine largeur' },
            { value: '1280px', label: 'Standard (1280px)' },
            { value: '1024px', label: 'Étroit (1024px)' },
            { value: '768px', label: 'Compact (768px)' },
          ]}
        />
        <SelectField
          label="Alignement"
          value={section.design.layout?.alignment || 'center'}
          onChange={(value) => updateDesign('layout', 'alignment', value)}
          options={[
            { value: 'left', label: 'Gauche' },
            { value: 'center', label: 'Centre' },
            { value: 'right', label: 'Droite' },
          ]}
        />
      </Category>
    </div>
  );
}

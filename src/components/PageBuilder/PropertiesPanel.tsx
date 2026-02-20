import { useState } from 'react';
import { Settings, Palette, Code } from 'lucide-react';
import { PageBuilderSection } from '../../lib/pageBuilderTypes';
import { widgetLibrary } from '../../lib/widgetLibrary';
import WidgetThemeSelector from './WidgetThemeSelector';
import DesignCategories from './DesignCategories';
import {
  HeroContentEditor,
  CTAContentEditor,
  HeaderContentEditor,
  ContactContentEditor,
  FeaturesContentEditor,
  TestimonialsContentEditor,
  FooterContentEditor,
  ImageTextSplitContentEditor,
  ContentShowcaseContentEditor,
  CenteredContentContentEditor,
  TextColumnsContentEditor,
} from './ContentEditors';
import { HeroAdvancedEditor } from './HeroAdvancedEditor';

interface PropertiesPanelProps {
  section: PageBuilderSection | null;
  onUpdateSection: (updates: Partial<PageBuilderSection>) => void;
}

type TabType = 'content' | 'design' | 'advanced';

export default function PropertiesPanel({ section, onUpdateSection }: PropertiesPanelProps) {
  const [activeTab, setActiveTab] = useState<TabType>('content');

  if (!section) {
    return (
      <div className="w-80 bg-white border-l border-gray-200 flex flex-col items-center justify-center p-8 text-center">
        <Settings className="w-12 h-12 text-gray-300 mb-4" />
        <p className="text-gray-500">
          Selectionnez une section pour editer ses proprietes
        </p>
      </div>
    );
  }

  const updateContent = (key: string, value: any) => {
    onUpdateSection({
      content: { ...section.content, [key]: value },
    });
  };

  const updateDesign = (category: string, key: string, value: any) => {
    onUpdateSection({
      design: {
        ...section.design,
        [category]: { ...section.design[category as keyof typeof section.design], [key]: value },
      },
    });
  };

  const updateVariant = (newVariant: string) => {
    onUpdateSection({ variant: newVariant });
  };

  const editorProps = { section, updateContent };

  const renderGenericEditor = () => {
    const inputClass = 'w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-black focus:border-transparent';
    const labelClass = 'block text-sm font-medium text-gray-700 mb-2';

    const renderField = (key: string, value: any) => {
      if (typeof value === 'string') {
        if (key.toLowerCase().includes('image') || key.toLowerCase().includes('url') || key.toLowerCase().includes('avatar') || key.toLowerCase().includes('logo')) {
          return (
            <div key={key}>
              <label className={labelClass}>{key}</label>
              <input
                type="text"
                value={section.content[key] || ''}
                onChange={(e) => updateContent(key, e.target.value)}
                className={inputClass}
                placeholder="URL de l'image"
              />
            </div>
          );
        }
        if (key.toLowerCase().includes('description') || key.toLowerCase().includes('text') || value.length > 100) {
          return (
            <div key={key}>
              <label className={labelClass}>{key}</label>
              <textarea
                value={section.content[key] || ''}
                onChange={(e) => updateContent(key, e.target.value)}
                rows={3}
                className={inputClass}
              />
            </div>
          );
        }
        return (
          <div key={key}>
            <label className={labelClass}>{key}</label>
            <input
              type="text"
              value={section.content[key] || ''}
              onChange={(e) => updateContent(key, e.target.value)}
              className={inputClass}
            />
          </div>
        );
      }
      if (typeof value === 'boolean') {
        return (
          <div key={key} className="flex items-center">
            <input
              type="checkbox"
              checked={section.content[key] || false}
              onChange={(e) => updateContent(key, e.target.checked)}
              className="mr-2"
            />
            <label className="text-sm text-gray-700">{key}</label>
          </div>
        );
      }
      if (typeof value === 'number') {
        return (
          <div key={key}>
            <label className={labelClass}>{key}</label>
            <input
              type="number"
              value={section.content[key] || 0}
              onChange={(e) => updateContent(key, parseFloat(e.target.value))}
              className={inputClass}
            />
          </div>
        );
      }
      if (Array.isArray(value)) {
        return (
          <div key={key} className="border border-gray-200 rounded-lg p-3">
            <label className="block text-sm font-semibold text-gray-700 mb-2">{key} (Array)</label>
            <p className="text-xs text-gray-500">Utilisez l'éditeur avancé pour modifier les tableaux</p>
          </div>
        );
      }
      return null;
    };

    const widgetDef = widgetLibrary.find(w => w.type === section.type);
    const contentKeys = Object.keys(widgetDef?.defaultContent || section.content);

    return (
      <div className="space-y-4">
        {contentKeys.map(key => {
          const value = section.content[key] !== undefined ? section.content[key] : widgetDef?.defaultContent[key];
          return renderField(key, value);
        })}
      </div>
    );
  };

  const renderContentTab = () => {
    switch (section.type) {
      case 'hero':
        return <HeroContentEditor {...editorProps} />;
      case 'features':
        return <FeaturesContentEditor {...editorProps} />;
      case 'cta':
        return <CTAContentEditor {...editorProps} />;
      case 'header':
        return <HeaderContentEditor {...editorProps} />;
      case 'contact':
        return <ContactContentEditor {...editorProps} />;
      case 'testimonials':
        return <TestimonialsContentEditor {...editorProps} />;
      case 'footer':
        return <FooterContentEditor {...editorProps} />;
      case 'image-text-split':
        return <ImageTextSplitContentEditor {...editorProps} />;
      case 'content-showcase':
        return <ContentShowcaseContentEditor {...editorProps} />;
      case 'centered-content':
        return <CenteredContentContentEditor {...editorProps} />;
      case 'text-columns':
        return <TextColumnsContentEditor {...editorProps} />;
      default:
        return renderGenericEditor();
    }
  };

  const renderDesignTab = () => {
    return (
      <div className="space-y-6">
        <WidgetThemeSelector section={section} onUpdateSection={onUpdateSection} />
        <div className="border-t border-gray-200 pt-4">
          <DesignCategories section={section} updateDesign={updateDesign} />
        </div>
      </div>
    );
  };

  const renderAdvancedTab = () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Visibilite</h3>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={section.advanced.visibility?.desktop !== false}
              onChange={(e) =>
                onUpdateSection({
                  advanced: {
                    ...section.advanced,
                    visibility: {
                      ...section.advanced.visibility,
                      desktop: e.target.checked,
                      tablet: section.advanced.visibility?.tablet !== false,
                      mobile: section.advanced.visibility?.mobile !== false,
                    },
                  },
                })
              }
              className="mr-2"
            />
            <span className="text-sm text-gray-700">Visible sur desktop</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={section.advanced.visibility?.tablet !== false}
              onChange={(e) =>
                onUpdateSection({
                  advanced: {
                    ...section.advanced,
                    visibility: {
                      desktop: section.advanced.visibility?.desktop !== false,
                      tablet: e.target.checked,
                      mobile: section.advanced.visibility?.mobile !== false,
                    },
                  },
                })
              }
              className="mr-2"
            />
            <span className="text-sm text-gray-700">Visible sur tablette</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={section.advanced.visibility?.mobile !== false}
              onChange={(e) =>
                onUpdateSection({
                  advanced: {
                    ...section.advanced,
                    visibility: {
                      desktop: section.advanced.visibility?.desktop !== false,
                      tablet: section.advanced.visibility?.tablet !== false,
                      mobile: e.target.checked,
                    },
                  },
                })
              }
              className="mr-2"
            />
            <span className="text-sm text-gray-700">Visible sur mobile</span>
          </label>
        </div>
      </div>
    </div>
  );

  const widgetDef = widgetLibrary.find(w => w.type === section.type);

  return (
    <>
      {widgetDef && widgetDef.variants.length > 1 && (
        <div className="p-4 border-b border-gray-200 bg-gray-50 flex-shrink-0">
          <label className="block text-xs font-semibold text-gray-700 mb-2">
            Variante du widget
          </label>
          <select
            value={section.variant}
            onChange={(e) => updateVariant(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-black focus:border-transparent bg-white"
          >
            {widgetDef.variants.map(v => (
              <option key={v.id} value={v.id}>
                {v.label}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="border-b border-gray-200 flex-shrink-0">
        <div className="flex">
          <button
            onClick={() => setActiveTab('content')}
            className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'content'
                ? 'border-black text-black'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Contenu</span>
          </button>
          <button
            onClick={() => setActiveTab('design')}
            className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'design'
                ? 'border-black text-black'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <Palette className="w-4 h-4" />
            <span>Design</span>
          </button>
          <button
            onClick={() => setActiveTab('advanced')}
            className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'advanced'
                ? 'border-black text-black'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <Code className="w-4 h-4" />
            <span>Avance</span>
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4 custom-scrollbar">
        {activeTab === 'content' && renderContentTab()}
        {activeTab === 'design' && renderDesignTab()}
        {activeTab === 'advanced' && renderAdvancedTab()}
      </div>
    </>
  );
}

import React, { useState } from 'react';
import { Template, TemplateSection, BuilderState } from '../../types/builder';
import { renderSectionPreview } from '../../lib/previewGenerator';
import { getVariantsBySection } from '../../registry/sectionRegistry';
import {
  ChevronUp,
  ChevronDown,
  Eye,
  EyeOff,
  Trash2,
  Save,
  Download,
  Monitor,
  Tablet,
  Smartphone,
  X,
} from 'lucide-react';

interface BuilderEditorProps {
  template: Template;
  onClose: () => void;
}

interface EditableSection extends TemplateSection {
  id: string;
  enabled: boolean;
}

export const BuilderEditor: React.FC<BuilderEditorProps> = ({ template, onClose }) => {
  const [sections, setSections] = useState<EditableSection[]>(
    template.sections.map((section, idx) => ({
      ...section,
      id: `section-${idx}-${Date.now()}`,
      enabled: true,
    }))
  );

  const [previewMode, setPreviewMode] = useState<BuilderState['previewMode']>('desktop');
  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(null);

  const moveSection = (index: number, direction: 'up' | 'down') => {
    const newSections = [...sections];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;

    if (targetIndex < 0 || targetIndex >= newSections.length) return;

    [newSections[index], newSections[targetIndex]] = [newSections[targetIndex], newSections[index]];

    newSections.forEach((section, idx) => {
      section.order = idx;
    });

    setSections(newSections);
  };

  const toggleSection = (id: string) => {
    setSections(sections.map(s => (s.id === id ? { ...s, enabled: !s.enabled } : s)));
  };

  const deleteSection = (id: string) => {
    const newSections = sections.filter(s => s.id !== id);
    newSections.forEach((section, idx) => {
      section.order = idx;
    });
    setSections(newSections);
  };

  const changeVariant = (id: string, newVariantKey: string) => {
    setSections(sections.map(s => (s.id === id ? { ...s, variantKey: newVariantKey } : s)));
  };

  const handleSave = () => {
    const saveData = {
      templateId: template.id,
      templateName: template.name,
      sections: sections
        .filter(s => s.enabled)
        .map(({ id, enabled, ...rest }) => rest),
      updatedAt: new Date().toISOString(),
    };

    console.log('Saving template customization:', saveData);
    alert('Template saved successfully!');
  };

  const handleExport = () => {
    const exportData = {
      templateId: template.id,
      templateName: template.name,
      sections: sections
        .filter(s => s.enabled)
        .map(({ id, enabled, ...rest }) => rest),
      exportedAt: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${template.id}-customization.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const previewWidth =
    previewMode === 'desktop' ? 'max-w-full' : previewMode === 'tablet' ? 'max-w-3xl' : 'max-w-sm';

  const enabledSections = sections.filter(s => s.enabled);

  return (
    <div className="fixed inset-0 bg-neutral-900 z-50 flex">
      <div className="w-80 bg-white border-r border-neutral-200 flex flex-col">
        <div className="p-4 border-b border-neutral-200">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <h2 className="font-bold text-lg">{template.name}</h2>
              <p className="text-sm text-neutral-600">
                {enabledSections.length} section{enabledSections.length !== 1 ? 's' : ''}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-1 hover:bg-neutral-100 rounded transition-colors"
              title="Close editor"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex gap-2 mt-3">
            <button
              onClick={handleSave}
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm"
            >
              <Save className="w-4 h-4" />
              Save
            </button>
            <button
              onClick={handleExport}
              className="flex items-center justify-center gap-2 px-3 py-2 border border-neutral-300 rounded hover:bg-neutral-50 transition-colors text-sm"
              title="Export JSON"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="p-4 space-y-2">
            {sections.map((section, index) => {
              const variants = getVariantsBySection(section.sectionType);
              const isSelected = selectedSectionId === section.id;

              return (
                <div
                  key={section.id}
                  className={`border rounded-lg p-3 transition-all ${
                    isSelected
                      ? 'border-blue-500 bg-blue-50'
                      : section.enabled
                      ? 'border-neutral-200 bg-white'
                      : 'border-neutral-200 bg-neutral-50 opacity-60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 flex-1">
                      <button
                        onClick={() => toggleSection(section.id)}
                        className="p-1 hover:bg-neutral-200 rounded transition-colors"
                        title={section.enabled ? 'Hide section' : 'Show section'}
                      >
                        {section.enabled ? (
                          <Eye className="w-4 h-4" />
                        ) : (
                          <EyeOff className="w-4 h-4 text-neutral-400" />
                        )}
                      </button>
                      <span className="text-sm font-medium capitalize">{section.sectionType}</span>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => moveSection(index, 'up')}
                        disabled={index === 0}
                        className="p-1 hover:bg-neutral-200 rounded transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                        title="Move up"
                      >
                        <ChevronUp className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => moveSection(index, 'down')}
                        disabled={index === sections.length - 1}
                        className="p-1 hover:bg-neutral-200 rounded transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                        title="Move down"
                      >
                        <ChevronDown className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteSection(section.id)}
                        className="p-1 hover:bg-red-100 rounded transition-colors text-red-600"
                        title="Delete section"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {section.enabled && (
                    <div className="mt-2">
                      <label className="text-xs text-neutral-600 block mb-1">Variant</label>
                      <select
                        value={section.variantKey}
                        onChange={(e) => changeVariant(section.id, e.target.value)}
                        className="w-full px-2 py-1 text-sm border border-neutral-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {variants.map((variant) => (
                          <option key={variant.variantKey} value={variant.variantKey}>
                            {variant.displayName}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex-1 bg-neutral-100 flex flex-col">
        <div className="bg-white border-b border-neutral-200 p-4 flex items-center justify-center gap-2">
          <button
            onClick={() => setPreviewMode('desktop')}
            className={`p-2 rounded transition-colors ${
              previewMode === 'desktop'
                ? 'bg-blue-600 text-white'
                : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
            }`}
            title="Desktop preview"
          >
            <Monitor className="w-5 h-5" />
          </button>
          <button
            onClick={() => setPreviewMode('tablet')}
            className={`p-2 rounded transition-colors ${
              previewMode === 'tablet'
                ? 'bg-blue-600 text-white'
                : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
            }`}
            title="Tablet preview"
          >
            <Tablet className="w-5 h-5" />
          </button>
          <button
            onClick={() => setPreviewMode('mobile')}
            className={`p-2 rounded transition-colors ${
              previewMode === 'mobile'
                ? 'bg-blue-600 text-white'
                : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
            }`}
            title="Mobile preview"
          >
            <Smartphone className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8">
          <div className={`mx-auto bg-white shadow-lg ${previewWidth} transition-all duration-300`}>
            {enabledSections.map((section) => (
              <div
                key={section.id}
                onClick={() => setSelectedSectionId(section.id)}
                className="cursor-pointer hover:outline hover:outline-2 hover:outline-blue-500 transition-all"
              >
                {renderSectionPreview(section.sectionType, section.variantKey)}
              </div>
            ))}

            {enabledSections.length === 0 && (
              <div className="py-32 text-center text-neutral-500">
                <p className="text-lg mb-2">No sections enabled</p>
                <p className="text-sm">Enable sections from the sidebar to see the preview</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Template, TemplateSection, SectionType } from '../../types/builder';
import { renderSectionPreview } from '../../lib/previewGenerator';
import { getVariantsBySection, getAllSectionTypes } from '../../registry/sectionRegistry';
import {
  ChevronRight,
  Settings,
  Plus,
  GripVertical,
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

  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(null);
  const [showAddSection, setShowAddSection] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const deleteSection = (id: string) => {
    const newSections = sections.filter(s => s.id !== id);
    newSections.forEach((section, idx) => {
      section.order = idx;
    });
    setSections(newSections);
    if (selectedSectionId === id) {
      setSelectedSectionId(null);
    }
  };

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    const newSections = [...sections];
    const draggedSection = newSections[draggedIndex];
    newSections.splice(draggedIndex, 1);
    newSections.splice(index, 0, draggedSection);

    newSections.forEach((section, idx) => {
      section.order = idx;
    });

    setSections(newSections);
    setDraggedIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  const addSection = (sectionType: SectionType) => {
    const variants = getVariantsBySection(sectionType);
    const variantKey = variants[0]?.variantKey || 'classic';

    const newSection: EditableSection = {
      sectionType,
      variantKey,
      order: sections.length,
      id: `section-${sections.length}-${Date.now()}`,
      enabled: true,
    };

    setSections([...sections, newSection]);
    setShowAddSection(false);
  };

  const handleSave = () => {
    const saveData = {
      templateId: template.id,
      templateName: template.name,
      sections: sections.map(({ id, enabled, ...rest }) => rest),
      updatedAt: new Date().toISOString(),
    };

    console.log('Saving template customization:', saveData);
    alert('Template saved successfully!');
  };

  const selectedSection = sections.find(s => s.id === selectedSectionId);
  const availableSectionTypes = getAllSectionTypes();

  return (
    <div className="fixed inset-0 bg-neutral-50 z-50 flex">
      {/* Main Preview Area */}
      <div className="flex-1 bg-neutral-50 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto">
          <div className="w-full">
            {sections.map((section) => (
              <div
                key={section.id}
                onClick={() => setSelectedSectionId(section.id)}
                className={`relative group cursor-pointer transition-all ${
                  selectedSectionId === section.id ? 'ring-2 ring-blue-500 ring-inset' : ''
                }`}
              >
                {renderSectionPreview(section.sectionType, section.variantKey)}

                {/* Hover overlay with delete */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteSection(section.id);
                    }}
                    className="p-2 bg-white border border-neutral-200 rounded-lg shadow-sm hover:bg-red-50 hover:border-red-300 transition-colors"
                    title="Delete section"
                  >
                    <X className="w-4 h-4 text-neutral-600 hover:text-red-600" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-96 bg-white flex flex-col h-screen">
        <div className="px-5 py-3 border-b border-neutral-200 flex items-center justify-between">
          <button
            onClick={onClose}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1"
          >
            <X className="w-4 h-4" />
            Close
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {}}
              className="px-4 py-1.5 bg-amber-50 text-amber-900 border border-amber-200 rounded-md hover:bg-amber-100 transition-colors text-sm font-medium"
            >
              Advanced
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              Publish
            </button>
          </div>
        </div>

        <div className="px-5 py-3 border-b border-neutral-200">
          <h2 className="font-semibold text-neutral-900 text-sm">Website settings</h2>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="px-5 py-3">
            <h3 className="text-xs font-semibold text-neutral-700 mb-2">Sections</h3>

            <div className="space-y-1.5">
              {sections.map((section, index) => (
                <div
                  key={section.id}
                  draggable
                  onDragStart={() => handleDragStart(index)}
                  onDragOver={(e) => handleDragOver(e, index)}
                  onDragEnd={handleDragEnd}
                  onClick={() => setSelectedSectionId(section.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all text-left cursor-move border-2 ${
                    selectedSectionId === section.id
                      ? 'bg-neutral-100 text-neutral-900 border-blue-400'
                      : 'text-neutral-700 hover:bg-neutral-50 border-neutral-200'
                  } ${draggedIndex === index ? 'opacity-50' : ''}`}
                >
                  <div className="flex items-center gap-2.5">
                    <GripVertical className="w-4 h-4 text-neutral-400" />
                    <span className="text-sm font-medium capitalize">{section.sectionType}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-neutral-400" />
                </div>
              ))}
            </div>
          </div>

          {/* Section Settings - Show when selected */}
          {selectedSection && (
            <div className="border-t border-neutral-200 px-5 py-3">
              <div className="flex items-center gap-2 mb-3">
                <Settings className="w-4 h-4 text-neutral-600" />
                <h3 className="font-semibold text-neutral-900 capitalize text-sm">{selectedSection.sectionType}</h3>
              </div>

              <div className="mb-4">
                <label className="text-xs font-medium text-neutral-700 block mb-1.5">Variant</label>
                <select
                  value={selectedSection.variantKey}
                  onChange={(e) => {
                    setSections(sections.map(s =>
                      s.id === selectedSectionId ? { ...s, variantKey: e.target.value } : s
                    ));
                  }}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                >
                  {getVariantsBySection(selectedSection.sectionType).map((variant) => (
                    <option key={variant.variantKey} value={variant.variantKey}>
                      {variant.displayName}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={() => deleteSection(selectedSection.id)}
                className="w-full px-3 py-2 text-red-600 border border-red-300 rounded-md hover:bg-red-50 transition-colors text-sm font-medium"
              >
                Delete section
              </button>
            </div>
          )}
        </div>

        {/* Add Section Button - Fixed at bottom */}
        <div className="border-t border-neutral-200 px-5 py-3 bg-white">
          {!showAddSection ? (
            <button
              onClick={() => setShowAddSection(true)}
              className="w-full py-2.5 border-2 border-dashed border-neutral-300 rounded-md hover:border-blue-500 hover:bg-blue-50 transition-colors flex items-center justify-center gap-2 text-neutral-600 hover:text-blue-600"
            >
              <Plus className="w-4 h-4" />
              <span className="text-sm font-medium">Add section</span>
            </button>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-neutral-900 text-sm">Add a section</h3>
                <button
                  onClick={() => setShowAddSection(false)}
                  className="p-1 hover:bg-neutral-100 rounded transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto">
                {availableSectionTypes.map((sectionType) => (
                  <button
                    key={sectionType}
                    onClick={() => addSection(sectionType)}
                    className="px-3 py-2.5 border border-neutral-200 rounded-md hover:border-blue-500 hover:bg-blue-50 transition-colors text-left"
                  >
                    <span className="text-sm font-medium capitalize">{sectionType}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

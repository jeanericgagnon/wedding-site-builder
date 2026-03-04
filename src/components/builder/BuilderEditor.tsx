import React, { useState } from 'react';
import { Template, TemplateSection, SectionType } from '../../types/builder';
import { renderSectionPreview } from '../../lib/previewGenerator';
import { getVariantsBySection, getAllSectionTypes } from '../../registry/sectionRegistry';
import { mockDataGenerators } from '../../types/mockData';
import { ChevronRight, ChevronLeft, Settings, Plus, GripVertical, X, Image, Type, Sliders, Palette, CreditCard as Edit3, Maximize2 } from 'lucide-react';

interface BuilderEditorProps {
  template: Template;
  onClose: () => void;
}

interface EditableSection extends TemplateSection {
  id: string;
  enabled: boolean;
  content?: {
    heading?: string;
    subheading?: string;
    text?: string;
    images?: string[];
    buttonText?: string;
    buttonLink?: string;
  };
  advanced?: {
    opacity?: number;
    animation?: string;
    customCSS?: string;
    backgroundColor?: string;
    textColor?: string;
  };
}

export const BuilderEditor: React.FC<BuilderEditorProps> = ({ template, onClose }) => {
  const [sections, setSections] = useState<EditableSection[]>(
    template.sections.map((section, idx) => {
      const mockData = mockDataGenerators[section.sectionType]?.() || {};
      const sectionData = section.data || mockData;

      return {
        ...section,
        id: `section-${idx}-${Date.now()}`,
        enabled: true,
        data: sectionData,
        content: {
          heading: (sectionData as any).title || (sectionData as any).names || (sectionData as any).heading || '',
          subheading: (sectionData as any).tagline || (sectionData as any).date || (sectionData as any).subheading || '',
          text: (sectionData as any).description || (sectionData as any).message || (sectionData as any).text || '',
          images: (sectionData as any).images || (sectionData as any).image ? [(sectionData as any).image] : [],
          buttonText: (sectionData as any).buttonText || '',
          buttonLink: (sectionData as any).buttonLink || '#',
        },
        advanced: {
          opacity: 100,
          animation: 'none',
          customCSS: '',
          backgroundColor: '',
          textColor: '',
        },
      };
    })
  );

  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(null);
  const [showAddSection, setShowAddSection] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [editingMode, setEditingMode] = useState<'list' | 'edit' | 'variants'>('list');
  const [variantSectionType, setVariantSectionType] = useState<SectionType | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

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
      content: {
        heading: 'Sample Heading',
        subheading: 'Sample Subheading',
        text: 'Sample text content',
        images: [],
        buttonText: 'Learn More',
        buttonLink: '#',
      },
      advanced: {
        opacity: 100,
        animation: 'none',
        customCSS: '',
        backgroundColor: '',
        textColor: '',
      },
    };

    setSections([...sections, newSection]);
    setShowAddSection(false);
  };

  const updateSectionContent = (field: string, value: string) => {
    if (!selectedSectionId) return;
    setSections(sections.map(s =>
      s.id === selectedSectionId
        ? { ...s, content: { ...s.content, [field]: value } }
        : s
    ));
  };

  const updateSectionAdvanced = (field: string, value: string | number) => {
    if (!selectedSectionId) return;
    setSections(sections.map(s =>
      s.id === selectedSectionId
        ? { ...s, advanced: { ...s.advanced, [field]: value } }
        : s
    ));
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
      <div className={`bg-neutral-50 flex flex-col overflow-hidden transition-all ${
        isFullscreen ? 'flex-1' : 'flex-1'
      }`}>
        {/* Top Bar for Fullscreen */}
        {isFullscreen && (
          <div className="bg-white border-b border-neutral-200 px-6 py-3 flex items-center justify-between">
            <button
              onClick={() => setIsFullscreen(false)}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Back to Editor
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              Publish
            </button>
          </div>
        )}

        <div className="flex-1 overflow-y-auto">
          <div className="w-full">
            {sections.map((section, index) => (
              <div
                key={section.id}
                className={`relative transition-all ${
                  selectedSectionId === section.id && !isFullscreen ? 'ring-2 ring-blue-500 ring-inset' : ''
                } ${draggedIndex === index ? 'opacity-50' : ''}`}
              >
                {renderSectionPreview(section.sectionType, section.variantKey, {
                  isPreviewMode: isFullscreen,
                  onEditField: (fieldPath: string) => {
                    setSelectedSectionId(section.id);
                    setIsFullscreen(false);
                    setEditingMode('edit');
                    setFocusedField(fieldPath);
                    setTimeout(() => {
                      const input = document.querySelector(`[data-field="${fieldPath}"]`) as HTMLInputElement;
                      if (input) {
                        input.focus();
                        input.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      }
                    }, 100);
                  }
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Sidebar - Hidden in fullscreen */}
      {!isFullscreen && (
        <div className="w-[512px] bg-white flex flex-col h-screen">
          <div className="px-5 py-3 border-b border-neutral-200 flex items-center justify-between">
            <button
              onClick={() => setIsFullscreen(true)}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1.5"
            >
              <Maximize2 className="w-4 h-4" />
              Fullscreen
            </button>
            <div className="flex items-center gap-2">
              <button
                onClick={onClose}
                className="px-3 py-1.5 border border-neutral-300 rounded-md hover:bg-neutral-50 transition-colors text-sm font-medium text-neutral-700"
              >
                Exit
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
          {editingMode === 'list' ? (
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
                    onClick={() => {
                      setSelectedSectionId(section.id);
                      setEditingMode('edit');
                    }}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all text-left cursor-pointer border-2 ${
                      selectedSectionId === section.id
                        ? 'bg-neutral-100 text-neutral-900 border-blue-400'
                        : 'text-neutral-700 hover:bg-neutral-50 border-neutral-200'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <GripVertical className="w-4 h-4 text-neutral-400 cursor-move" />
                      <span className="text-sm font-medium capitalize">{section.sectionType}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-neutral-400" />
                  </div>
                ))}
              </div>
            </div>
          ) : editingMode === 'variants' && variantSectionType ? (
            <div className="h-full flex flex-col">
              <div className="px-5 py-3 border-b border-neutral-200">
                <button
                  onClick={() => setEditingMode('edit')}
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Back to Settings
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-5 py-4">
                <div className="mb-4">
                  <h3 className="font-semibold text-neutral-900 capitalize text-lg mb-1">
                    {variantSectionType} Designs
                  </h3>
                  <p className="text-xs text-neutral-500">Choose a design style for this section</p>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {getVariantsBySection(variantSectionType).map((variant) => {
                    const isSelected = selectedSection?.variantKey === variant.variantKey;
                    return (
                      <button
                        key={variant.variantKey}
                        onClick={() => {
                          if (selectedSectionId) {
                            setSections(sections.map(s =>
                              s.id === selectedSectionId ? { ...s, variantKey: variant.variantKey } : s
                            ));
                            setEditingMode('edit');
                          }
                        }}
                        className={`relative group rounded-lg overflow-hidden border-2 transition-all text-left ${
                          isSelected
                            ? 'border-blue-500 shadow-lg'
                            : 'border-neutral-200 hover:border-blue-300 hover:shadow-md'
                        }`}
                      >
                        <div className="aspect-video bg-neutral-100 flex items-center justify-center overflow-hidden">
                          {renderSectionPreview(variantSectionType, variant.variantKey)}
                        </div>
                        <div className="p-3 bg-white">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="text-sm font-semibold text-neutral-900">{variant.displayName}</h4>
                              {variant.description && (
                                <p className="text-xs text-neutral-500 mt-0.5">{variant.description}</p>
                              )}
                            </div>
                            {isSelected && (
                              <div className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded">
                                Current
                              </div>
                            )}
                          </div>
                          {variant.tags && variant.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {variant.tags.slice(0, 3).map((tag) => (
                                <span key={tag} className="px-2 py-0.5 bg-neutral-100 text-neutral-600 text-xs rounded">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            selectedSection && (
              <div className="h-full flex flex-col">
                <div className="px-5 py-3 border-b border-neutral-200">
                  <button
                    onClick={() => {
                      setEditingMode('list');
                      setShowAdvanced(false);
                    }}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Back to Sections
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
                  <div>
                    <h3 className="font-semibold text-neutral-900 capitalize text-lg mb-1">
                      {selectedSection.sectionType} Section
                    </h3>
                    <p className="text-xs text-neutral-500">Edit content and styling for this section</p>
                  </div>

                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-medium text-neutral-700 mb-1.5">
                      <Type className="w-3.5 h-3.5" />
                      Heading
                    </label>
                    <input
                      type="text"
                      value={selectedSection.content?.heading || ''}
                      onChange={(e) => updateSectionContent('heading', e.target.value)}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      placeholder="Enter heading"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-medium text-neutral-700 mb-1.5">
                      <Type className="w-3.5 h-3.5" />
                      Subheading
                    </label>
                    <input
                      type="text"
                      value={selectedSection.content?.subheading || ''}
                      onChange={(e) => updateSectionContent('subheading', e.target.value)}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      placeholder="Enter subheading"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-medium text-neutral-700 mb-1.5">
                      <Type className="w-3.5 h-3.5" />
                      Text Content
                    </label>
                    <textarea
                      value={selectedSection.content?.text || ''}
                      onChange={(e) => updateSectionContent('text', e.target.value)}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none"
                      rows={4}
                      placeholder="Enter text content"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-medium text-neutral-700 mb-1.5">
                      <Image className="w-3.5 h-3.5" />
                      Image URL
                    </label>
                    <input
                      type="text"
                      placeholder="https://example.com/image.jpg"
                      className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-medium text-neutral-700 block mb-1.5">Button Text</label>
                      <input
                        type="text"
                        value={selectedSection.content?.buttonText || ''}
                        onChange={(e) => updateSectionContent('buttonText', e.target.value)}
                        className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        placeholder="Button text"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-neutral-700 block mb-1.5">Button Link</label>
                      <input
                        type="text"
                        value={selectedSection.content?.buttonLink || ''}
                        onChange={(e) => updateSectionContent('buttonLink', e.target.value)}
                        className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        placeholder="#"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-neutral-700 block mb-2">Design Style</label>
                    <button
                      onClick={() => {
                        setVariantSectionType(selectedSection.sectionType);
                        setEditingMode('variants');
                      }}
                      className="w-full px-4 py-3 border-2 border-neutral-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-3">
                        <Palette className="w-5 h-5 text-neutral-500 group-hover:text-blue-600" />
                        <div className="text-left">
                          <div className="text-sm font-medium text-neutral-900">
                            {getVariantsBySection(selectedSection.sectionType).find(v => v.variantKey === selectedSection.variantKey)?.displayName || 'Select Design'}
                          </div>
                          <div className="text-xs text-neutral-500">Current design style</div>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:text-blue-600" />
                    </button>
                  </div>

                  {showAdvanced && (
                    <div className="pt-4 border-t border-neutral-200 space-y-4">
                      <div className="flex items-center gap-1.5">
                        <Sliders className="w-4 h-4 text-amber-600" />
                        <h4 className="text-sm font-semibold text-amber-900">Advanced Settings</h4>
                      </div>

                      <div>
                        <label className="text-xs font-medium text-neutral-700 block mb-1.5">
                          Opacity: {selectedSection.advanced?.opacity}%
                        </label>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={selectedSection.advanced?.opacity || 100}
                          onChange={(e) => updateSectionAdvanced('opacity', parseInt(e.target.value))}
                          className="w-full"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-medium text-neutral-700 block mb-1.5">Animation</label>
                        <select
                          value={selectedSection.advanced?.animation || 'none'}
                          onChange={(e) => updateSectionAdvanced('animation', e.target.value)}
                          className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        >
                          <option value="none">None</option>
                          <option value="fade-in">Fade In</option>
                          <option value="slide-up">Slide Up</option>
                          <option value="slide-down">Slide Down</option>
                          <option value="zoom-in">Zoom In</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-xs font-medium text-neutral-700 block mb-1.5">Background Color</label>
                        <input
                          type="text"
                          value={selectedSection.advanced?.backgroundColor || ''}
                          onChange={(e) => updateSectionAdvanced('backgroundColor', e.target.value)}
                          className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                          placeholder="#ffffff or transparent"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-medium text-neutral-700 block mb-1.5">Text Color</label>
                        <input
                          type="text"
                          value={selectedSection.advanced?.textColor || ''}
                          onChange={(e) => updateSectionAdvanced('textColor', e.target.value)}
                          className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                          placeholder="#000000"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-medium text-neutral-700 block mb-1.5">Custom CSS</label>
                        <textarea
                          value={selectedSection.advanced?.customCSS || ''}
                          onChange={(e) => updateSectionAdvanced('customCSS', e.target.value)}
                          className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-mono resize-none"
                          rows={6}
                          placeholder="padding: 20px;&#10;margin: 0;"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="border-t border-neutral-200 px-5 py-4 bg-white space-y-2">
                  <button
                    onClick={() => setShowAdvanced(!showAdvanced)}
                    className={`w-full px-4 py-2.5 border rounded-lg transition-colors text-sm font-medium ${
                      showAdvanced
                        ? 'bg-amber-100 text-amber-900 border-amber-300'
                        : 'bg-white text-amber-900 border-amber-200 hover:bg-amber-50'
                    }`}
                  >
                    {showAdvanced ? 'Hide Advanced' : 'Show Advanced'}
                  </button>

                  <button
                    onClick={() => {
                      if (confirm('Are you sure you want to delete this section?')) {
                        deleteSection(selectedSection.id);
                        setEditingMode('list');
                      }
                    }}
                    className="w-full px-4 py-2.5 text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition-colors text-sm font-medium"
                  >
                    Delete Section
                  </button>
                </div>
              </div>
            )
          )}
        </div>

        {/* Add Section Button - Fixed at bottom - Only show in list mode */}
        {editingMode === 'list' && (
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
        )}
        </div>
      )}
    </div>
  );
};

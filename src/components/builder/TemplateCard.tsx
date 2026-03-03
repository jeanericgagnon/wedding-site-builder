import React from 'react';
import { Template } from '../../types/builder';
import { Layers } from 'lucide-react';

interface TemplateCardProps {
  template: Template;
  onSelect: () => void;
  onPreview: () => void;
}

export const TemplateCard: React.FC<TemplateCardProps> = ({
  template,
  onSelect,
  onPreview,
}) => {
  return (
    <div
      className="border-2 border-neutral-200 rounded-lg overflow-hidden bg-white hover:shadow-lg transition-all cursor-pointer"
      onClick={onPreview}
    >
      <div className="aspect-video bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <Layers className="w-16 h-16 mx-auto mb-2 text-neutral-400" />
          <div className="text-sm text-neutral-600">{template.sections.length} sections</div>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-bold mb-2">{template.name}</h3>
        {template.description && (
          <p className="text-sm text-neutral-600 mb-3">{template.description}</p>
        )}

        {template.tags && template.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {template.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-700"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect();
            }}
            className="flex-1 py-2 bg-neutral-900 text-white rounded hover:bg-neutral-800 transition-colors text-sm font-medium"
          >
            Use Template
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPreview();
            }}
            className="px-4 py-2 border border-neutral-300 rounded hover:bg-neutral-50 transition-colors text-sm"
          >
            Preview
          </button>
        </div>
      </div>
    </div>
  );
};

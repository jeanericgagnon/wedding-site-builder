import React, { useState, useMemo } from 'react';
import { Template, StyleTag } from '../../types/builder';
import { getAllTemplates } from '../../templates/registry';
import { TemplateCard } from './TemplateCard';
import { Search, Filter } from 'lucide-react';

interface TemplateGalleryProps {
  onSelectTemplate: (template: Template) => void;
}

export const TemplateGallery: React.FC<TemplateGalleryProps> = ({ onSelectTemplate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<StyleTag | 'all'>('all');

  const templates = getAllTemplates();

  const allTags = useMemo(() => {
    const tags = new Set<StyleTag>();
    templates.forEach(t => t.tags?.forEach(tag => tags.add(tag)));
    return Array.from(tags).sort();
  }, [templates]);

  const filteredTemplates = useMemo(() => {
    return templates.filter(template => {
      const matchesSearch =
        searchQuery === '' ||
        template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.description?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesTag =
        selectedTag === 'all' || template.tags?.includes(selectedTag);

      return matchesSearch && matchesTag;
    });
  }, [templates, searchQuery, selectedTag]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
          <input
            type="text"
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-neutral-600" />
          <select
            value={selectedTag}
            onChange={(e) => setSelectedTag(e.target.value as StyleTag | 'all')}
            className="px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Styles</option>
            {allTags.map(tag => (
              <option key={tag} value={tag}>
                {tag.charAt(0).toUpperCase() + tag.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-neutral-600">
          {filteredTemplates.length} template{filteredTemplates.length !== 1 ? 's' : ''} found
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map(template => (
          <TemplateCard
            key={template.id}
            template={template}
            onSelect={() => onSelectTemplate(template)}
            onPreview={() => onSelectTemplate(template)}
          />
        ))}
      </div>
    </div>
  );
};

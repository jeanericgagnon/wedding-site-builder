import { SectionType } from './builder';

export interface FieldMapping {
  editorField: 'heading' | 'subheading' | 'text' | 'images' | 'buttonText' | 'buttonLink';
  dataField: string;
  label: string;
  type: 'text' | 'textarea' | 'image' | 'button';
}

export interface SectionConfig {
  sectionType: SectionType;
  displayName: string;
  fields: FieldMapping[];
}

export const sectionConfigs: Record<SectionType, SectionConfig> = {
  hero: {
    sectionType: 'hero',
    displayName: 'Hero',
    fields: [
      { editorField: 'heading', dataField: 'names', label: 'Heading', type: 'text' },
      { editorField: 'subheading', dataField: 'tagline', label: 'Subheading', type: 'text' },
      { editorField: 'text', dataField: 'date', label: 'Text Content', type: 'textarea' },
      { editorField: 'images', dataField: 'backgroundImage', label: 'Image URL', type: 'image' },
    ],
  },
  story: {
    sectionType: 'story',
    displayName: 'Story',
    fields: [
      { editorField: 'heading', dataField: 'title', label: 'Heading', type: 'text' },
      { editorField: 'text', dataField: 'story', label: 'Text Content', type: 'textarea' },
      { editorField: 'images', dataField: 'image', label: 'Image URL', type: 'image' },
      { editorField: 'buttonText', dataField: 'buttonText', label: 'Button Text', type: 'button' },
      { editorField: 'buttonLink', dataField: 'buttonLink', label: 'Button Link', type: 'button' },
    ],
  },
  timeline: {
    sectionType: 'timeline',
    displayName: 'Timeline',
    fields: [
      { editorField: 'heading', dataField: 'title', label: 'Heading', type: 'text' },
    ],
  },
  gallery: {
    sectionType: 'gallery',
    displayName: 'Gallery',
    fields: [
      { editorField: 'heading', dataField: 'title', label: 'Heading', type: 'text' },
      { editorField: 'subheading', dataField: 'subtitle', label: 'Subheading', type: 'text' },
    ],
  },
  schedule: {
    sectionType: 'schedule',
    displayName: 'Schedule',
    fields: [
      { editorField: 'heading', dataField: 'title', label: 'Heading', type: 'text' },
    ],
  },
  location: {
    sectionType: 'location',
    displayName: 'Location',
    fields: [
      { editorField: 'heading', dataField: 'venue', label: 'Heading', type: 'text' },
      { editorField: 'subheading', dataField: 'address', label: 'Subheading', type: 'text' },
    ],
  },
  rsvp: {
    sectionType: 'rsvp',
    displayName: 'RSVP',
    fields: [
      { editorField: 'heading', dataField: 'title', label: 'Heading', type: 'text' },
      { editorField: 'text', dataField: 'message', label: 'Text Content', type: 'textarea' },
      { editorField: 'buttonText', dataField: 'buttonText', label: 'Button Text', type: 'button' },
      { editorField: 'buttonLink', dataField: 'buttonLink', label: 'Button Link', type: 'button' },
    ],
  },
  footer: {
    sectionType: 'footer',
    displayName: 'Footer',
    fields: [
      { editorField: 'text', dataField: 'message', label: 'Text Content', type: 'textarea' },
    ],
  },
};

// Helper to get data field value from section data
export function getDataFieldValue(sectionType: SectionType, editorField: string, data: any): any {
  const config = sectionConfigs[sectionType];
  const mapping = config.fields.find(f => f.editorField === editorField);
  if (!mapping) return undefined;

  return data[mapping.dataField];
}

// Helper to merge content back into data
export function mergeContentToData(sectionType: SectionType, data: any, content: any): any {
  const config = sectionConfigs[sectionType];
  const mergedData = { ...data };

  config.fields.forEach(field => {
    const contentValue = content[field.editorField];
    if (contentValue !== undefined && contentValue !== '') {
      if (field.editorField === 'images' && Array.isArray(contentValue) && contentValue.length > 0) {
        mergedData[field.dataField] = contentValue[0];
      } else {
        mergedData[field.dataField] = contentValue;
      }
    }
  });

  return mergedData;
}

// Helper to get available fields for a section
export function getFieldsForSection(sectionType: SectionType): FieldMapping[] {
  return sectionConfigs[sectionType]?.fields || [];
}

// Helper to check if section has buttons
export function sectionHasButtons(sectionType: SectionType): boolean {
  const config = sectionConfigs[sectionType];
  return config.fields.some(f => f.type === 'button');
}

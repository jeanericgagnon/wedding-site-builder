export type SectionType =
  | 'hero'
  | 'story'
  | 'timeline'
  | 'gallery'
  | 'location'
  | 'rsvp'
  | 'registry'
  | 'schedule'
  | 'travel'
  | 'accommodations'
  | 'faq'
  | 'footer';

export type StyleTag =
  | 'minimal'
  | 'elegant'
  | 'modern'
  | 'romantic'
  | 'rustic'
  | 'bold'
  | 'classic'
  | 'whimsical'
  | 'luxe';

export interface SectionVariant {
  sectionType: SectionType;
  variantKey: string;
  displayName: string;
  description?: string;
  tags?: StyleTag[];
  previewImageUrl?: string;
}

export interface TemplateSection {
  sectionType: SectionType;
  variantKey: string;
  order: number;
  data?: Record<string, unknown>;
}

export interface Template {
  id: string;
  name: string;
  description?: string;
  sections: TemplateSection[];
  tags?: StyleTag[];
  thumbnailUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export type ReviewStatus = 'unreviewed' | 'approved' | 'rejected';

export interface VariantReview {
  sectionType: SectionType;
  variantKey: string;
  status: ReviewStatus;
  notes?: string;
  reviewedAt?: string;
  reviewedBy?: string;
}

export interface VariantManifest {
  version: string;
  generatedAt: string;
  variants: SectionVariant[];
}

export interface BuilderState {
  selectedTemplate: Template | null;
  customSections: TemplateSection[];
  activeSection: string | null;
  previewMode: 'desktop' | 'tablet' | 'mobile';
}

import { SectionVariant, SectionType } from '../types/builder';
import {
  HeroSection,
  StorySection,
  TimelineSection,
  GallerySection,
  LocationSection,
  RsvpSection,
  ScheduleSection,
  FooterSection,
} from '../components/sections';

export const SECTION_VARIANTS: SectionVariant[] = [
  { sectionType: 'hero', variantKey: 'classic', displayName: 'Hero Classic', tags: ['classic', 'elegant'] },
  { sectionType: 'hero', variantKey: 'minimal', displayName: 'Hero Minimal', tags: ['minimal', 'modern'] },
  { sectionType: 'hero', variantKey: 'elegant', displayName: 'Hero Elegant', tags: ['elegant', 'luxe'] },
  { sectionType: 'hero', variantKey: 'modern', displayName: 'Hero Modern', tags: ['modern', 'bold'] },
  { sectionType: 'hero', variantKey: 'romantic', displayName: 'Hero Romantic', tags: ['romantic', 'whimsical'] },

  { sectionType: 'story', variantKey: 'classic', displayName: 'Story Classic', tags: ['classic'] },
  { sectionType: 'story', variantKey: 'minimal', displayName: 'Story Minimal', tags: ['minimal'] },
  { sectionType: 'story', variantKey: 'elegant', displayName: 'Story Elegant', tags: ['elegant'] },
  { sectionType: 'story', variantKey: 'modern', displayName: 'Story Modern', tags: ['modern', 'bold'] },

  { sectionType: 'timeline', variantKey: 'classic', displayName: 'Timeline Classic', tags: ['classic'] },
  { sectionType: 'timeline', variantKey: 'vertical', displayName: 'Timeline Vertical', tags: ['minimal'] },
  { sectionType: 'timeline', variantKey: 'modern', displayName: 'Timeline Modern', tags: ['modern'] },

  { sectionType: 'gallery', variantKey: 'classic', displayName: 'Gallery Grid', tags: ['classic'] },
  { sectionType: 'gallery', variantKey: 'masonry', displayName: 'Gallery Masonry', tags: ['modern'] },
  { sectionType: 'gallery', variantKey: 'elegant', displayName: 'Gallery Elegant', tags: ['elegant', 'luxe'] },
  { sectionType: 'gallery', variantKey: 'carousel', displayName: 'Gallery Carousel', tags: ['modern'] },

  { sectionType: 'location', variantKey: 'classic', displayName: 'Location Classic', tags: ['classic'] },
  { sectionType: 'location', variantKey: 'minimal', displayName: 'Location Minimal', tags: ['minimal'] },
  { sectionType: 'location', variantKey: 'modern', displayName: 'Location Modern', tags: ['modern', 'bold'] },

  { sectionType: 'rsvp', variantKey: 'classic', displayName: 'RSVP Classic', tags: ['classic'] },
  { sectionType: 'rsvp', variantKey: 'minimal', displayName: 'RSVP Minimal', tags: ['minimal'] },
  { sectionType: 'rsvp', variantKey: 'modern', displayName: 'RSVP Modern', tags: ['modern', 'bold'] },

  { sectionType: 'schedule', variantKey: 'classic', displayName: 'Schedule Classic', tags: ['classic'] },
  { sectionType: 'schedule', variantKey: 'cards', displayName: 'Schedule Cards', tags: ['modern'] },
  { sectionType: 'schedule', variantKey: 'modern', displayName: 'Schedule Modern', tags: ['modern', 'bold'] },

  { sectionType: 'footer', variantKey: 'classic', displayName: 'Footer Classic', tags: ['classic'] },
  { sectionType: 'footer', variantKey: 'minimal', displayName: 'Footer Minimal', tags: ['minimal'] },
  { sectionType: 'footer', variantKey: 'elegant', displayName: 'Footer Elegant', tags: ['elegant'] },
];

export const SECTION_COMPONENTS: Record<SectionType, React.ComponentType<any>> = {
  hero: HeroSection,
  story: StorySection,
  timeline: TimelineSection,
  gallery: GallerySection,
  location: LocationSection,
  rsvp: RsvpSection,
  schedule: ScheduleSection,
  footer: FooterSection,
  registry: FooterSection,
  travel: FooterSection,
  accommodations: FooterSection,
  faq: FooterSection,
};

export function getVariantsBySection(sectionType: SectionType): SectionVariant[] {
  return SECTION_VARIANTS.filter(v => v.sectionType === sectionType);
}

export function getVariant(sectionType: SectionType, variantKey: string): SectionVariant | undefined {
  return SECTION_VARIANTS.find(v => v.sectionType === sectionType && v.variantKey === variantKey);
}

export function getSectionComponent(sectionType: SectionType): React.ComponentType<any> | undefined {
  return SECTION_COMPONENTS[sectionType];
}

export function getAllSectionTypes(): SectionType[] {
  return Array.from(new Set(SECTION_VARIANTS.map(v => v.sectionType)));
}

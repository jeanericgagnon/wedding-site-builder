import { TemplateSection, SectionType } from '../types/builder';
import { getVariantsBySection } from '../registry/sectionRegistry';

interface SourceSection {
  type: string;
  variant?: string;
  enabled?: boolean;
  bindings?: Record<string, unknown>;
  settings?: Record<string, unknown>;
}

interface SourceTemplate {
  id: string;
  name: string;
  description?: string;
  defaultLayout?: {
    sections: SourceSection[];
  };
  tags?: string[];
}

interface AdaptationWarning {
  sectionIndex: number;
  originalType: string;
  message: string;
  severity: 'error' | 'warning';
}

interface AdaptationResult {
  sections: TemplateSection[];
  warnings: AdaptationWarning[];
}

const SECTION_TYPE_MAPPING: Record<string, SectionType> = {
  'hero': 'hero',
  'story': 'story',
  'timeline': 'timeline',
  'gallery': 'gallery',
  'location': 'location',
  'rsvp': 'rsvp',
  'registry': 'registry',
  'schedule': 'schedule',
  'travel': 'travel',
  'accommodations': 'accommodations',
  'faq': 'faq',
  'footer': 'footer',
  'footer-cta': 'footer',
  'contact': 'footer',
};

function normalizeSectionType(sourceType: string): SectionType | null {
  const normalized = sourceType.toLowerCase().trim();
  const mapped = SECTION_TYPE_MAPPING[normalized];

  if (mapped) {
    return mapped;
  }

  return null;
}

function getValidVariantKey(sectionType: SectionType, requestedVariant?: string): string {
  const availableVariants = getVariantsBySection(sectionType);

  if (!requestedVariant) {
    return availableVariants[0]?.variantKey || 'classic';
  }

  const normalizedRequested = requestedVariant.toLowerCase().trim();

  const exactMatch = availableVariants.find(
    v => v.variantKey.toLowerCase() === normalizedRequested
  );

  if (exactMatch) {
    return exactMatch.variantKey;
  }

  if (availableVariants.length > 0) {
    return availableVariants[0].variantKey;
  }

  return 'classic';
}

function mergeData(
  bindings?: Record<string, unknown>,
  settings?: Record<string, unknown>
): Record<string, unknown> {
  const data: Record<string, unknown> = {};

  if (settings) {
    Object.assign(data, settings);
  }

  if (bindings) {
    Object.assign(data, bindings);
  }

  return data;
}

export function adaptSourceTemplate(sourceTemplate: SourceTemplate): AdaptationResult {
  const warnings: AdaptationWarning[] = [];
  const sections: TemplateSection[] = [];

  const sourceSections = sourceTemplate.defaultLayout?.sections || [];

  sourceSections.forEach((sourceSection, index) => {
    if (sourceSection.enabled === false) {
      warnings.push({
        sectionIndex: index,
        originalType: sourceSection.type,
        message: `Section "${sourceSection.type}" is disabled, skipping`,
        severity: 'warning',
      });
      return;
    }

    const sectionType = normalizeSectionType(sourceSection.type);

    if (!sectionType) {
      warnings.push({
        sectionIndex: index,
        originalType: sourceSection.type,
        message: `Unknown section type "${sourceSection.type}", skipping`,
        severity: 'error',
      });
      return;
    }

    if (sourceSection.type !== sectionType && sourceSection.type !== sectionType) {
      warnings.push({
        sectionIndex: index,
        originalType: sourceSection.type,
        message: `Mapped "${sourceSection.type}" to "${sectionType}"`,
        severity: 'warning',
      });
    }

    const requestedVariant = sourceSection.variant;
    const variantKey = getValidVariantKey(sectionType, requestedVariant);

    if (requestedVariant && requestedVariant !== variantKey) {
      warnings.push({
        sectionIndex: index,
        originalType: sourceSection.type,
        message: `Variant "${requestedVariant}" not found for "${sectionType}", using "${variantKey}" instead`,
        severity: 'warning',
      });
    }

    const data = mergeData(sourceSection.bindings, sourceSection.settings);

    sections.push({
      sectionType,
      variantKey,
      order: sections.length,
      data: Object.keys(data).length > 0 ? data : undefined,
    });
  });

  return { sections, warnings };
}

export function logAdaptationWarnings(templateId: string, warnings: AdaptationWarning[]): void {
  if (warnings.length === 0) {
    console.log(`✅ Template "${templateId}" adapted successfully with no warnings`);
    return;
  }

  console.group(`⚠️  Template "${templateId}" adaptation warnings (${warnings.length})`);

  warnings.forEach(warning => {
    const icon = warning.severity === 'error' ? '❌' : '⚠️';
    console.log(`${icon} Section ${warning.sectionIndex} (${warning.originalType}): ${warning.message}`);
  });

  console.groupEnd();
}

export function createEmptyBuilderState(): TemplateSection[] {
  return [];
}

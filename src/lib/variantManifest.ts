import { VariantManifest, SectionVariant, SectionType } from '../types/builder';
import { SECTION_VARIANTS } from '../registry/sectionRegistry';
import { TEMPLATES } from '../templates/registry';

export function generateVariantManifest(): VariantManifest {
  return {
    version: '1.0.0',
    generatedAt: new Date().toISOString(),
    variants: SECTION_VARIANTS,
  };
}

export function getVariantsBySectionType(sectionType: SectionType): SectionVariant[] {
  return SECTION_VARIANTS.filter(v => v.sectionType === sectionType);
}

export function getVariantByKey(sectionType: SectionType, variantKey: string): SectionVariant | undefined {
  return SECTION_VARIANTS.find(v => v.sectionType === sectionType && v.variantKey === variantKey);
}

export function validateTemplate(templateId: string): {
  valid: boolean;
  errors: string[];
  warnings: string[];
} {
  const template = TEMPLATES.find(t => t.id === templateId);
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!template) {
    errors.push(`Template ${templateId} not found`);
    return { valid: false, errors, warnings };
  }

  template.sections.forEach((section, idx) => {
    const variant = getVariantByKey(section.sectionType, section.variantKey);

    if (!variant) {
      errors.push(
        `Section ${idx} (${section.sectionType}:${section.variantKey}) has invalid variant key`
      );
    }

    if (section.order !== idx) {
      warnings.push(
        `Section ${idx} order mismatch: expected ${idx}, got ${section.order}`
      );
    }
  });

  if (template.sections.length === 0) {
    warnings.push('Template has no sections');
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

export function validateAllTemplates(): {
  validCount: number;
  invalidCount: number;
  results: Record<string, ReturnType<typeof validateTemplate>>;
} {
  const results: Record<string, ReturnType<typeof validateTemplate>> = {};
  let validCount = 0;
  let invalidCount = 0;

  TEMPLATES.forEach(template => {
    const result = validateTemplate(template.id);
    results[template.id] = result;

    if (result.valid) {
      validCount++;
    } else {
      invalidCount++;
    }
  });

  return { validCount, invalidCount, results };
}

export function getVariantStats() {
  const bySectionType: Record<string, number> = {};
  const byTag: Record<string, number> = {};

  SECTION_VARIANTS.forEach(variant => {
    bySectionType[variant.sectionType] = (bySectionType[variant.sectionType] || 0) + 1;

    variant.tags?.forEach(tag => {
      byTag[tag] = (byTag[tag] || 0) + 1;
    });
  });

  return {
    total: SECTION_VARIANTS.length,
    bySectionType,
    byTag,
    sectionTypes: Object.keys(bySectionType).length,
  };
}

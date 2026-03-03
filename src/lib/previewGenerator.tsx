import React from 'react';
import { SectionType, SectionVariant } from '../types/builder';
import { mockDataGenerators } from '../types/mockData';
import { getSectionComponent } from '../registry/sectionRegistry';

export function generatePreviewForVariant(variant: SectionVariant): React.ReactElement | null {
  const Component = getSectionComponent(variant.sectionType);
  if (!Component) return null;

  const mockDataGenerator = mockDataGenerators[variant.sectionType];
  if (!mockDataGenerator) return null;

  const mockData = mockDataGenerator();

  return React.createElement(Component, {
    data: mockData,
    variant: variant.variantKey,
  });
}

export function generatePreviewKey(sectionType: SectionType, variantKey: string): string {
  return `${sectionType}-${variantKey}`;
}

export interface PreviewMetadata {
  sectionType: SectionType;
  variantKey: string;
  displayName: string;
  previewKey: string;
  tags?: string[];
}

export function generatePreviewMetadata(variant: SectionVariant): PreviewMetadata {
  return {
    sectionType: variant.sectionType,
    variantKey: variant.variantKey,
    displayName: variant.displayName,
    previewKey: generatePreviewKey(variant.sectionType, variant.variantKey),
    tags: variant.tags,
  };
}

export function groupVariantsBySection(variants: SectionVariant[]): Record<SectionType, SectionVariant[]> {
  const grouped: Record<string, SectionVariant[]> = {};

  variants.forEach(variant => {
    if (!grouped[variant.sectionType]) {
      grouped[variant.sectionType] = [];
    }
    grouped[variant.sectionType].push(variant);
  });

  return grouped as Record<SectionType, SectionVariant[]>;
}

export function renderSectionPreview(sectionType: SectionType, variantKey: string): React.ReactElement | null {
  const Component = getSectionComponent(sectionType);
  if (!Component) return null;

  const mockDataGenerator = mockDataGenerators[sectionType];
  if (!mockDataGenerator) return null;

  const mockData = mockDataGenerator();

  return React.createElement(Component, {
    data: mockData,
    variant: variantKey,
  });
}

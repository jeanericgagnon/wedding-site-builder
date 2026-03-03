import { SECTION_VARIANTS } from '../src/registry/sectionRegistry';
import { TEMPLATES } from '../src/templates/registry';
import { validateAllTemplates, getVariantStats } from '../src/lib/variantManifest';

console.log('='.repeat(80));
console.log('DAYOF BUILDER FRAMEWORK VALIDATION REPORT');
console.log('='.repeat(80));
console.log('');

console.log('1. VARIANT STATISTICS');
console.log('-'.repeat(80));
const variantStats = getVariantStats();
console.log(`Total Variants: ${variantStats.total}`);
console.log(`Section Types: ${variantStats.sectionTypes}`);
console.log('');
console.log('Variants by Section Type:');
Object.entries(variantStats.bySectionType)
  .sort(([, a], [, b]) => (b as number) - (a as number))
  .forEach(([type, count]) => {
    console.log(`  ${type.padEnd(20)} ${count}`);
  });
console.log('');
console.log('Variants by Style Tag:');
Object.entries(variantStats.byTag)
  .sort(([, a], [, b]) => (b as number) - (a as number))
  .forEach(([tag, count]) => {
    console.log(`  ${tag.padEnd(20)} ${count}`);
  });
console.log('');

console.log('2. TEMPLATE VALIDATION');
console.log('-'.repeat(80));
const validation = validateAllTemplates();
console.log(`Total Templates: ${TEMPLATES.length}`);
console.log(`Valid Templates: ${validation.validCount}`);
console.log(`Invalid Templates: ${validation.invalidCount}`);
console.log('');

if (validation.invalidCount > 0) {
  console.log('Invalid Templates:');
  Object.entries(validation.results)
    .filter(([, result]) => !result.valid)
    .forEach(([id, result]) => {
      console.log(`  ❌ ${id}`);
      result.errors.forEach(error => console.log(`     - ${error}`));
    });
  console.log('');
}

console.log('3. TOP 20 VARIANTS SPOT CHECK');
console.log('-'.repeat(80));
const top20Variants = SECTION_VARIANTS.slice(0, 20);
top20Variants.forEach((variant, idx) => {
  console.log(`${(idx + 1).toString().padStart(2)}. ${variant.displayName.padEnd(25)} [${variant.sectionType}:${variant.variantKey}]`);
  if (variant.tags && variant.tags.length > 0) {
    console.log(`    Tags: ${variant.tags.join(', ')}`);
  }
});
console.log('');

console.log('4. TOP 20 TEMPLATES SPOT CHECK');
console.log('-'.repeat(80));
const top20Templates = TEMPLATES.slice(0, 20);
top20Templates.forEach((template, idx) => {
  const result = validation.results[template.id];
  const status = result.valid ? '✅' : '❌';
  console.log(`${(idx + 1).toString().padStart(2)}. ${status} ${template.name.padEnd(30)} [${template.sections.length} sections]`);
  if (template.tags && template.tags.length > 0) {
    console.log(`    Tags: ${template.tags.join(', ')}`);
  }
  if (result.warnings.length > 0) {
    console.log(`    Warnings: ${result.warnings.length}`);
  }
});
console.log('');

console.log('5. SUMMARY');
console.log('-'.repeat(80));
console.log(`✅ ${variantStats.total} variants registered`);
console.log(`✅ ${variantStats.sectionTypes} section types defined`);
console.log(`✅ ${TEMPLATES.length} templates created`);
console.log(`✅ ${validation.validCount} templates validated`);
if (validation.invalidCount === 0) {
  console.log('✅ All templates are valid!');
} else {
  console.log(`⚠️  ${validation.invalidCount} templates have errors`);
}
console.log('');
console.log('='.repeat(80));
console.log('VALIDATION COMPLETE');
console.log('='.repeat(80));

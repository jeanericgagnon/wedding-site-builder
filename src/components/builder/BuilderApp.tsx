import React, { useState } from 'react';
import { TemplateGallery } from './TemplateGallery';
import { VariantGallery } from './VariantGallery';
import { LayoutGrid as Layout, Grid2x2 as Grid, FileCode } from 'lucide-react';

type BuilderView = 'templates' | 'variants' | 'manifest';

export const BuilderApp: React.FC = () => {
  const [activeView, setActiveView] = useState<BuilderView>('templates');

  return (
    <div className="min-h-screen bg-neutral-50">
      <header className="bg-white border-b border-neutral-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-neutral-900">Dayof Builder</h1>
              <p className="text-sm text-neutral-600">Section-based wedding site framework</p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setActiveView('templates')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  activeView === 'templates'
                    ? 'bg-blue-600 text-white'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                <Layout className="w-4 h-4" />
                Templates
              </button>

              <button
                onClick={() => setActiveView('variants')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  activeView === 'variants'
                    ? 'bg-blue-600 text-white'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                <Grid className="w-4 h-4" />
                Variants
              </button>

              <button
                onClick={() => setActiveView('manifest')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  activeView === 'manifest'
                    ? 'bg-blue-600 text-white'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                <FileCode className="w-4 h-4" />
                Manifest
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {activeView === 'templates' && (
          <div>
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-2">Template Gallery</h2>
              <p className="text-neutral-600">
                Choose from {35} professionally designed wedding site templates
              </p>
            </div>
            <TemplateGallery onSelectTemplate={(template) => console.log('Selected template:', template)} />
          </div>
        )}

        {activeView === 'variants' && (
          <div>
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-2">Variant Gallery</h2>
              <p className="text-neutral-600">
                Review and approve section variants for the builder
              </p>
            </div>
            <VariantGallery />
          </div>
        )}

        {activeView === 'manifest' && (
          <div>
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-2">Variant Manifest</h2>
              <p className="text-neutral-600">
                Technical documentation and validation results
              </p>
            </div>
            <ManifestView />
          </div>
        )}
      </main>
    </div>
  );
};

const ManifestView: React.FC = () => {
  const { validateAllTemplates, getVariantStats } = require('../../lib/variantManifest');

  const validationResults: {
    validCount: number;
    invalidCount: number;
    results: Record<string, { valid: boolean; errors: string[]; warnings: string[] }>;
  } = validateAllTemplates();

  const variantStats: {
    total: number;
    bySectionType: Record<string, number>;
    byTag: Record<string, number>;
    sectionTypes: number;
  } = getVariantStats();

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200">
        <h3 className="text-xl font-bold mb-4">Variant Statistics</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <div className="text-3xl font-bold text-blue-600">{variantStats.total}</div>
            <div className="text-sm text-neutral-600">Total Variants</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-purple-600">{variantStats.sectionTypes}</div>
            <div className="text-sm text-neutral-600">Section Types</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-green-600">{validationResults.validCount}</div>
            <div className="text-sm text-neutral-600">Valid Templates</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-red-600">{validationResults.invalidCount}</div>
            <div className="text-sm text-neutral-600">Invalid Templates</div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200">
        <h3 className="text-xl font-bold mb-4">Variants by Section Type</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Object.entries(variantStats.bySectionType).map(([type, count]) => (
            <div key={type} className="p-4 bg-neutral-50 rounded">
              <div className="text-2xl font-bold text-neutral-900">{count as number}</div>
              <div className="text-sm text-neutral-600 capitalize">{type}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200">
        <h3 className="text-xl font-bold mb-4">Variants by Style Tag</h3>
        <div className="flex flex-wrap gap-3">
          {Object.entries(variantStats.byTag).map(([tag, count]) => (
            <div key={tag} className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full">
              <span className="font-semibold capitalize">{tag}</span>
              <span className="ml-2 text-blue-600">×{count as number}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200">
        <h3 className="text-xl font-bold mb-4">Template Validation Results</h3>
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {Object.entries(validationResults.results).map(([id, result]) => (
            <div
              key={id}
              className={`p-3 rounded ${
                result.valid ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono text-sm">{id}</span>
                <span
                  className={`px-2 py-1 text-xs rounded ${
                    result.valid ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
                  }`}
                >
                  {result.valid ? 'Valid' : 'Invalid'}
                </span>
              </div>
              {result.errors.length > 0 && (
                <div className="text-sm text-red-700 mt-2">
                  {result.errors.map((error, idx) => (
                    <div key={idx}>• {error}</div>
                  ))}
                </div>
              )}
              {result.warnings.length > 0 && (
                <div className="text-sm text-yellow-700 mt-2">
                  {result.warnings.map((warning, idx) => (
                    <div key={idx}>⚠ {warning}</div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

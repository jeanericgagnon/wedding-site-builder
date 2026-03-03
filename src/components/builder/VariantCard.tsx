import React from 'react';
import { SectionVariant, ReviewStatus } from '../../types/builder';
import { CheckCircle, XCircle, Circle } from 'lucide-react';

interface VariantCardProps {
  variant: SectionVariant;
  reviewStatus?: ReviewStatus;
  onPreview: () => void;
  onSelect?: () => void;
}

export const VariantCard: React.FC<VariantCardProps> = ({
  variant,
  reviewStatus = 'unreviewed',
  onPreview,
  onSelect,
}) => {
  const getStatusIcon = () => {
    switch (reviewStatus) {
      case 'approved':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'rejected':
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return <Circle className="w-5 h-5 text-neutral-400" />;
    }
  };

  const getStatusColor = () => {
    switch (reviewStatus) {
      case 'approved':
        return 'border-green-200 bg-green-50';
      case 'rejected':
        return 'border-red-200 bg-red-50';
      default:
        return 'border-neutral-200 bg-white';
    }
  };

  return (
    <div
      className={`relative border-2 rounded-lg overflow-hidden transition-all hover:shadow-lg cursor-pointer ${getStatusColor()}`}
      onClick={onPreview}
    >
      <div className="absolute top-3 right-3 z-10">
        {getStatusIcon()}
      </div>

      <div className="aspect-video bg-gradient-to-br from-neutral-100 to-neutral-200 flex items-center justify-center">
        <div className="text-center p-6">
          <div className="text-4xl mb-2">{variant.sectionType}</div>
          <div className="text-sm text-neutral-600">{variant.variantKey}</div>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-semibold mb-2">{variant.displayName}</h3>
        {variant.description && (
          <p className="text-sm text-neutral-600 mb-3">{variant.description}</p>
        )}
        {variant.tags && variant.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {variant.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-2 py-1 text-xs rounded-full bg-neutral-200 text-neutral-700"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {onSelect && (
        <div className="px-4 pb-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect();
            }}
            className="w-full py-2 bg-neutral-900 text-white rounded hover:bg-neutral-800 transition-colors text-sm"
          >
            Select
          </button>
        </div>
      )}
    </div>
  );
};

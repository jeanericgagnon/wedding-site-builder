import React, { useEffect } from 'react';
import { SectionVariant, ReviewStatus } from '../../types/builder';
import { generatePreviewForVariant } from '../../lib/previewGenerator';
import { X, ChevronLeft, ChevronRight, Check, Ban } from 'lucide-react';

interface VariantPreviewModalProps {
  variant: SectionVariant;
  reviewStatus: ReviewStatus;
  onClose: () => void;
  onPrevious?: () => void;
  onNext?: () => void;
  onApprove: () => void;
  onReject: () => void;
  hasPrevious?: boolean;
  hasNext?: boolean;
}

export const VariantPreviewModal: React.FC<VariantPreviewModalProps> = ({
  variant,
  reviewStatus,
  onClose,
  onPrevious,
  onNext,
  onApprove,
  onReject,
  hasPrevious,
  hasNext,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && onPrevious && hasPrevious) onPrevious();
      if (e.key === 'ArrowRight' && onNext && hasNext) onNext();
      if (e.key === 'Enter') onApprove();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onPrevious, onNext, onApprove, hasPrevious, hasNext]);

  const preview = generatePreviewForVariant(variant);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <div className="relative w-full h-full max-w-7xl max-h-[90vh] m-4 bg-white rounded-lg overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-4 border-b bg-white">
          <div>
            <h2 className="text-xl font-bold">{variant.displayName}</h2>
            <p className="text-sm text-neutral-600">
              {variant.sectionType} / {variant.variantKey}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {hasPrevious && onPrevious && (
              <button
                onClick={onPrevious}
                className="p-2 hover:bg-neutral-100 rounded transition-colors"
                title="Previous (←)"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}

            {hasNext && onNext && (
              <button
                onClick={onNext}
                className="p-2 hover:bg-neutral-100 rounded transition-colors"
                title="Next (→)"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            )}

            <div className="w-px h-6 bg-neutral-200 mx-2" />

            <button
              onClick={onReject}
              className={`flex items-center gap-2 px-4 py-2 rounded transition-colors ${
                reviewStatus === 'rejected'
                  ? 'bg-red-100 text-red-700'
                  : 'hover:bg-neutral-100'
              }`}
            >
              <Ban className="w-4 h-4" />
              Reject
            </button>

            <button
              onClick={onApprove}
              className={`flex items-center gap-2 px-4 py-2 rounded transition-colors ${
                reviewStatus === 'approved'
                  ? 'bg-green-600 text-white'
                  : 'bg-green-100 text-green-700 hover:bg-green-200'
              }`}
              title="Approve (Enter)"
            >
              <Check className="w-4 h-4" />
              Approve
            </button>

            <div className="w-px h-6 bg-neutral-200 mx-2" />

            <button
              onClick={onClose}
              className="p-2 hover:bg-neutral-100 rounded transition-colors"
              title="Close (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-auto bg-neutral-50">
          <div className="w-full">
            {preview}
          </div>
        </div>
      </div>
    </div>
  );
};

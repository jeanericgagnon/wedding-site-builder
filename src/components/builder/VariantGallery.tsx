import React, { useState, useMemo, useEffect } from 'react';
import { SectionVariant, SectionType, ReviewStatus } from '../../types/builder';
import { SECTION_VARIANTS } from '../../registry/sectionRegistry';
import { VariantCard } from './VariantCard';
import { VariantPreviewModal } from './VariantPreviewModal';
import { getVariantReviews, updateVariantReview } from '../../lib/reviewService';
import { Search, Filter } from 'lucide-react';

export const VariantGallery: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSection, setSelectedSection] = useState<SectionType | 'all'>('all');
  const [selectedVariant, setSelectedVariant] = useState<SectionVariant | null>(null);
  const [reviews, setReviews] = useState<Map<string, ReviewStatus>>(new Map());
  const [filterStatus, setFilterStatus] = useState<ReviewStatus | 'all'>('all');

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    try {
      const variantReviews = await getVariantReviews();
      const reviewMap = new Map<string, ReviewStatus>();
      variantReviews.forEach(review => {
        reviewMap.set(`${review.sectionType}:${review.variantKey}`, review.status);
      });
      setReviews(reviewMap);
    } catch (error) {
      console.error('Failed to load reviews:', error);
    }
  };

  const sectionTypes = useMemo(() => {
    const types = new Set<SectionType>();
    SECTION_VARIANTS.forEach(v => types.add(v.sectionType));
    return Array.from(types).sort();
  }, []);

  const filteredVariants = useMemo(() => {
    return SECTION_VARIANTS.filter(variant => {
      const matchesSearch =
        searchQuery === '' ||
        variant.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        variant.sectionType.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesSection =
        selectedSection === 'all' || variant.sectionType === selectedSection;

      const variantKey = `${variant.sectionType}:${variant.variantKey}`;
      const reviewStatus = reviews.get(variantKey) || 'unreviewed';
      const matchesStatus = filterStatus === 'all' || reviewStatus === filterStatus;

      return matchesSearch && matchesSection && matchesStatus;
    });
  }, [searchQuery, selectedSection, reviews, filterStatus]);

  const handleUpdateReview = async (
    sectionType: SectionType,
    variantKey: string,
    status: ReviewStatus
  ) => {
    try {
      await updateVariantReview(sectionType, variantKey, status);
      await loadReviews();
    } catch (error) {
      console.error('Failed to update review:', error);
    }
  };

  const handleNavigate = (direction: 'prev' | 'next') => {
    if (!selectedVariant) return;

    const currentIndex = filteredVariants.findIndex(
      v => v.sectionType === selectedVariant.sectionType && v.variantKey === selectedVariant.variantKey
    );

    if (direction === 'prev' && currentIndex > 0) {
      setSelectedVariant(filteredVariants[currentIndex - 1]);
    } else if (direction === 'next' && currentIndex < filteredVariants.length - 1) {
      setSelectedVariant(filteredVariants[currentIndex + 1]);
    }
  };

  const getCurrentIndex = () => {
    if (!selectedVariant) return -1;
    return filteredVariants.findIndex(
      v => v.sectionType === selectedVariant.sectionType && v.variantKey === selectedVariant.variantKey
    );
  };

  const currentIndex = getCurrentIndex();

  const stats = useMemo(() => {
    const total = SECTION_VARIANTS.length;
    const reviewed = Array.from(reviews.values()).filter(s => s !== 'unreviewed').length;
    const approved = Array.from(reviews.values()).filter(s => s === 'approved').length;
    const rejected = Array.from(reviews.values()).filter(s => s === 'rejected').length;

    return { total, reviewed, approved, rejected, unreviewed: total - reviewed };
  }, [reviews]);

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200">
        <h3 className="text-lg font-semibold mb-4">Review Progress</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-neutral-900">{stats.total}</div>
            <div className="text-sm text-neutral-600">Total</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{stats.reviewed}</div>
            <div className="text-sm text-neutral-600">Reviewed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-neutral-400">{stats.unreviewed}</div>
            <div className="text-sm text-neutral-600">Unreviewed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{stats.approved}</div>
            <div className="text-sm text-neutral-600">Approved</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">{stats.rejected}</div>
            <div className="text-sm text-neutral-600">Rejected</div>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
          <input
            type="text"
            placeholder="Search variants..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-neutral-600" />
          <select
            value={selectedSection}
            onChange={(e) => setSelectedSection(e.target.value as SectionType | 'all')}
            className="px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Sections</option>
            {sectionTypes.map(type => (
              <option key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as ReviewStatus | 'all')}
            className="px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="unreviewed">Unreviewed</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-neutral-600">
          {filteredVariants.length} variant{filteredVariants.length !== 1 ? 's' : ''} found
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVariants.map(variant => {
          const variantKey = `${variant.sectionType}:${variant.variantKey}`;
          const reviewStatus = reviews.get(variantKey) || 'unreviewed';

          return (
            <VariantCard
              key={variantKey}
              variant={variant}
              reviewStatus={reviewStatus}
              onPreview={() => setSelectedVariant(variant)}
            />
          );
        })}
      </div>

      {selectedVariant && (
        <VariantPreviewModal
          variant={selectedVariant}
          reviewStatus={reviews.get(`${selectedVariant.sectionType}:${selectedVariant.variantKey}`) || 'unreviewed'}
          onClose={() => setSelectedVariant(null)}
          onPrevious={() => handleNavigate('prev')}
          onNext={() => handleNavigate('next')}
          onApprove={() => handleUpdateReview(selectedVariant.sectionType, selectedVariant.variantKey, 'approved')}
          onReject={() => handleUpdateReview(selectedVariant.sectionType, selectedVariant.variantKey, 'rejected')}
          hasPrevious={currentIndex > 0}
          hasNext={currentIndex < filteredVariants.length - 1}
        />
      )}
    </div>
  );
};

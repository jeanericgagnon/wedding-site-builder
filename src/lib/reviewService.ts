import { supabase } from './supabase';
import { VariantReview, ReviewStatus, SectionType } from '../types/builder';

export async function getVariantReviews(): Promise<VariantReview[]> {
  const { data, error } = await supabase
    .from('variant_reviews')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;

  return data.map(row => ({
    sectionType: row.section_type as SectionType,
    variantKey: row.variant_key,
    status: row.status as ReviewStatus,
    notes: row.notes || undefined,
    reviewedAt: row.reviewed_at || undefined,
    reviewedBy: row.reviewed_by || undefined,
  }));
}

export async function getVariantReview(
  sectionType: SectionType,
  variantKey: string
): Promise<VariantReview | null> {
  const { data, error } = await supabase
    .from('variant_reviews')
    .select('*')
    .eq('section_type', sectionType)
    .eq('variant_key', variantKey)
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;

  return {
    sectionType: data.section_type as SectionType,
    variantKey: data.variant_key,
    status: data.status as ReviewStatus,
    notes: data.notes || undefined,
    reviewedAt: data.reviewed_at || undefined,
    reviewedBy: data.reviewed_by || undefined,
  };
}

export async function updateVariantReview(
  sectionType: SectionType,
  variantKey: string,
  status: ReviewStatus,
  notes?: string,
  reviewedBy?: string
): Promise<void> {
  const existing = await getVariantReview(sectionType, variantKey);

  const reviewData = {
    section_type: sectionType,
    variant_key: variantKey,
    status,
    notes: notes || null,
    reviewed_at: new Date().toISOString(),
    reviewed_by: reviewedBy || null,
    updated_at: new Date().toISOString(),
  };

  if (existing) {
    const { error } = await supabase
      .from('variant_reviews')
      .update(reviewData)
      .eq('section_type', sectionType)
      .eq('variant_key', variantKey);

    if (error) throw error;
  } else {
    const { error } = await supabase
      .from('variant_reviews')
      .insert({
        ...reviewData,
        created_at: new Date().toISOString(),
      });

    if (error) throw error;
  }
}

export async function getReviewStats(): Promise<{
  total: number;
  unreviewed: number;
  approved: number;
  rejected: number;
}> {
  const reviews = await getVariantReviews();

  return {
    total: reviews.length,
    unreviewed: reviews.filter(r => r.status === 'unreviewed').length,
    approved: reviews.filter(r => r.status === 'approved').length,
    rejected: reviews.filter(r => r.status === 'rejected').length,
  };
}

export async function initializeReviews(
  variants: Array<{ sectionType: SectionType; variantKey: string }>
): Promise<void> {
  const existingReviews = await getVariantReviews();
  const existingKeys = new Set(
    existingReviews.map(r => `${r.sectionType}:${r.variantKey}`)
  );

  const newReviews = variants
    .filter(v => !existingKeys.has(`${v.sectionType}:${v.variantKey}`))
    .map(v => ({
      section_type: v.sectionType,
      variant_key: v.variantKey,
      status: 'unreviewed' as const,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }));

  if (newReviews.length > 0) {
    const { error } = await supabase
      .from('variant_reviews')
      .insert(newReviews);

    if (error) throw error;
  }
}

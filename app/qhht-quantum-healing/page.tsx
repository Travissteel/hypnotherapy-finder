import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ModalityPage, buildModalityMetadata } from '@/components/modality/ModalityPage';
import { getModalityBySlug } from '@/lib/data/modalities';

const SLUG = 'qhht-quantum-healing';

export const metadata: Metadata = (() => {
  const m = getModalityBySlug(SLUG);
  return m ? buildModalityMetadata(m) : {};
})();

export default function Page() {
  const modality = getModalityBySlug(SLUG);
  if (!modality) notFound();
  return <ModalityPage modality={modality} />;
}

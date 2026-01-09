import { useMemo, useState } from 'react';
import { ImageModal } from './ImageModal';

type Props = { photos: string[] };

export function PhotoGallery({ photos }: Props) {
  const items = useMemo(() => photos.filter(Boolean), [photos]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      <div className="grid">
        {items.map((src, idx) => (
          <button
            key={`${src}-${idx}`}
            className="gridItem"
            onClick={() => setOpenIndex(idx)}
            aria-label={`사진 ${idx + 1} 확대`}
          >
            <img
              className="thumb"
              src={src}
              alt={`갤러리 사진 ${idx + 1}`}
              loading="lazy"
            />
          </button>
        ))}
      </div>

      {openIndex !== null && (
        <ImageModal
          photos={items}
          index={openIndex}
          onClose={() => setOpenIndex(null)}
          onPrev={() =>
            setOpenIndex((v) =>
              v === null ? 0 : (v - 1 + items.length) % items.length
            )
          }
          onNext={() =>
            setOpenIndex((v) => (v === null ? 0 : (v + 1) % items.length))
          }
        />
      )}
    </>
  );
}

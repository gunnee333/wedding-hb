import { useMemo, useState } from 'react';
import { ImageModal } from './ImageModal';
import * as Images from '../assets/images';

const photos: string[] = [
  Images.photo1,
  Images.photo2,
  Images.photo3,
  Images.photo4,
  Images.photo5,
  Images.photo6,
  Images.photo7,
  Images.photo8,
  Images.photo9,
  Images.photo10,
  Images.photo11,
  Images.photo12
];

export function PhotoGallery() {
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

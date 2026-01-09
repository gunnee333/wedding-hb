import { useEffect } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

type Props = {
  photos: string[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
};

export function ImageModal({ photos, index, onClose, onPrev, onNext }: Props) {
  const src = photos[index];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose, onPrev, onNext]);

  return (
    <div
      className="modalOverlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modalTop">
          <button className="iconBtn" onClick={onPrev} aria-label="이전 사진">
            ‹
          </button>
          <div className="modalIndex">
            {index + 1} / {photos.length}
          </div>
          <button className="iconBtn" onClick={onNext} aria-label="다음 사진">
            ›
          </button>
        </div>

        <div className="modalBody">
          <TransformWrapper
            doubleClick={{ mode: 'toggle' }}
            pinch={{ step: 5 }}
            wheel={{ disabled: true }}
            panning={{ velocityDisabled: true }}
          >
            <TransformComponent>
              <img
                className="modalImg"
                src={src}
                alt={`확대 사진 ${index + 1}`}
              />
            </TransformComponent>
          </TransformWrapper>
        </div>

        <button className="closeBtn" onClick={onClose} aria-label="닫기">
          닫기
        </button>
      </div>
    </div>
  );
}

import { useEffect } from 'react';
import styles from './imageModal.module.scss';
import { Svgs } from '../../assets';

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
      className={styles.modalOverlay}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalBody}>
          <img
            className={styles.modalImg}
            src={src}
            alt={`확대 사진 ${index + 1}`}
          />
        </div>

        <button
          className={[styles.iconBtn, styles.prev].join(' ')}
          onClick={onPrev}
          aria-label="이전 사진"
        >
          <Svgs.arrow fill="#ffffff" />
        </button>

        <button
          className={[styles.iconBtn, styles.next].join(' ')}
          onClick={onNext}
          aria-label="다음 사진"
        >
          <Svgs.arrow fill="#ffffff" />
        </button>
        <div className={styles.modalIndex}>
          {index + 1} / {photos.length}
        </div>
        <button className={styles.closeBtn} onClick={onClose} aria-label="닫기">
          <Svgs.close />
        </button>
      </div>
    </div>
  );
}

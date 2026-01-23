import { useEffect, useRef, useState } from 'react';
import styles from './imageModal.module.scss';
import { Svgs } from '../../assets';
import SwiperCore from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

type Props = {
  photos: { url: string; index: number }[];
  index: number;
  onClose: () => void;
};

export function ImageModal({ photos, index, onClose }: Props) {
  const [currentIndex, setCurrentIndex] = useState(index);
  const swiperRef = useRef<SwiperCore | null>(null);

  function onPrev() {
    swiperRef.current?.slideTo(currentIndex - 1, 0);
  }

  function onNext() {
    swiperRef.current?.slideTo(currentIndex + 1, 0);
  }

  useEffect(() => {
    setCurrentIndex(index);
    if (index) {
      swiperRef.current?.slideTo(index, 0);
    }
  }, [index]);

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
        <div className={styles.modalTop}>
          <div className={styles.modalIndex}>
            {currentIndex + 1} / {photos.length}
          </div>
          <button
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="닫기"
          >
            <Svgs.close />
          </button>
        </div>
        <div className={styles.modalBody}>
          <Swiper
            className={styles.swiper}
            spaceBetween={0}
            slidesPerView="auto"
            threshold={10}
            centeredSlides={true}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
              swiper.slideTo(currentIndex, 0);
            }}
            onSlideChange={(e) => setCurrentIndex(e.activeIndex)}
          >
            {photos.map(({ url, index: i }) => (
              <SwiperSlide key={i} className={styles.modalImg}>
                <img src={url} alt={`확대 사진 ${i + 1}`} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className={styles.arrowContainer}>
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
        </div>
      </div>
    </div>
  );
}

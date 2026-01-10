import { useState } from 'react';
import { Images } from '../../assets';
import styles from './style.module.scss';
import { ImageModal } from '../Modal/ImageModal';

const images: string[] = [
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
  Images.photo12,
  Images.photo13,
  Images.photo14,
  Images.photo15,
  Images.photo16,
  Images.photo17,
  Images.photo18,
  Images.photo19,
  Images.photo20
];

const section1: { url: string; index: number }[] = [];
const section2: { url: string; index: number }[] = [];
const section3: { url: string; index: number }[] = [];
const section4: { url: string; index: number }[] = [];

images.forEach((item, index) => {
  const div = index % 4;
  switch (div) {
    case 0:
      section1.push({ url: item, index });
      break;
    case 1:
      section2.push({ url: item, index });
      break;
    case 2:
      section3.push({ url: item, index });
      break;
    case 3:
      section4.push({ url: item, index });
      break;
  }
});

export default function Component() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.title}>GALLERY</div>
        <div className={styles.listContainer}>
          <div className={styles.list}>
            <div>
              {section1.map((item, index) => (
                <div
                  key={index}
                  className={styles.item}
                  onClick={() => setOpenIndex(item.index)}
                >
                  <img src={item.url} />
                </div>
              ))}
            </div>
            <div>
              {section2.map((item, index) => (
                <div
                  key={index}
                  className={styles.item}
                  onClick={() => setOpenIndex(item.index)}
                >
                  <img src={item.url} />
                </div>
              ))}
            </div>
            <div>
              {section3.map((item, index) => (
                <div
                  key={index}
                  className={styles.item}
                  onClick={() => setOpenIndex(item.index)}
                >
                  <img src={item.url} />
                </div>
              ))}
            </div>
            <div>
              {section4.map((item, index) => (
                <div
                  key={index}
                  className={styles.item}
                  onClick={() => setOpenIndex(item.index)}
                >
                  <img src={item.url} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {openIndex !== null && (
        <ImageModal
          photos={images}
          index={openIndex}
          onClose={() => setOpenIndex(null)}
          onPrev={() =>
            setOpenIndex((v) =>
              v === null ? 0 : (v - 1 + images.length) % images.length
            )
          }
          onNext={() =>
            setOpenIndex((v) => (v === null ? 0 : (v + 1) % images.length))
          }
        />
      )}
    </>
  );
}

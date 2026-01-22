import { useState } from 'react';
import { Svgs, Wedding } from '../../assets';
import styles from './style.module.scss';
import { ImageModal } from '../Modal/ImageModal';
import { inviteData } from '../../data/data';

const images: string[] = [
  Wedding.photo1,
  Wedding.photo2,
  Wedding.photo3,
  Wedding.photo4,
  Wedding.photo5,
  Wedding.photo6,
  Wedding.photo7,
  Wedding.photo8,
  Wedding.photo9,
  Wedding.photo10,
  Wedding.photo11,
  Wedding.photo12,
  Wedding.photo13,
  Wedding.photo14,
  Wedding.photo15,
  Wedding.photo16,
  Wedding.photo17,
  Wedding.photo18,
  Wedding.photo19,
  Wedding.photo20
];

const section1: { url: string; index: number }[] = [];
const section2: { url: string; index: number }[] = [];
const section3: { url: string; index: number }[] = [];
const section4: { url: string; index: number }[] = [];

const rowCnt = Math.floor(images.length / 4);

images.forEach((item, index) => {
  const div = Math.floor(index / rowCnt);
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

const photos = [...section1, ...section2, ...section3, ...section4];

export default function Component() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      <div className={styles.container} id={inviteData.elementId.gallery}>
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
                  <img src={item.url} alt={`사진 ${item.index}`} />
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
                  <img src={item.url} alt={`사진 ${item.index}`} />
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
                  <img src={item.url} alt={`사진 ${item.index}`} />
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
                  <img src={item.url} alt={`사진 ${item.index}`} />
                </div>
              ))}
            </div>
          </div>
        </div>
        <Svgs.division fill="#fdfafa" />
      </div>
      {openIndex !== null && (
        <ImageModal
          photos={photos}
          index={openIndex}
          onClose={() => setOpenIndex(null)}
        />
      )}
    </>
  );
}

import { useEffect } from 'react';
import { inviteData } from '../../data/data';
import styles from './style.module.scss';
import { Images, Svgs } from '../../assets';

let cnt = 0;

function kakaoMapLoad() {
  if (cnt > 0) {
    return;
  }
  try {
    // @ts-ignore
    new daum.roughmap.Lander({
      timestamp: '1768098630107',
      key: 'ft3cw3jc9ca',
      mapWidth: '440',
      mapHeight: '300'
    }).render();
    cnt++;
  } catch (error) {
    console.error('kakaoMapLoad error', error);
  }
}

function tmapLoad() {
  // 티맵 (앱 스킴 + 안내 페이지)
  const schemeUrl = `tmap://route?goalx=${inviteData.place.lng}&goaly=${
    inviteData.place.lat
  }&goalname=${encodeURIComponent(inviteData.place.hallname)}`;
  const fallbackUrl = `https://www.tmap.co.kr/tmap2/mobile/main.do`;

  const start = Date.now();
  window.location.href = schemeUrl;

  window.setTimeout(() => {
    // 스킴이 막히거나 앱 미설치면 대체 링크로
    if (Date.now() - start < 1500) window.location.href = fallbackUrl;
  }, 800);
}

async function copyText(text: string) {
  await window.navigator?.clipboard?.writeText(text);
  alert('주소복사 완료');
}

export default function Component() {
  useEffect(() => {
    kakaoMapLoad();
  }, []);

  return (
    <div className={styles.container} id={inviteData.elementId.location}>
      <div className={styles.title}>Location</div>
      <div>오시는 길</div>
      <div className={styles.division} />
      <div className={styles.desc}>
        {inviteData.place.address}
        <br />
        {inviteData.place.hallname}
        <br />
        {inviteData.place.tel}
        <div className={styles.copyBtn}>
          <button
            onClick={() =>
              copyText(
                `${inviteData.place.address} ${inviteData.place.hallname}`
              )
            }
          >
            주소 복사
          </button>
        </div>
      </div>

      <div className={styles.map}>
        <div
          id="daumRoughmapContainer1768098630107"
          className="root_daum_roughmap root_daum_roughmap_landing"
        ></div>
        <div className={styles.link}>
          <div onClick={() => window.open(inviteData.place.naver)}>
            <img src={Images.naverMap} />
            <span>네이버지도</span>
          </div>
          <div className={styles.div} />
          <div onClick={() => window.open(inviteData.place.kakao)}>
            <img src={Images.kakaoNav} />
            <span>카카오내비</span>
          </div>
          <div className={styles.div} />
          <div onClick={tmapLoad}>
            <img src={Images.tmap} />
            <span>티맵</span>
          </div>
        </div>
        <img src={Images.map} className={styles.mapImg} />
      </div>
      <div className={styles.load}>
        <div className={styles.loadItem}>
          <div className={styles.loadTitle}>
            <div>
              <Svgs.subway />
            </div>
            지하철
          </div>
          <div className={styles.loadTxt}>
            <ul>
              <li>
                <p>
                  <span style={{ color: 'rgb(172, 154, 0)' }}>●</span>{' '}
                  <strong>
                    <span style={{ color: 'rgb(172, 154, 0)' }}>
                      7호선 상동역{' '}
                    </span>
                    <span>7번, 8번 출구</span>
                  </strong>
                  <span>와 바로 연결</span>
                </p>
              </li>
              <li>
                <p>
                  <span style={{ color: 'rgb(0, 120, 203)' }}>●</span>{' '}
                  <strong>
                    <span style={{ color: 'rgb(0, 120, 203)' }}>
                      1호선 송내역
                    </span>{' '}
                    <span>2번출구</span>
                  </strong>
                </p>
              </li>
              <li>
                <p>
                  <span> - 버스로 15분정도 소요 </span>
                </p>
              </li>
              <li>
                <p>
                  <span> - 송내역 버스노선 :</span>
                  <span style={{ color: 'rgb(84, 184, 0)' }}> 16,</span>
                  <span style={{ color: 'rgb(0, 120, 203)' }}> 37,</span>
                  <span style={{ color: 'rgb(84, 184, 0)' }}> 83,</span>
                  <span style={{ color: 'rgb(0, 120, 203)' }}> 87</span>
                </p>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.loadItem}>
          <div className={styles.loadTitle}>
            <div>
              <Svgs.bus />
            </div>
            버스
          </div>
          <div className={styles.loadTxt}>
            <ul>
              <li>
                <p>
                  <span style={{ color: 'rgb(84, 184, 0)' }}>●</span>{' '}
                  <strong>
                    <span style={{ color: 'rgb(84, 184, 0)' }}>
                      5-4, 16, 33, 50-1, 83
                    </span>
                  </strong>
                </p>
              </li>
              <li>
                <p style={{ paddingLeft: 16 }}>- 상동역7번출구.세이브존 하차</p>
              </li>
              <li>
                <p>
                  <span style={{ color: 'rgb(84, 184, 0)' }}>● </span>
                  <strong>
                    <span style={{ color: 'rgb(84, 184, 0)' }}>
                      6-2, 23-2, 50-1, 52, 59, 59-1, 66, 70
                    </span>
                  </strong>
                </p>
              </li>
              <li>
                <p>
                  <span style={{ color: 'rgb(0, 120, 203)' }}>● </span>
                  <strong>
                    <span style={{ color: 'rgb(0, 120, 203)' }}>
                      24, 37, 87
                    </span>
                  </strong>
                </p>
              </li>
              <li>
                <p style={{ paddingLeft: 16 }}>- 상동역8번출구.세이브존 하차</p>
              </li>
              <li>
                <p>
                  <span style={{ color: 'rgb(255, 95, 69)' }}>●</span>
                  <strong>
                    <span style={{ color: 'rgb(255, 95, 69)' }}>광역버스</span>
                  </strong>
                </p>
              </li>
              <li>
                <p style={{ paddingLeft: 16 }}>
                  <strong>
                    <span style={{ color: 'rgb(255, 95, 69)' }}>
                      9300(강남역), 8906(범계역), 8106(분당), 1001(고양교통),
                      1601(홍대)
                    </span>
                  </strong>
                </p>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.loadItem}>
          <div className={styles.loadTitle}>
            <div>
              <Svgs.car />
            </div>
            자가용
          </div>
          <div className={styles.loadTxt}>
            <ul>
              <li>
                <p>
                  <span>● 네비게이션 : </span>
                  <strong>
                    <span>"라비에벨웨딩"</span>
                  </strong>
                  <span> 또는 </span>
                  <strong>
                    <span>"세이브존 상동점"</span>
                  </strong>
                  <span> 입력</span>
                </p>
              </li>
              <li>
                <p style={{ paddingLeft: 16 }}>
                  <span>
                    명칭검색 : "라비에벨웨딩" 또는 "세이브존 상동점" 입력
                  </span>
                </p>
              </li>
              <li>
                <p style={{ paddingLeft: 16 }}>
                  <span>
                    주소 : "부천시 원미구 길주로 105" 또는 "부천시 원미구 상동
                    535-5" 입력
                  </span>
                </p>
              </li>
              <li>
                <p>
                  <span></span>
                </p>
              </li>
              <li>
                <p>
                  <span>● </span>
                  <strong>
                    <span>판교방면</span>
                  </strong>
                  <span>에서 오실 경우</span>
                </p>
              </li>
              <li>
                <p style={{ paddingLeft: 16 }}>
                  <span>
                    서울외곽순환고속도로 → 중동 IC 진출 후 사거리에서 직진 후
                    100m 앞 우회전 → 영광사거리 직진 후 우회전 → 상동역방면으로
                    세이브존 9층
                  </span>
                </p>
              </li>
              <li>
                <p>
                  <span>● </span>
                  <strong>
                    <span>일산, 김포방면</span>
                  </strong>
                  <span>에서 오실 경우</span>
                </p>
              </li>
              <li>
                <p style={{ paddingLeft: 16 }}>
                  <span>
                    서울외곽순환고속도로 → 중동 IC 진출 후 사거리에서 유턴 후
                    100m 앞 우회전 → 영광사거리 직진 후 우회전 → 상동역방면으로
                    세이브존 9층
                  </span>
                </p>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.loadItem}>
          <div className={styles.loadTitle}>
            <div>
              <Svgs.parking />
            </div>
            주차
          </div>
          <div className={styles.loadTxt}>
            <ul>
              <li>
                <p>
                  <span>● </span>
                  <strong>
                    <span>세이브존 B2~B4 주차장</span>
                  </strong>
                </p>
              </li>
              <li>
                <p>
                  <span>● </span>
                  <strong>하이파킹 주차장(상동국천빌딩)</strong>
                </p>
              </li>
              <li>
                <p style={{ paddingLeft: 16 }}>
                  <span>- 주차요원의 안내를 받으세요.</span>
                </p>
              </li>
              <li>
                <p style={{ paddingLeft: 16 }}>
                  - 주변 교통이 혼잡하오니 가급적 대중교통을 이용하시기
                  바랍니다.
                </p>
              </li>
              <li>
                <p>
                  <span>● </span>
                  <strong>대형버스 주차장 : "한국만화박물관주차장"</strong>
                </p>
              </li>
              <li>
                <p style={{ paddingLeft: 16 }}>
                  <span>- 주소 : 경기 부천시 원미구 길주로 1</span>
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

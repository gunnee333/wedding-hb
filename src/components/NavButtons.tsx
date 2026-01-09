type Props = {
  placeName: string;
  lat: number;
  lng: number;
};

function enc(v: string) {
  return encodeURIComponent(v);
}

function trySchemeThenFallback(schemeUrl: string, fallbackUrl: string) {
  const start = Date.now();
  window.location.href = schemeUrl;

  window.setTimeout(() => {
    // 스킴이 막히거나 앱 미설치면 대체 링크로
    if (Date.now() - start < 1500) window.location.href = fallbackUrl;
  }, 800);
}

export function NavButtons({ placeName, lat, lng }: Props) {
  // 카카오맵 웹 길찾기(범용)
  const kakaoWeb = `https://map.kakao.com/link/to/${enc(
    placeName
  )},${lat},${lng}`;

  // 네이버지도 (앱 스킴 + 웹 대체)
  const naverScheme = `nmap://route/public?dlat=${lat}&dlng=${lng}&dname=${enc(
    placeName
  )}&appname=${enc('com.mobile.invite')}`;
  const naverWeb = `https://map.naver.com/v5/directions/-/${lng},${lat},${enc(
    placeName
  )}`;

  // 티맵 (앱 스킴 + 안내 페이지)
  const tmapScheme = `tmap://route?goalx=${lng}&goaly=${lat}&goalname=${enc(
    placeName
  )}`;
  const tmapFallback = `https://www.tmap.co.kr/tmap2/mobile/main.do`;

  return (
    <div className="navBtnRow">
      <button className="btn" onClick={() => (window.location.href = kakaoWeb)}>
        카카오맵 길찾기
      </button>

      <button
        className="btn"
        onClick={() => trySchemeThenFallback(naverScheme, naverWeb)}
      >
        네이버지도 길찾기
      </button>

      <button
        className="btn"
        onClick={() => trySchemeThenFallback(tmapScheme, tmapFallback)}
      >
        티맵 길찾기
      </button>
    </div>
  );
}

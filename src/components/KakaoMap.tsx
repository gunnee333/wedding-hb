import { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    kakao: any;
  }
}

type Props = {
  lat: number;
  lng: number;
  label?: string;
};

function loadKakaoMapScript(appKey: string) {
  return new Promise<void>((resolve, reject) => {
    if (window.kakao?.maps) return resolve();

    const existing = document.querySelector<HTMLScriptElement>(
      'script[data-kakao-maps="1"]'
    );
    if (existing) {
      existing.addEventListener('load', () => resolve());
      existing.addEventListener('error', () =>
        reject(new Error('Kakao Maps script load failed'))
      );
      return;
    }

    const script = document.createElement('script');
    script.dataset.kakaoMaps = '1';
    script.async = true;
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${appKey}&autoload=false`;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Kakao Maps script load failed'));
    document.head.appendChild(script);
  });
}

export function KakaoMap({ lat, lng, label }: Props) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const key = process.env.REACT_APP_KAKAO_MAP_APP_KEY || '';
    if (!key) {
      setError('REACT_APP_KAKAO_MAP_APP_KEY 가 설정되지 않았습니다.');
      return;
    }

    let destroyed = false;

    (async () => {
      try {
        await loadKakaoMapScript(key);
        if (destroyed) return;

        window.kakao.maps.load(() => {
          if (!mapRef.current) return;

          const center = new window.kakao.maps.LatLng(lat, lng);
          const map = new window.kakao.maps.Map(mapRef.current, {
            center,
            level: 3
          });

          const marker = new window.kakao.maps.Marker({ position: center });
          marker.setMap(map);

          if (label) {
            const iw = new window.kakao.maps.InfoWindow({
              content: `<div style="padding:6px 8px;font-size:12px;">${label}</div>`
            });
            iw.open(map, marker);
          }
        });
      } catch (e: any) {
        setError(e?.message ?? '카카오맵 로드 오류');
      }
    })();

    return () => {
      destroyed = true;
    };
  }, [lat, lng, label]);

  if (error) return <div className="errorBox">{error}</div>;
  return <div ref={mapRef} className="map" aria-label="카카오 지도" />;
}

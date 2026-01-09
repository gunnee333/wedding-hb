import { useEffect, useState } from 'react';

declare global {
  interface Window {
    Kakao: any;
  }
}

function loadKakaoJsSdk() {
  return new Promise<void>((resolve, reject) => {
    if (window.Kakao?.isInitialized?.()) return resolve();

    const existing = document.querySelector<HTMLScriptElement>(
      'script[data-kakao-js-sdk="1"]'
    );
    if (existing) {
      existing.addEventListener('load', () => resolve());
      existing.addEventListener('error', () =>
        reject(new Error('Kakao JS SDK load failed'))
      );
      return;
    }

    const script = document.createElement('script');
    script.dataset.kakaoJsSdk = '1';
    script.async = true;

    // CDN 버전은 바뀔 수 있음 (필요하면 최신 버전으로 교체)
    script.src = 'https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js';

    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Kakao JS SDK load failed'));
    document.head.appendChild(script);
  });
}

type Props = {
  title: string;
  description: string;
  imageUrl: string;
  url: string;
};

export function ShareButtons({ title, description, imageUrl, url }: Props) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const key = process.env.REACT_APP_KAKAO_JS_KEY || '';
    if (!key) return;

    (async () => {
      await loadKakaoJsSdk();
      if (!window.Kakao.isInitialized()) window.Kakao.init(key);
      setReady(true);
    })().catch(() => setReady(false));
  }, []);

  const shareKakao = () => {
    if (!ready) return;

    window.Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title,
        description,
        imageUrl,
        link: { mobileWebUrl: url, webUrl: url }
      },
      buttons: [
        {
          title: '청첩장 보기',
          link: { mobileWebUrl: url, webUrl: url }
        }
      ]
    });
  };

  const copyLink = async () => {
    await navigator.clipboard.writeText(url);
    alert('링크를 복사했습니다.');
  };

  return (
    <div className="shareRow">
      <button className="btnPrimary" onClick={shareKakao} disabled={!ready}>
        카카오톡 공유
      </button>
      <button className="btn" onClick={copyLink}>
        링크 복사
      </button>
    </div>
  );
}

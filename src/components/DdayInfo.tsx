import { useEffect, useMemo, useState } from 'react';

function diffParts(targetMs: number, nowMs: number) {
  const diff = targetMs - nowMs;
  const abs = Math.abs(diff);

  const totalSec = Math.floor(abs / 1000);
  const days = Math.floor(totalSec / 86400);
  const hours = Math.floor((totalSec % 86400) / 3600);
  const mins = Math.floor((totalSec % 3600) / 60);
  const secs = totalSec % 60;

  return { diff, days, hours, mins, secs };
}

type Props = {
  weddingDateISO: string;
  ceremonyOrder: string[];
  bus: string[];
  parking: string[];
};

export function DdayInfo({
  weddingDateISO,
  ceremonyOrder,
  bus,
  parking
}: Props) {
  const targetMs = useMemo(
    () => new Date(weddingDateISO).getTime(),
    [weddingDateISO]
  );
  const [nowMs, setNowMs] = useState(() => Date.now());

  useEffect(() => {
    const t = window.setInterval(() => setNowMs(Date.now()), 1000);
    return () => window.clearInterval(t);
  }, []);

  const d = diffParts(targetMs, nowMs);
  const isBefore = d.diff >= 0;

  return (
    <div className="infoWrap">
      <div className="ddayCard">
        <div className="ddayTitle">{isBefore ? 'D-Day' : '기념일 이후'}</div>
        <div className="ddayValue">
          {d.days}일 {d.hours}시간 {d.mins}분 {d.secs}초
        </div>
      </div>

      <div className="infoCard">
        <div className="infoTitle">식순</div>
        <ul className="infoList">
          {ceremonyOrder.map((x, i) => (
            <li key={i}>{x}</li>
          ))}
        </ul>
      </div>

      <div className="infoCard">
        <div className="infoTitle">버스 안내</div>
        <ul className="infoList">
          {bus.map((x, i) => (
            <li key={i}>{x}</li>
          ))}
        </ul>
      </div>

      <div className="infoCard">
        <div className="infoTitle">주차 안내</div>
        <ul className="infoList">
          {parking.map((x, i) => (
            <li key={i}>{x}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

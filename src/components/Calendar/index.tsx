import { useEffect, useMemo, useState } from 'react';
import { Svgs } from '../../assets';
import styles from './style.module.scss';
import { inviteData } from '../../data/data';

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

export default function Component() {
  const targetMs = useMemo(
    () => new Date(inviteData.date.dateISO).getTime(),
    [inviteData.date.dateISO]
  );
  const [nowMs, setNowMs] = useState(() => Date.now());

  useEffect(() => {
    const t = window.setInterval(() => setNowMs(Date.now()), 1000);
    return () => window.clearInterval(t);
  }, []);

  const d = diffParts(targetMs, nowMs);
  const isBefore = d.days >= 0;

  return (
    <>
      <Svgs.division />
      <div className={styles.container} id={inviteData.elementId.calendar}>
        <div className={styles.title}>CALENDAR</div>
        <div className={styles.date}>{inviteData.date.kr}</div>
        <table>
          <tbody>
            <tr>
              <td>일</td>
              <td>월</td>
              <td>화</td>
              <td>수</td>
              <td>목</td>
              <td>금</td>
              <td>토</td>
            </tr>
            <tr>
              <td>1</td>
              <td>2</td>
              <td>3</td>
              <td>4</td>
              <td>5</td>
              <td>6</td>
              <td>7</td>
            </tr>
            <tr>
              <td className={styles.active}>
                <span></span>
                <div>8</div>
                <p>오후 12시</p>
              </td>
              <td>9</td>
              <td>10</td>
              <td>11</td>
              <td>12</td>
              <td>13</td>
              <td>14</td>
            </tr>
            <tr>
              <td>15</td>
              <td>16</td>
              <td>17</td>
              <td>18</td>
              <td>19</td>
              <td>20</td>
              <td>21</td>
            </tr>
            <tr>
              <td>22</td>
              <td>23</td>
              <td>24</td>
              <td>25</td>
              <td>26</td>
              <td>27</td>
              <td>28</td>
            </tr>
            <tr>
              <td>29</td>
              <td>30</td>
              <td>31</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
        <div className={styles.timer}>
          <div>
            {String(d.days).padStart(2, '0')}
            <span>Days</span>
          </div>
          :
          <div>
            {String(d.hours).padStart(2, '0')}
            <span>Hours</span>
          </div>
          :
          <div>
            {String(d.mins).padStart(2, '0')}
            <span>Min</span>
          </div>
          :
          <div>
            {String(d.secs).padStart(2, '0')}
            <span>Sec</span>
          </div>
        </div>
        {d.days === 0 ? (
          <div className={styles.desc}>
            오늘은 {inviteData.wedding.groom.slice(1, 3)} <span>♥</span>{' '}
            {inviteData.wedding.bride.slice(1, 3)}의 결혼식 <span>당일</span>
            입니다.
          </div>
        ) : (
          <div className={styles.desc}>
            {inviteData.wedding.groom.slice(1, 3)} <span>♥</span>{' '}
            {inviteData.wedding.bride.slice(1, 3)}의 결혼식이{' '}
            <span>{d.days}</span>일 {isBefore ? '남았습니다.' : '지났습니다.'}
          </div>
        )}
      </div>
    </>
  );
}

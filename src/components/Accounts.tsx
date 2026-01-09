type AccountItem = {
  label: string;
  bank: string;
  number: string;
  holder: string;
};

type Props = {
  accounts: {
    groom: AccountItem[];
    bride: AccountItem[];
  };
};

async function copyText(text: string) {
  await navigator.clipboard.writeText(text);
  alert('계좌번호를 복사했습니다.');
}

export function Accounts({ accounts }: Props) {
  return (
    <div className="accountWrap">
      <div className="accountCol">
        <div className="accountTitle">신랑측</div>
        {accounts.groom.map((a, i) => (
          <div key={`${a.number}-${i}`} className="accountCard">
            <div className="accountLabel">{a.label}</div>
            <div className="accountLine">
              {a.bank} {a.number}
            </div>
            <div className="accountSub">예금주: {a.holder}</div>
            <button
              className="btn"
              onClick={() => copyText(`${a.bank} ${a.number}`)}
            >
              계좌 복사
            </button>
          </div>
        ))}
      </div>

      <div className="accountCol">
        <div className="accountTitle">신부측</div>
        {accounts.bride.map((a, i) => (
          <div key={`${a.number}-${i}`} className="accountCard">
            <div className="accountLabel">{a.label}</div>
            <div className="accountLine">
              {a.bank} {a.number}
            </div>
            <div className="accountSub">예금주: {a.holder}</div>
            <button
              className="btn"
              onClick={() => copyText(`${a.bank} ${a.number}`)}
            >
              계좌 복사
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

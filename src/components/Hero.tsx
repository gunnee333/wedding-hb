type Props = {
  title: string;
  dateText: string;
  placeName: string;
};

export function Hero({ title, dateText, placeName }: Props) {
  return (
    <header className="hero">
      <div className="heroInner">
        <div className="heroTitle">{title}</div>
        <div className="heroMeta">{dateText}</div>
        <div className="heroMeta">{placeName}</div>
      </div>
    </header>
  );
}

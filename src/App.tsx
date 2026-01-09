import './App.css';
import { inviteData } from './data/inviteData';

import { Hero } from './components/Hero';
import { ShareButtons } from './components/ShareButtons';
import { DdayInfo } from './components/DdayInfo';
import { PhotoGallery } from './components/PhotoGallery';
import { Accounts } from './components/Accounts';
import { NavButtons } from './components/NavButtons';
// import { KakaoMap } from './components/KakaoMap';
import { Comments } from './components/Comments';

function App() {
  return (
    <div className="page">
      <Hero
        title={inviteData.title}
        dateText={inviteData.dateText}
        placeName={inviteData.placeName}
      />

      <section className="section">
        <ShareButtons
          title={inviteData.title}
          description={inviteData.share.description}
          imageUrl={inviteData.share.imageUrl}
          url={inviteData.share.url}
        />
      </section>

      <section className="section">
        <DdayInfo
          weddingDateISO={inviteData.weddingDateISO}
          ceremonyOrder={inviteData.info.ceremonyOrder}
          bus={inviteData.info.bus}
          parking={inviteData.info.parking}
        />
      </section>

      <section className="section">
        <h2 className="sectionTitle">갤러리</h2>
        <PhotoGallery />
      </section>

      <section className="section">
        <h2 className="sectionTitle">마음 전하실 곳</h2>
        <Accounts accounts={inviteData.accounts} />
      </section>

      <section className="section">
        <h2 className="sectionTitle">오시는 길</h2>
        <div className="addressBox">
          <div className="place">{inviteData.placeName}</div>
          <div className="addr">{inviteData.address}</div>
        </div>

        <NavButtons
          placeName={inviteData.placeName}
          lat={inviteData.location.lat}
          lng={inviteData.location.lng}
        />

        {/* <div className="mapWrap">
          <KakaoMap
            lat={inviteData.location.lat}
            lng={inviteData.location.lng}
            label={inviteData.placeName}
          />
        </div> */}
      </section>

      <section className="section">
        <h2 className="sectionTitle">댓글</h2>
        <Comments />
      </section>

      <footer className="footer">© Mobile Invitation</footer>
    </div>
  );
}

export default App;

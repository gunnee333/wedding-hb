export const inviteData = {
  title: '권순성 & 이혜빈 결혼합니다',
  dateText: '2026. 03. 21 (토) 오후 1시',
  weddingDateISO: '2026-03-21T13:00:00+09:00',

  placeName: '라비에벨웨딩 3층 그랜드볼룸',
  address: '경기도 부천시 원미구 길주로 105 (상동 535-5)',
  location: { lat: 37.5665, lng: 126.978 },

  share: {
    url: process.env.REACT_APP_SITE_URL!,
    imageUrl: 'https://images.example.com/og.jpg',
    description: '권순성 & 이혜빈의 결혼식에 초대합니다.'
  },

  photos: [
    '/images/1.jpeg',
    '/images/2.jpeg',
    '/images/3.jpeg',
    '/images/4.jpeg',
    '/images/5.jpeg',
    '/images/6.jpeg',
    '/images/7.jpeg',
    '/images/8.jpeg',
    '/images/9.jpeg',
    '/images/10.jpeg',
    '/images/11.jpeg',
    '/images/12.jpeg'
  ],

  accounts: {
    groom: [
      { label: '신랑 OO', bank: '국민', number: '123-456-789012', holder: 'OO' }
    ],
    bride: [
      {
        label: '신부 OO',
        bank: '카카오뱅크',
        number: '3333-12-1234567',
        holder: 'OO'
      }
    ]
  },

  info: {
    ceremonyOrder: ['13:00 예식 시작', '13:40 사진 촬영'],
    bus: ['OO역 2번 출구 11:30 출발'],
    parking: ['지하 주차장 2시간 무료']
  }
};

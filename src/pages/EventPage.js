import React, { useState, useEffect } from 'react';

const Carousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // 3초마다 이미지 변경

    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '200px', overflow: 'hidden' }}>
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Slide ${index + 1}`}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            opacity: index === currentIndex ? 1 : 0,
            transition: 'opacity 0.5s ease-in-out',
          }}
        />
      ))}
    </div>
  );
};

const Tabs = ({ activeTab, setActiveTab }) => (
  <div className="tabs" style={{ display: 'flex', justifyContent: 'space-around', padding: '10px 0', borderBottom: '1px solid #ccc' }}>
    <button
      onClick={() => setActiveTab('today')}
      style={{
        backgroundColor: activeTab === 'today' ? '#1877f2' : 'transparent',
        color: activeTab === 'today' ? 'white' : 'black',
        border: 'none',
        padding: '5px 10px',
        borderRadius: '20px'
      }}
    >
      진행중인 이벤트
    </button>
    <button
      onClick={() => setActiveTab('weekend')}
      style={{
        backgroundColor: activeTab === 'weekend' ? '#1877f2' : 'transparent',
        color: activeTab === 'weekend' ? 'white' : 'black',
        border: 'none',
        padding: '5px 10px',
        borderRadius: '20px'
      }}
    >
      예정된 이벤트
    </button>
    <button
      onClick={() => setActiveTab('applied')}
      style={{
        backgroundColor: activeTab === 'applied' ? '#1877f2' : 'transparent',
        color: activeTab === 'applied' ? 'white' : 'black',
        border: 'none',
        padding: '5px 10px',
        borderRadius: '20px'
      }}
    >
      종료된 이벤트
    </button>
  </div>
);

const EventCard = ({ title, description, time, imageUrl }) => (
  <div className="event-card" style={{
    padding: '10px',
    borderBottom: '1px solid #eee',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100px'
  }}>
    <div style={{ flex: 1, marginRight: '10px' }}>
      <h3 style={{ margin: '0 0 5px 0', fontSize: '16px' }}>{title}</h3>
      <p style={{ margin: '0 0 5px 0', fontSize: '14px' }}>{description}</p>
      <p style={{ margin: '0', fontSize: '12px', color: '#666' }}>{time}</p>
    </div>
    <img src={imageUrl} alt={title} style={{
      width: '100px',
      height: '100px',
      objectFit: 'cover'
    }} />
  </div>
);

const EventList = ({ events }) => (
  <div className="event-list">
    {events.map((event, index) => (
      <EventCard
        key={index}
        title={event.title}
        description={event.description}
        time={event.time}
        imageUrl={event.imageUrl}
      />
    ))}
  </div>
);

const EventPage = () => {
  const [activeTab, setActiveTab] = useState('today');

  const carouselImages = [
    'https://i.namu.wiki/i/clhwQQ9ffGQ2IrgyO1qbNcJ2cA7q0qUblzVQEplhxTYn_skTyDV3js3AA2zMZZgOVOXjFWlXTZB53dHmucJlc8H8hkg2Mo4v032RpU3RPg0rpb1Ffj2j37QSKCJwPxifgtpTKjd99CrBI5LLAH7ceA.webp',
    'https://i.namu.wiki/i/ZZUugEEIkiL7Waba8hJMily20qYWlNl7MHcyaT3igaqzDeEY_8ze-zBu61YoRWIJeWfvtoqW-dQqSWvoqynr-xaoDbBLeDilQCWv1DJXvklzX4Xa_gAFnFCaEtVZYWP0qD1vpHhszJSrMmjzxdg9fg.webp',
    'https://i.namu.wiki/i/HYAx7tFbsFp2JgzqPyU76Wb1BJzfApZK-N2lsWKxJzqWm82omfG2DAr1rt7qd-V0ykQjgxvlHyhZxSgdslo2pB1UpcJqJF0R4r5xu9054R_DMFxZVXgdzv-mz4Vj_YJztEW0KAl7STDFsYtedDFw0w.webp',
  ];

  const eventData = {
    today: [
      {
        title: "일러스타 쁘띠 in GXG 2024",
        description: "오늘 추천 이벤트입니다.",
        time: "2024 09 06~09 07",
        imageUrl: "https://i.namu.wiki/i/clhwQQ9ffGQ2IrgyO1qbNcJ2cA7q0qUblzVQEplhxTYn_skTyDV3js3AA2zMZZgOVOXjFWlXTZB53dHmucJlc8H8hkg2Mo4v032RpU3RPg0rpb1Ffj2j37QSKCJwPxifgtpTKjd99CrBI5LLAH7ceA.webp"
      },
      {
        title: "코믹월드",
        description: "또 다른 오늘의 이벤트입니다.",
        time: "2024 10 05 ~ 10 06",
        imageUrl: "https://i.namu.wiki/i/HYAx7tFbsFp2JgzqPyU76Wb1BJzfApZK-N2lsWKxJzqWm82omfG2DAr1rt7qd-V0ykQjgxvlHyhZxSgdslo2pB1UpcJqJF0R4r5xu9054R_DMFxZVXgdzv-mz4Vj_YJztEW0KAl7STDFsYtedDFw0w.webp"
      },
    ],
    weekend: [
      {
        title: "일러스타 페스 in BICOF 2024",
        description: "장소 : 한국만화영상진흥원 ",
        time: "2024 10 03 ~ 10 06",
        imageUrl: "https://i.namu.wiki/i/clhwQQ9ffGQ2IrgyO1qbNcJ2cA7q0qUblzVQEplhxTYn_skTyDV3js3AA2zMZZgOVOXjFWlXTZB53dHmucJlc8H8hkg2Mo4v032RpU3RPg0rpb1Ffj2j37QSKCJwPxifgtpTKjd99CrBI5LLAH7ceA.webp"
      },
      {
        title: "AGF 2024",
        description: "장소 : 킨텍스",
        time: "2024 12 07 ~ 12 08",
        imageUrl: "https://i.namu.wiki/i/ZZUugEEIkiL7Waba8hJMily20qYWlNl7MHcyaT3igaqzDeEY_8ze-zBu61YoRWIJeWfvtoqW-dQqSWvoqynr-xaoDbBLeDilQCWv1DJXvklzX4Xa_gAFnFCaEtVZYWP0qD1vpHhszJSrMmjzxdg9fg.webp"
      },
    ],
    applied: [
      {
        title: "일러스타 페스 5",
        description: "장소 : SETEC",
        time: "2024 08 24 ~ 08 25",
        imageUrl: "https://i.namu.wiki/i/clhwQQ9ffGQ2IrgyO1qbNcJ2cA7q0qUblzVQEplhxTYn_skTyDV3js3AA2zMZZgOVOXjFWlXTZB53dHmucJlc8H8hkg2Mo4v032RpU3RPg0rpb1Ffj2j37QSKCJwPxifgtpTKjd99CrBI5LLAH7ceA.webp"
      },
      {
        title: "제 177회 코믹월드",
        description: "장소 : 수원메쎄",
        time: "2024 05 11 ~ 05 12",
        imageUrl: "https://i.namu.wiki/i/HYAx7tFbsFp2JgzqPyU76Wb1BJzfApZK-N2lsWKxJzqWm82omfG2DAr1rt7qd-V0ykQjgxvlHyhZxSgdslo2pB1UpcJqJF0R4r5xu9054R_DMFxZVXgdzv-mz4Vj_YJztEW0KAl7STDFsYtedDFw0w.webp"
      },
      {
        title: "일러스타 페스 4",
        description: "장소 : 킨텍스 ",
        time: "2024 05 04 ~ 05 05",
        imageUrl: "https://i.namu.wiki/i/clhwQQ9ffGQ2IrgyO1qbNcJ2cA7q0qUblzVQEplhxTYn_skTyDV3js3AA2zMZZgOVOXjFWlXTZB53dHmucJlc8H8hkg2Mo4v032RpU3RPg0rpb1Ffj2j37QSKCJwPxifgtpTKjd99CrBI5LLAH7ceA.webp"
      },
    ],
  };

  return (
    <div className="event-page" style={{
      width: '100%',
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px',
      boxSizing: 'border-box'
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <Carousel images={carouselImages} />
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <EventList events={eventData[activeTab]} />
      </div>
    </div>
  );
};

export default EventPage;
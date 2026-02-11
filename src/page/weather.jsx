import { useState, useEffect } from 'react';
import './Weather.css';

const CITY_MAP = {
  tokyo: { name: '東京', code: '130000' },
  osaka: { name: '大阪', code: '270000' },
  sapporo: { name: '札幌', code: '016000' },
};

function Weather() {
  const [city, setCity] = useState('tokyo');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const [isNight, setIsNight] = useState(false);


  useEffect(() => {
    const checkTime = () => {
      const hour = new Date().getHours();
      const night = hour >= 19 || hour < 5;
      setIsNight(night);
    };

    checkTime();
    const timer = setInterval(checkTime, 60 * 1000);

    return () => clearInterval(timer);
  }, []);


  useEffect(() => {
    fetch(
      `https://www.jma.go.jp/bosai/forecast/data/forecast/${CITY_MAP[city].code}.json`
    )
      .then(res => {
        if (!res.ok) throw new Error('通信エラー');
        return res.json();
      })
      .then(data => {
        const today = data[0].timeSeries[0].areas[0];
        setWeatherData(today);
      })
      .catch(err => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [city]);

  return (

    <div className={`weather-app ${isNight ? 'night' : ''}`}>
      <h1 className="title">天気</h1>

      <div className="city-selector">
        {Object.entries(CITY_MAP).map(([key, value]) => (
          <button
            key={key}
            className={city === key ? 'active' : ''}
            onClick={() => {
              setCity(key);
              setLoading(true);
            }}
          >
            {value.name}
          </button>
        ))}
      </div>

      <div className="weather-card">
        {loading && <p className="status">読み込み中...</p>}
        {error && <p className="status error">エラー: {error.message}</p>}

        {weatherData && !loading && (
          <>
            <h2>{weatherData.area.name}</h2>
            <p className="weather-text">{weatherData.weathers[0]}</p>
          </>
        )}
      </div>
    </div>
  );
}

export default Weather;
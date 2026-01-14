'use client';

import { useState, useEffect, useRef } from 'react';

const WEATHER_API_KEY = "f2e5fc46ce5367ef52943bf3ad6bd3aa";
const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5/weather";
const DEFAULT_CITY = "Dubai";
const WEATHER_UPDATE_INTERVAL = 300000; // 5 minutes

const WEATHER_ICONS: { [key: string]: string } = {
  "01d": "☀️", "01n": "🌙", "02d": "🌤️", "02n": "🌤️",
  "03d": "⛅", "03n": "⛅", "04d": "☁️", "04n": "☁️",
  "09d": "🌧️", "09n": "🌧️", "10d": "🌦️", "10n": "🌦️",
  "11d": "⛈️", "11n": "⛈️", "13d": "❄️", "13n": "❄️",
  "50d": "🌫️", "50n": "🌫️"
};

const MONTHS = ["January", "February", "March", "April", "May", "June", 
                "July", "August", "September", "October", "November", "December"];
const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

interface WeatherState {
  city: string;
  temp: string;
  icon: string;
}

interface WeatherResponse {
  name: string;
  main: {
    temp: number;
  };
  weather: Array<{
    icon: string;
  }>;
}

const christmasHatAnimation = {
  v: "5.5.6", fr: 8, ip: 0, op: 16, w: 280, h: 280, nm: "shengdanmao", ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0, ind: 1, ty: 4, nm: "ç½è²1", sr: 1,
      ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 18.128, ix: 10 }, p: { a: 0, k: [147.25, 112, 0], ix: 2 }, a: { a: 0, k: [0, 0, 0], ix: 1 }, s: { a: 0, k: [100, 82.202, 100], ix: 6 } },
      ao: 0,
      shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[1.449, 0.725], [1.313, -6.11], [-7.374, 1.413], [-22.086, -21.211], [-4.321, 3.124], [16.5, -1.5], [17.619, 4.54]], o: [[-2.044, -1.022], [-0.552, 2.567], [10.846, -2.079], [12.113, 11.633], [13.765, -9.952], [-6.934, 0.63], [-24.306, -6.263]], v: [[-18, -97], [-25.237, -90.606], [-24.05, -69.466], [53.62, -48.31], [73.515, -43.163], [74.75, -74.5], [34.616, -91.285]], c: true }, ix: 2 }, nm: "è·¯å¾ 1", mn: "ADBE Vector Shape - Group", hd: false }, { ty: "st", c: { a: 0, k: [0.858026981354, 0.858026981354, 0.858026981354, 1], ix: 3 }, o: { a: 0, k: 100, ix: 4 }, w: { a: 0, k: 2, ix: 5 }, lc: 1, lj: 1, ml: 4, bm: 0, nm: "æè¾¹ 1", mn: "ADBE Vector Graphic - Stroke", hd: false }, { ty: "fl", c: { a: 0, k: [1, 1, 1, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "å¡«å 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [0, 0], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "åæ" }] }],
      ip: 0, op: 16, st: 0, bm: 0
    },
    {
      ddd: 0, ind: 2, ty: 4, nm: "å½¢çå¾å± 3", parent: 3, sr: 1,
      ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [5.373, -1.458, 0], ix: 2 }, a: { a: 0, k: [0, 0, 0], ix: 1 }, s: { a: 0, k: [99.817, 96.856, 100], ix: 6 } },
      ao: 0,
      shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0.634, -1.295], [0.026, -3.761], [-0.244, 0.05], [-1.391, 8.442]], o: [[-0.634, 1.295], [-0.031, 4.453], [0.244, -0.05], [-0.241, -7.073]], v: [[106.671, -54.815], [110.393, -46.121], [104.717, -38.876], [113.29, -44.9]], c: true }, ix: 2 }, nm: "è·¯å¾ 1", mn: "ADBE Vector Shape - Group", hd: false }, { ty: "st", c: { a: 0, k: [0.900995710784, 0.900995710784, 0.900995710784, 1], ix: 3 }, o: { a: 0, k: 100, ix: 4 }, w: { a: 0, k: 0, ix: 5 }, lc: 1, lj: 1, ml: 4, bm: 0, nm: "æè¾¹ 1", mn: "ADBE Vector Graphic - Stroke", hd: false }, { ty: "fl", c: { a: 0, k: [0.9, 0.9, 0.900980392157, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "å¡«å 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [0, 0], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "åæ" }] }],
      ip: 0, op: 16, st: 0, bm: 0
    },
    {
      ddd: 0, ind: 3, ty: 4, nm: "å½¢çå¾å± 2", sr: 1,
      ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 1, k: [{ i: { x: [0.833], y: [0.833] }, o: { x: [0.167], y: [0.167] }, t: 0, s: [11.288], e: [-2.765] }, { i: { x: [0.833], y: [0.833] }, o: { x: [0.167], y: [0.167] }, t: 6, s: [-2.765], e: [4.353] }, { i: { x: [0.833], y: [0.833] }, o: { x: [0.167], y: [0.167] }, t: 10, s: [4.353], e: [11.288] }, { t: 14 }] }, p: { a: 0, k: [160.25, 57.5, 0], ix: 2 }, a: { a: 0, k: [5.28, -71.066, 0], ix: 1 }, s: { a: 0, k: [100.864, 101.625, 100], ix: 6 } },
      ao: 0,
      shapes: [{ ty: "gr", it: [{ ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[50.75, 29.75], [0, 0], [0, 2.5], [-21, -6.5], [0, -0.25], [-13.25, 8.75]], o: [[-50.75, -29.75], [0, 0], [0, -2.5], [7.143, 2.812], [0, 0.25], [13.25, -8.75]], v: [[80.5, -116], [-10.265, -90.584], [75.187, -49.406], [94.83, -73.027], [100.75, -51.75], [109.5, -46.75]], c: true }, ix: 2 }, nm: "è·¯å¾ 1", mn: "ADBE Vector Shape - Group", hd: false }, { ty: "st", c: { a: 0, k: [0.780330896378, 0, 0, 1], ix: 3 }, o: { a: 0, k: 100, ix: 4 }, w: { a: 0, k: 2, ix: 5 }, lc: 1, lj: 1, ml: 4, bm: 0, nm: "æè¾¹ 1", mn: "ADBE Vector Graphic - Stroke", hd: false }, { ty: "fl", c: { a: 0, k: [1, 0, 0, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: "å¡«å 1", mn: "ADBE Vector Graphic - Fill", hd: false }, { ty: "tr", p: { a: 0, k: [2.565, 2.213], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "åæ" }] }],
      ip: 0, op: 16, st: 0, bm: 0
    },
    { ddd: 0, ind: 4, ty: 4, nm: "å½¢çå¾å± 1", sr: 1, ks: { o: { a: 0, k: 100, ix: 11 }, r: { a: 0, k: 0, ix: 10 }, p: { a: 0, k: [140, 140, 0], ix: 2 }, a: { a: 0, k: [0, 0, 0], ix: 1 }, s: { a: 0, k: [100, 100, 100], ix: 6 } }, ao: 0, shapes: [], ip: 0, op: 16, st: 0, bm: 0 }
  ],
  markers: []
};

export default function TimeWeatherWidget() {
  const [time, setTime] = useState<string>('--:--:--');
  const [date, setDate] = useState<string>('Loading...');
  const [showSeconds, setShowSeconds] = useState<boolean>(true);
  const [weather, setWeather] = useState<WeatherState>({
    city: DEFAULT_CITY,
    temp: '--',
    icon: '⛅'
  });
  
  const lottieRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<any>(null);
  const isMountedRef = useRef(false);

  // Mark as mounted to avoid hydration mismatch
  useEffect(() => {
    isMountedRef.current = true;
  }, []);

  // Update Time
  useEffect(() => {
    if (!isMountedRef.current) return;

    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const displayHours = hours % 12 || 12;
      
      const timeString = showSeconds
        ? `${displayHours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')} ${ampm}`
        : `${displayHours}:${String(minutes).padStart(2, '0')} ${ampm}`;
      
      setTime(timeString);
      
      const day = DAYS[now.getDay()];
      const month = MONTHS[now.getMonth()];
      const dateNum = now.getDate();
      const year = now.getFullYear();
      setDate(`${day}, ${month} ${dateNum}, ${year}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [showSeconds]);

  // Fetch Weather
  useEffect(() => {
    if (!isMountedRef.current) return;

    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `${WEATHER_API_URL}?q=${DEFAULT_CITY}&appid=${WEATHER_API_KEY}`
        );
        
        if (response.ok) {
          const data: WeatherResponse = await response.json();
          const tempCelsius = Math.round(data.main.temp - 273.15);
          const weatherIcon = WEATHER_ICONS[data.weather[0].icon] || '⛅';
          
          setWeather({
            city: data.name,
            temp: `${tempCelsius}°C`,
            icon: weatherIcon
          });
        }
      } catch (error) {
        console.error('Weather fetch error:', error);
      }
    };

    fetchWeather();
    const interval = setInterval(fetchWeather, WEATHER_UPDATE_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  const handleTimeClick = () => {
    setShowSeconds(!showSeconds);
  };

  return (
    <>
      <style jsx>{`
        .time-weather-section {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          width: 100%;
          max-width: 800px;
          margin: 0 auto;
          padding: 0;
          background-color: rgba(31, 43, 59, 0.5);
          border-radius: 12px;
          border: 1px solid rgba(0, 0, 0, 0.1);
          backdrop-filter: blur(5px);
          -webkit-backdrop-filter: blur(5px);
          overflow: visible;
          position: relative;
        }

        .lottie-container {
          position: absolute;
          top: -20px;
          right: -20px;
          width: 180px;
          height: 180px;
          z-index: 100;
          pointer-events: none;
          opacity: 1;
          animation: float 3s ease-in-out infinite;
          transform-origin: center center;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(5deg); }
        }

        .time-compact {
          background: transparent;
          color: #fff;
          width: 100%;
          box-sizing: border-box;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 15px 20px;
          min-height: 80px;
          gap: 25px;
          overflow: hidden;
          cursor: pointer;
        }

        .time-main {
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
        }

        .time-main::after {
          content: "";
          position: absolute;
          right: -13px;
          top: 50%;
          transform: translateY(-50%);
          height: 60%;
          width: 1px;
          background: rgba(0, 0, 0, 0.15);
        }

        .time-display {
          font-size: 38px;
          font-weight: 600;
          margin: 0;
          font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
          color: #6455c4;
          line-height: 1;
        }

        .date-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .date-display {
          font-size: 20px;
          opacity: 1;
          color: #fff;
          margin: 0;
          font-weight: 500;
          text-align: left;
          line-height: 1.2;
        }

        .section-divider {
          width: 80%;
          height: 1px;
          background: rgba(253, 153, 8, 0.6);
          text-align: center;
          margin: auto;
          padding: 0;
        }

        .weather-compact {
          background: transparent;
          color: #fff;
          width: 100%;
          box-sizing: border-box;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 15px 20px;
          min-height: 80px;
          gap: 20px;
          overflow: hidden;
        }

        .weather-left {
          display: flex;
          align-items: center;
          gap: 18px;
          flex: 1;
        }

        .weather-icon {
          font-size: 42px;
        }

        .weather-temp {
          display: flex;
          flex-direction: column;
        }

        .temperature {
          font-size: 42px;
          font-weight: 600;
          font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
          color: #6455c4;
          line-height: 1;
        }

        .weather-right {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          text-align: right;
          flex: 1;
        }

        .weather-location {
          font-size: 25px;
          color: #fff;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 4px;
        }

        @media (max-width: 768px) {
          .time-weather-section { max-width: 95%; }
          .lottie-container { width: 140px; height: 140px; top: -15px; right: -15px; }
          .time-compact { padding: 12px 15px; min-height: 70px; gap: 20px; }
          .time-display { font-size: 36px; }
          .date-display { font-size: 18px; }
          .weather-compact { padding: 12px 15px; min-height: 70px; }
          .weather-icon { font-size: 40px; }
          .temperature { font-size: 36px; }
          .weather-location { font-size: 18px; }
        }

        @media (max-width: 600px) {
          .time-compact { flex-direction: column; padding: 12px; min-height: 90px; gap: 16px; }
          .time-main::after { display: none; }
          .time-display { font-size: 32px; }
          .date-display { font-size: 16px; }
          .weather-compact { flex-direction: row; padding: 12px; min-height: 90px; gap: 10px; }
          .weather-left, .weather-right { width: 100%; align-items: center; text-align: center; }
          .weather-right { align-items: center; }
          .weather-icon { font-size: 36px; }
          .temperature { font-size: 32px; }
          .weather-location { font-size: 18px; }
        }

        @media (max-width: 480px) {
          .lottie-container { width: 120px; height: 120px; top: -10px; right: -10px; }
          .time-compact { min-height: 80px; padding: 10px; }
          .time-display { font-size: 28px; }
          .date-display { font-size: 15px; }
          .weather-compact { min-height: 80px; padding: 10px; }
          .weather-icon { font-size: 32px; }
          .temperature { font-size: 28px; }
          .weather-location { font-size: 16px; }
        }
      `}</style>

      <div className="time-weather-section">
        <div className="lottie-container" ref={lottieRef}></div>
        
        <div className="time-compact" onClick={handleTimeClick}>
          <div className="time-main">
            <div className="time-display">{time}</div>
          </div>
          <div className="date-section">
            <div className="date-display">{date}</div>
          </div>
        </div>

        <div className="section-divider"></div>

        <div className="weather-compact">
          <div className="weather-left">
            <div className="weather-icon">{weather.icon}</div>
            <div className="weather-temp">
              <div className="temperature">{weather.temp}</div>
            </div>
          </div>
          <div className="weather-right">
            <div className="weather-location">
              <span>📍</span>
              <span>{weather.city}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
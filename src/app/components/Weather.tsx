import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FiSearch } from "react-icons/fi";
import { CiLocationOn } from "react-icons/ci";
import { GoDot } from "react-icons/go";

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

const Weather: React.FC = () => {
  const [weather, setWeather] = useState({
    description: '',
    name: '',
    temp: 0,
    icon: '',
    humidity: 0,
    windSpeed: 0,
  });
  const [city, setCity] = useState<string>('');

  // 오늘 날짜 포맷 및 요일 추가
  const today = new Date();
  
  // 요일 가져오기
  const weekdays = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
  const dayOfWeek = weekdays[today.getDay()]; // 요일 계산

  // 두 자리 숫자로 포맷
  const month = String(today.getMonth() + 1).padStart(2, '0'); // 월
  const day = String(today.getDate()).padStart(2, '0'); // 일

  const fullFormattedDate = `${month}월 ${day}일 ${dayOfWeek}`; // "09월 24일 화요일" 형식으로 완성

  // 날씨 ID에 따른 설명을 매핑하는 객체
  const weatherDescKo: { [key: number]: string } = {
    200: '천둥과 비',
    201: '천둥과 비',
    202: '천둥과 비',
    210: '약한 천둥',
    211: '천둥',
    212: '강한 천둥',
    221: '불규칙적인 천둥',
    230: '약한 천둥과 비',
    231: '천둥과 비',
    232: '강한 천둥',
    300: '약한 이슬비',
    301: '이슬비',
    302: '강한 이슬비',
    310: '약한 이슬비와 비',
    311: '이슬비와 비',
    312: '강한 이슬비와 비',
    313: '이슬비와 소나기',
    314: '강한 이슬비와 소나기',
    321: '소나기 이슬비',
    500: '약한 비',
    501: '보통 비',
    502: '강한 비',
    503: '매우 강한 비',
    504: '극심한 비',
    511: '얼어붙는 비',
    520: '약한 소나기 비',
    521: '소나기 비',
    522: '강한 소나기 비',
    531: '불규칙적인 소나기 비',
    600: '약한 눈',
    601: '눈',
    602: '강한 눈',
    611: '진눈깨비',
    612: '소나기 진눈깨비',
    613: '강한 소나기 진눈깨비',
    615: '약한 비와 눈',
    616: '비와 눈',
    620: '약한 소나기 눈',
    621: '소나기 눈',
    622: '강한 소나기 눈',
    701: '엷은 안개',
    711: '연기',
    721: '연무',
    731: '모래 먼지',
    741: '안개',
    751: '모래',
    761: '먼지',
    762: '화산재',
    771: '돌풍',
    781: '토네이도',
    800: '맑음',
    801: '약간 구름',
    802: '구름 많음',
    803: '흐림',
    804: '매우 흐림',
  };

  const getWeather = async (lat: number, lon: number) => {
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );

      const weatherId = res.data.weather[0].id;
      const weatherKo = weatherDescKo[weatherId] || '알 수 없음';
      const weatherIcon = res.data.weather[0].icon;
      const weatherIconAdrs = `http://openweathermap.org/img/wn/${weatherIcon}@4x.png`;
      const temp = Math.round(res.data.main.temp);
      const humidity = res.data.main.humidity; // 습도 가져오기
      const windSpeed = res.data.wind.speed; // 바람 속도 가져오기

      setWeather({
        description: weatherKo,
        name: res.data.name,
        temp: temp,
        icon: weatherIconAdrs, //아이콘 url 저장
        humidity: humidity, // 습도 저장
        windSpeed: windSpeed, // 바람 속도 저장
      });
    } catch (err) {
      console.error(err);
    }
  };

  const getCurrentLocationWeather = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        getWeather(lat, lon); // 사용자 위치 기반으로 날씨 정보 요청
      },
      (error) => {
        console.error(error);
        // 위치 정보 요청 실패 시 기본값으로 서울의 날씨를 요청
        getWeather(37.5665, 126.978); // 서울의 위도와 경도
      }
    );
  };

  useEffect(() => {
    getCurrentLocationWeather(); // 컴포넌트 마운트 시 현재 위치 날씨 가져오기
  }, []);

  const handleCitySubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!city) return;

    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );

      const weatherId = res.data.weather[0].id;
      const weatherKo = weatherDescKo[weatherId] || '알 수 없음';
      const weatherIcon = res.data.weather[0].icon;
      const weatherIconAdrs = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
      const temp = Math.round(res.data.main.temp);
      const humidity = res.data.main.humidity; // 습도 가져오기
      const windSpeed = res.data.wind.speed; // 바람 속도 가져오기

      setWeather({
        description: weatherKo,
        name: res.data.name,
        temp: temp,
        icon: weatherIconAdrs,
        humidity: humidity, // 습도 저장
        windSpeed: windSpeed, // 바람 속도 저장
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className='containerlist'>
        <h1 className='weatherT'>날씨</h1>
        <p className='date'>{fullFormattedDate}</p> {/* 오늘 날짜 표시 */}
        <div className='container'>
        <div className='locImg'>
          <CiLocationOn style={{ fontSize: '48px' }} />
        </div>
        <p className='location'>{weather.name || '현재 위치'}</p>
        <div className='box'></div>
        <p className='temper'>{weather.temp}°C</p>
        <p className='weather'>{weather.description}</p>
        <div className='box2'></div>
        <p className='humidity'>
          <span style={{ color: '#767676' }}>습도:</span> {weather.humidity}%
        </p>
        <div className='dotImg'>
          <GoDot style={{ fontSize: '18px' }} />
        </div>
        <p className='windSpeed'>
          <span style={{ color: '#767676' }}>바람 속도: </span> {weather.windSpeed} m/s
        </p> {/* 바람 속도 표시 */}
        {weather.icon && <img className='imgW' src={weather.icon} alt="weather icon" />}
      

      <form className='sub' onSubmit={handleCitySubmit}>
        <input className='search'
          type="text"
          placeholder="도시 이름 입력"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button className='buttonSub' type="submit">
          <FiSearch />
        </button>
      </form> 
    </div>

    </div>
  );
};

export default Weather;

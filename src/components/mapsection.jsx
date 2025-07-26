import { useEffect, useRef, useState } from "react"; 
import { MapContainer, TileLayer,Marker,Tooltip,useMap,useMapEvents,GeoJSON} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "../css/mapsection.css";
import { useTranslation } from "react-i18next";
import { FaPlay, FaPause, FaSpinner } from "react-icons/fa";
import { MdOutlineReplay10, MdOutlineForward10 } from "react-icons/md";
import { FaMapMarkerAlt } from "react-icons/fa";
import { IoMdShare } from "react-icons/io";
import { FaEye } from "react-icons/fa6";
import { MdReplay } from "react-icons/md";
import { IoIosSpeedometer } from "react-icons/io";
import { PiBookOpenText } from "react-icons/pi";
import "@maptiler/leaflet-maptilersdk";

L.Icon.Default.mergeOptions({
  iconRetinaUrl: null,
  iconUrl: null,
  shadowUrl: null,
});

// مكون لتحريك الخريطة إلى موقع محدد عند التحديد
const MapMover = ({ position, zoom }) => {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.flyTo(position, zoom, { duration: 0.2,easeLinearity: 0.2,});
    }
  }, [position, zoom, map]);

  return null;
};

// مكون لمراقبة تفاعل المستخدم مع الخريطة
const MapInteractionHandler = ({ onInteraction }) => {
  useMapEvents({
    movestart: onInteraction,
    zoomstart: onInteraction,
    dragstart: onInteraction,
  });

  return null;
};

const HomeButton = ({ onClick }) => (
  <button className="home-button" onClick={onClick} title="عودة إلى الخريطة الرئيسية">
    🏠
  </button>
);



const formatTime = (timeInSeconds) => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};
export const Mapsection = () => {
  const [geojsonData, setGeojsonData] = useState(null);
  const [imagesData, setImagesData] = useState({});
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [searchError, setSearchError] = useState("");
  const [mapTargetPosition, setMapTargetPosition] = useState(null);
  const [mapZoom, setMapZoom] = useState(5);
  const audioRef = useRef(null);
  const [isLoading,setIsLoading]=useState(false);
  const[isPlaying, setIsPlaying]= useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedCity, setSelectedCity] = useState("");
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [showUserBox, setShowUserBox] = useState(false);
  /* التغييرات الجديدة*/
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [geoData, setGeoData] = useState(null);
  const progressBarRef = useRef(null); 

  useEffect(()=>{
      if (audioRef.current) {
    audioRef.current.pause();
    // audioRef.current.currentTime = 0;
      audioRef.current = null;
    setIsPlaying(false);
  }
  },[selectedPlace]);
  const handleAudioToggle = () => {
    if (!selectedPlace.audio) {
      alert("{t(mapsection.AudioValid)}");
      return;
    }

    if (isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
      return;
    }

    if (audioRef.current) {
      audioRef.current.playbackRate = playbackRate;
      audioRef.current
      
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.error(t("mapsection.ResumeAudio"), err);
          setIsPlaying(false);
        });
      return;
    }

    const audio = new Audio(selectedPlace.audio);
    audioRef.current = audio;
    audio.playbackRate = playbackRate;

    /*تعديل جديد */
    audio.onloadedmetadata = () => {
  setDuration(audio.duration);
};

audio.ontimeupdate = () => {
  if (audio.duration) {
    setElapsedTime(audio.currentTime);
    setProgress((audio.currentTime / audio.duration) * 100);
  }
};

audio.onended = () => {
  setIsPlaying(false);
  setProgress(100);
  setElapsedTime(duration); 
};
/** نهاية التعديل الجديد*/

    audio.onended = () => setIsPlaying(false);

    setIsLoading(true);
    audio
      .play()
      .then(() => {
        setIsPlaying(true);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("فشل تشغيل الصوت", err);
        setIsPlaying(false);
        setIsLoading(false);
      });
  };

  const handleSeek = (seconds) => {
    if (audioRef.current) {
      audioRef.current.currentTime += seconds;
    }
  };
const changePlaybackRate = (rate) => {
  setPlaybackRate(rate);
  if (audioRef.current) {
    audioRef.current.playbackRate = rate;
  }
  setShowSpeedMenu(false);
};


  const defaultPosition = [23, 44];
  const mapRef = useRef(null);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    fetch("/places.geojson")
      .then((res) => res.json())
      .then((data) => setGeojsonData(data))
      .catch((err) => console.error("Error loading GeoJSON:", err));

    fetch("/places-images.json")
      .then((res) => res.json())
      .then((data) => {
        const imagesMap = {};
        data.forEach((item) => {
          const placeName = item["المكان"];
          const imgUrl = item["رابط الصورة"];
          imagesMap[placeName] = imgUrl;
        });
        setImagesData(imagesMap);
      })
      .catch((err) => console.error("Error loading images JSON:", err));
  }, []);

  useEffect(()=>{
    fetch('/Geo.json')
    .then(res=>res.json())
    .then(data=>setGeoData(data));
  },[]);
  const createDivIcon = (imgUrl, isActive = false) => {
    return L.divIcon({
      html: `<div class="custom-div-icon ${isActive ? "active-marker" : ""}">
      <img src="${imgUrl}" alt="" />
      </div>`,
      className: "",
      iconSize: [60, 60],
      iconAnchor: [30, 30],
      popupAnchor: [0, -30],
    });
  };

  const fetchPlaceDetails = async (lat, lng, placeName) => {
    try {
      const language = i18n.language || "ar";
      const response = await fetch(
        `http://localhost:5050/place?lat=${lat}&lng=${lng}&lang=${language}`
      );
      const data = await response.json();

      setSelectedPlace({
        name: data.place || placeName,
        image: data.image_url || "",
        story: data.story || "",
        city: data.city || "",
        summary: data.summary || "",
        audio:data.audio,
        lat: lat,
        lng: lng,
        views : data.views !==undefined ? data.views : 0,
        source : data.source,
      });

      setMapTargetPosition([lat, lng]);
    } catch (error) {
      console.error("فشل في جلب بيانات المكان:", error);
      setSelectedPlace(null);
    }
  };

  const handleSearch = (term) => {
    const searchValue = (term || searchTerm).trim().toLowerCase();

    if (!searchValue) {
      setSearchError("يرجى إدخال اسم مكان للبحث.");
      setSuggestions([]);
      return;
    }

    if (!geojsonData) {
      setSearchError("بيانات الأماكن غير محملة بعد.");
      setSuggestions([]);
      return;
    }

    const matched = geojsonData.features.find((feature) =>
      feature.properties.place.toLowerCase().startsWith(searchValue)
    );

    if (matched) {
      setSearchError("");
      setSuggestions([]);
      setSearchTerm("");

      const coords = matched.geometry.coordinates;
      const latlng = [coords[1], coords[0]];

      fetchPlaceDetails(latlng[0], latlng[1], matched.properties.place);
    } else {
      setSearchError("المكان غير موجود، تأكد من الاسم.");
      setSuggestions([]);
    }
  };
//   const handleProgressBarClick = (event) => {
//   const rect = progressBarRef.current.getBoundingClientRect();
//   const clickX = event.clientX - rect.left;
//   const width = rect.width;
//   const progress = clickX / width;
//   const newTime = progress * duration;
//   audioRef.current.currentTime = newTime;
// };
const handleProgressBarClick = (event) => {
  const progressBar = progressBarRef.current;
  const audio = audioRef.current;

  if (!progressBar || !audio || !audio.duration) return;

  const rect = progressBar.getBoundingClientRect();
  const clickX = event.clientX - rect.left;
  const width = rect.width;
  const progress = 1 - (clickX / width);

  audio.currentTime = progress * audio.duration;
};

  const normalized = (str) => (str || "").trim().toLowerCase().replace(/\s+/g, "");

  // خريطة الأسماء البديلة لكل مدينة - تستخدم للفلترة
  const cityMap = {
    "الأحساء": ["الأحساء"],
    "الأردن": ["الأردن"],
    "البحرين": ["البحرين"],
    "الجزيرة العربية": ["الجزيرة"],
    "الرياض": ["الرياض", "نجد"],
   "جنوب المملكة العربية السعودية": ["جنوب المملكة", "أطراف اليمن"],
    "الصمان": ["الصمان"],
    "القسطنطينية": ["القسطنطينية"],
    "القنفذة": ["القنفذة"],
    "الكويت": ["الكويت"],
    "المغرب": ["المغرب"],
    "الموصل": ["الموصل"],
    "الليث": ["الليث"],
    "اليمن": ["اليمن", "صنعاء", "مأرب"],
    "إيران": ["إيران", "قزوين"],
    "اثيوبيا": ["اثيوبيا"],
    "العراق": ["العراق", "بغداد", "البصرة", "الكوفة"],
    "العلا": ["العلا"],
    "الطائف": ["الطائف"],
    "بين مكة و المدينة": ["بين مكة و المدينة", "بين مكة والمدينة", "بين مكة والطائف", "مكة المدينة"],
    "تبالة": ["تبالة"],
    "تركيا": ["تركيا", "أنطاكية"],
    "تبوك": ["تبوك"],
    "سوريا": ["سوريا", "حمص"],
    "شرق اسيا": ["شرق اسيا"],
    "غرب السعودية": ["غرب السعودية"],
    "فلسطين": ["فلسطين", "القدس"],
    "مدين": ["مدين"],
    "مجمع البحرين": ["مجمع البحرين"],
    "مصر": ["مصر"],
    "مكة المكرمة": ["مكة", "منى", "مزدلفة", "عرفة", "جبل مطل على منى", "ميقات اهل العراق"],
    "منطقة عسير": ["عسير", "نجران"],
    "المدينة المنورة": ["المدينة", "طيبة", "شمال المدينة", "خيبر", "ينبع"],
    "الحجر": ["الحجر", "مدائن صالح"],
    "بلاد الشام": ["بلاد الشام"],
    "بلاد الجوف": ["بلاد الجوف"],
    "ينبع": ["ينبع"],
    "خيبر": ["خيبر"],
    "حائل": ["حائل"],
    "عسفان": ["عسفان"],
    "حمص": ["حمص"]
  };

  // فلترة الأماكن المعروضة حسب المدينة المحددة مع استثناءات خاصة
  const filteredFeatures = geojsonData?.features.filter((feature) => {
    const rawCity = feature.properties.city || feature.properties.place || "";
    const normalizedCity = normalized(rawCity);
    const normalizedSelected = normalized(selectedCity);
    const placeName = feature.properties.place || "";

    if (!normalizedSelected || normalizedSelected === "الكل") return true;

    // استثناء خاص: لا تعرض "ذات عرق" عند اختيار "العراق"
    if (selectedCity === "العراق" && placeName.includes("ذات عرق")) return false;

    // استثناء خاص: لا تعرض "الصخرة" عند اختيار "البحرين"
    if (selectedCity === "البحرين" && placeName.includes("الصخرة")) return false;

    const aliases = cityMap[selectedCity] || [];
    return aliases.some((alias) => normalizedCity.includes(normalized(alias)));
  }) || [];

  useEffect(() => {
    if (filteredFeatures.length > 0 && mapRef.current && !mapTargetPosition) {
      const bounds = L.latLngBounds(
        filteredFeatures.map((f) => [
          f.geometry.coordinates[1],
          f.geometry.coordinates[0],
        ])
      );
     mapRef.current.fitBounds(bounds, { padding: [50, 50] });
      setMapZoom(mapRef.current.getZoom()); // تعيين الزووم الحالي بعد fitBounds
    }
  }, [filteredFeatures, mapTargetPosition]);


  // إنشاء قائمة المدن مرتبة أبجدياً
  const cityList = Object.keys(cityMap).sort();

  return (
  
    <div className="App">
      <h2>{t("mapsection.maptitle")}</h2>

      <div className="map-wrapper" style={{ position: "relative" }}>
        <div className="map-container">
          <div className="map-filters">
            <select
              className="filter-select"
              value={selectedCity}
              onChange={(e) => {
                setSelectedCity(e.target.value);
                setSelectedPlace(null);
                setMapTargetPosition(null);
              }}
            >
              <option value="">اختر المدينة</option>
              <option value="الكل">الكل</option>
              {cityList.map((city, i) => (
                <option key={i} value={city}>
                  {city}
                </option>
              ))}
            </select>
            <div style={{ position: "relative", width: "100%",color:"black" }}>
              <input
                type="text"
                placeholder="ابحث عن مكان..."
                className="search-input filter-select"
                value={searchTerm}
                onChange={(e) => {
                  const value = e.target.value;
                  setSearchTerm(value);

                  if (!value || !geojsonData) {
                    setSuggestions([]);
                    setSearchError("");
                    return;
                  }

                  const filtered = geojsonData.features
                    .map((f) => f.properties.place)
                    .filter((place) =>
                      place?.toLowerCase().includes(value.trim().toLowerCase())
                    );

                  setSuggestions(filtered.slice(0, 5));
                  setSearchError("");
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSearch();
                }}
              />

              {suggestions.length > 0 && (
                <ul className="suggestion-list">
                  {suggestions.map((sug, idx) => (
                    <li
                      key={idx}
                      onClick={() => handleSearch(sug)}
                      className="suggestion-item"
                    >
                      {sug}
                    </li>
                  ))}
                </ul>
              )}

              {searchError && <p className="search-error">{searchError}</p>}
            </div>
          </div>

          <MapContainer
            
            //mapLib={import('maplibre-gl')}
            center={defaultPosition}
            zoom={5}
            style={{ height: "100%", width: "100%", backgroundColor: "#ffffff" }}
            whenCreated={(mapInstance) => {
            mapRef.current = mapInstance;
            
            }}
            
           
          >
           <TileLayer
  url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png"
  attribution='&copy; <a href="https://carto.com/">CARTO</a>'
/>
            {/* <TileLayer
              url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            /> */}




{/* الطبقه الجديده حقت الماب من geo  */}

  {/* {geoData && (
    <GeoJSON
      data={geoData}
      style={() => ({
        color: "#ff7800",
        weight: 2,
        fillOpacity: 0.1,
      })}
      onEachFeature={(feature, layer) => {
        
        if (feature.properties && feature.properties.name) {
          layer.bindPopup(feature.properties.name);
        }
      }}
    />
  )} */}

  {/* <GeoJSON
  data={geoData}
  onEachFeature={(feature, layer) => {
    let displayName = feature.properties.name || feature.properties.admin;

    if (displayName === 'Israel' || displayName === 'ישראל') {
      displayName = 'فلسطين'; // استبدل الاسم هنا
    }

    layer.bindPopup(displayName);
  }}
  style={() => ({
    color: "#008000",
    weight: 2,
    fillOpacity: 0.1,
  })}
/> */}
        

            <MapMover position={mapTargetPosition} />

            <MapInteractionHandler
              onInteraction={() => {
                setSelectedPlace(null);
                setMapTargetPosition(null);
              }}
            />

            {filteredFeatures.map((feature, index) => {
              const coords = feature.geometry.coordinates;
              const latlng = [coords[1], coords[0]];
              const placeName = feature.properties.place;
              const imgUrl = imagesData[placeName];
              if (!imgUrl) return null;

              const isActive = selectedPlace?.name === placeName;
              const icon = createDivIcon(imgUrl, isActive);

              return (
                <Marker
                  key={index}
                  position={latlng}
                  icon={icon}
                  eventHandlers={{
                    click: () =>
                      fetchPlaceDetails(latlng[0], latlng[1], placeName),
                  }}
                >
                  <Tooltip
                    direction="top"
                    offset={[10, -35]}
                    opacity={1}
                    permanent={false}
                    className="my-tooltip"
                  >
                    {placeName}
                  </Tooltip>
                </Marker>
              );
            })}
          </MapContainer>

          <HomeButton
            onClick={() => {
              setMapTargetPosition(defaultPosition);
              setSelectedPlace(null);
              setSelectedCity("");
            }}
          />

          {selectedPlace && <div className="map-overlay" />}
        </div>
 {selectedPlace && (
        <div className="details-sidebar">
          <button
            className="close-btn"
            onClick={() => setSelectedPlace(null)}
            title="إغلاق"
          >
            ×
          </button>

          <h3 className="place-title">{selectedPlace.name}</h3>

          <div style={{ position: "relative" }}>
            <img
              src={selectedPlace.image}
              alt={selectedPlace.name}
              className="details-image"
            />

            <div className="audio-controls-overlay">
             {/* هنا تعديل جديد  */}
              <div className="progress-container">
  <span className="time-text">{formatTime(elapsedTime)}</span>

  <div className="progress-bar" ref={progressBarRef} onClick={handleProgressBarClick} 
  
  >
    <div className="progress-fill" style={{ width: `${progress}%` }}/>
      
  </div>

  <span className="time-text">{formatTime(duration - elapsedTime)}</span>
</div>
{/* نهاية التعديل الجديد */}
              <div className="audio-control-btn-group">

              
                <button
                className="audio-control-btn"
                onClick={() => handleSeek(10)}
                title={t("mapsection.forward")}
              >
                <MdOutlineReplay10 size={24} />
              </button>

{/* برضو تعديل جديد  */}
                {!isPlaying && duration > 0 && elapsedTime>= duration ? (
                  <button
                   className="audio-control-btn"
                  onClick={() => {
                  audioRef.current.currentTime = 0;
                  audioRef.current.play();
                  setIsPlaying(true);
                  }}
                  title="إعادة التشغيل"
                  >
              <MdReplay size={24} />
                </button>
                ) : (
               <button
                 className="audio-control-btn"
                onClick={handleAudioToggle}
                title={isPlaying ? t("mapsection.TurnOffAudio") : t("mapsection.TurnOnAudio")}
                >
                 {isLoading ? (
                <FaSpinner className="icon spinner" />
                 ) : isPlaying ? (
                     <FaPause size={24} />
                 ) : (
                    <FaPlay size={24} />
                 )}
                </button>
)}    
               <button
                className="audio-control-btn"
                onClick={() => handleSeek(-10)}
                title={t("mapsection.skip")}
              >
                <MdOutlineForward10 size={24} />
              </button>

                {/* زر التحكم بالسرعة */}
  <div className="speed-control-wrapper">
    <button
      className="audio-control-btn"
      onClick={() => setShowSpeedMenu((prev) => !prev)}
      title="السرعة"
    >
      <IoIosSpeedometer size={24} />
    </button>

    {showSpeedMenu && (
      <div className="speed-menu">
        {[1, 1.5, 2, 2.5].map((rate) => (
          <div
            key={rate}
            className={`speed-option ${playbackRate === rate ? "active" : ""}`}
            onClick={() => changePlaybackRate(rate)}
          >
            {rate}x {playbackRate === rate && "✓"}
          </div>
        ))}
      </div>
    )}
  </div> 
  </div>
            </div>

          </div>

          <div className="details-description">
            <details className="details-section">
              <summary className="summary-header">
                {t("mapsection.story")}
              </summary>
              <p>{selectedPlace.story}</p>
            </details>

            <details className="details-section">
              <summary className="summary-header">
                {t("mapsection.city")}
              </summary>
              <p>{selectedPlace.city}</p>
            </details>

            <details className="details-section">
              <summary className="summary-header">
                {t("mapsection.summary")}
              </summary>
              <p>{selectedPlace.summary}</p>
            </details>
          </div>

          <div className="share-views-map">
<div style={{ position: "relative" }}>
  <div
    className="circle-icon-button"
    onClick={() => setShowUserBox(!showUserBox)}
  >
    <PiBookOpenText className="icon" />
  </div>

  {showUserBox && (
    <div className="user-popup-box">
      <p style={{color:"black"}}>{selectedPlace.source}</p>
    </div>
  )}
</div>
            <div
               onClick={()=>{
                if(selectedPlace.lat&&selectedPlace.lng){
                   window.open(`https://www.google.com/maps?q=${selectedPlace.lat},${selectedPlace.lng}`,
                    "_blank"
                   );
                }
               
              }}
              className="circle-icon-button"
            >
             <FaMapMarkerAlt className="icon"/>
            </div>
            <div
               onClick={()=>{
                const storyUrl= `http://localhost:5175/story/${selectedPlace.placeID}`;
                const shareData ={
                    title:"",
                    text:"",
                    url: storyUrl
                };
                if(navigator.share){
                  navigator.share(shareData).catch((err)=>{
                    console.error("{t(mapsection.share)}",err)
                  })
                } else{
                  navigator.clipboard.writeText(storyUrl).then(()=>{
                    alert("{t(mapsection.copy)}")
                  })
                }
               
              }}
              className="circle-icon-button"
            >
             <IoMdShare className="icon" />
            </div>
            <div className="view-container">  
              <div className="circle-icon-button">
                <FaEye className="icon"/>  
              </div>                        
              <span className="views-text" >{selectedPlace.views??0}</span>
            </div>  

            {/* <Tooltip id="storySource" place="top" style={{ zIndex: 9999 }} />          */}
          </div>

        </div>
      )}
      </div>
    </div>
  );
  
};

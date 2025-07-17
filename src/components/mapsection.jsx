// import { useEffect, useState } from "react";
// import { MapContainer, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";
// import '../css/mapsection.css';
// import { useTranslation } from "react-i18next";

// export const Mapsection = () => {
//   const [geojsonData, setGeojsonData] = useState(null);
//   const [imagesData, setImagesData] = useState({});
//   const [selectedPlace, setSelectedPlace] = useState(null);

//   const { t } = useTranslation();

//   useEffect(() => {
//     fetch('/places.geojson')
//       .then((res) => res.json())
//       .then((data) => setGeojsonData(data))
//       .catch((err) => console.error("Error loading GeoJSON:", err));

//     fetch("/places-images.json")
//       .then((res) => res.json())
//       .then((data) => {
//         const imagesMap = {};
//         data.forEach((item) => {
//           const placeName = item["المكان"];
//           const imgUrl = item["رابط الصورة"];
//           imagesMap[placeName] = imgUrl;
//         });
//         setImagesData(imagesMap);
//       })
//       .catch((err) => console.error("Error loading images JSON:", err));
//   }, []);

//   const createDivIcon = (imgUrl) => {
//     return L.divIcon({
//       html: `<div class="custom-div-icon"><img src="${imgUrl}" alt="" /></div>`,
//       className: "",
//       iconSize: [60, 60],
//       iconAnchor: [30, 30],
//       popupAnchor: [0, -30],
//     });
//   };

//   return (
//     <div className="App">
//       <h2>{t("mapsection.maptitle")}</h2>
      
//       <div className="map-wrapper">
//         <div className="map-container">
//           <div className="map-filters">
//             <select className="filter-select" onChange={(e) => console.log("المدينة:", e.target.value)}>
//               <option value="">اختر المدينة</option>
//               <option value="مكة المكرمة">مكة المكرمة</option>
//               <option value="المدينة المنورة">المدينة المنورة</option>
//               <option value="بلاد الروم">بلاد الروم</option>
//               <option value="الكل">الكل</option>
//             </select>

//             <select className="filter-select" onChange={(e) => console.log("النوع:", e.target.value)}>
//               <option value="">اختر نوع المكان</option>
//               <option value="جبل">جبل</option>
//               <option value="وادي">وادي</option>
//               <option value="نهر">نهر</option>
//               <option value="الكل">الكل</option>
//             </select>
//           </div>

//           <MapContainer center={[23, 44]} zoom={5} style={{ height: "100%", width: "100%" }}>
//             <TileLayer
//               url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
//               attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
//             />

//             {geojsonData &&
//               geojsonData.features.map((feature, index) => {
//                 const coords = feature.geometry.coordinates;
//                 const latlng = [coords[1], coords[0]];
//                 const placeName = feature.properties.place || "اسم غير معروف";
//                 const story = feature.properties.description || "تفاصيل قصة هذا الموقع غير متوفرة.";
//                 const locationDetails = feature.properties.location || "تفاصيل الموقع غير متوفرة.";
//                 const classification = feature.properties.type || "غير مصنف.";
//                 const imgUrl = imagesData[placeName];
//                 if (!imgUrl) return null;

//                 const icon = createDivIcon(imgUrl);

//                 return (
//                   <Marker
//                     key={index}
//                     position={latlng}
//                     icon={icon}
//                 eventHandlers={{
//   click: async () => {
//     try {
//       const language = i18n.language || "ar"; // أو حسب اللي عندك
//       const response = await fetch(
//         `/place?lat=${latlng[0]}&lng=${latlng[1]}&lang=${language}`
//       );
//       const data = await response.json();

//       setSelectedPlace({
//         name: data.place,
//         image: data.image_url,
//         story: data.story,
//         location: data.city,
//         classification: data.type,
//       });
//     } catch (error) {
//       console.error("فشل في جلب بيانات المكان:", error);
//     }
//   },
// }}
//                   >
//                     <Tooltip>{placeName}</Tooltip>
//                     <Popup>
//                       <b>{placeName}</b>
//                       <br />
//                       <img
//                         src={imgUrl}
//                         alt={placeName}
//                         style={{
//                           width: "150px",
//                           marginTop: "10px",
//                           borderRadius: "8px",
//                           boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
//                         }}
//                       />
//                     </Popup>
//                   </Marker>
//                 );
//               })}
//           </MapContainer>
//         </div>

//         {selectedPlace && (
//           <div className="details-sidebar">
//             <button className="close-btn" onClick={() => setSelectedPlace(null)}>×</button>
//             <h3>{selectedPlace.name}</h3>
//             <img src={selectedPlace.image} alt={selectedPlace.name} className="details-image" />
//             <div className="details-description">
//               <div className="story-header">
//                 <h4>القصة</h4>
//                 <button className="tts-button-circle" title="استمع إلى القصة">🔊</button>
//               </div>
//               <p>{selectedPlace.story}</p>

//               <h4>الموقع</h4>
//               <p>{selectedPlace.location}</p>

//               <h4>التصنيف</h4>
//               <p>{selectedPlace.classification}</p>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// import { useEffect, useRef, useState } from "react";
// import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";
// import "../css/mapsection.css";
// import { useTranslation } from "react-i18next";

// export const Mapsection = () => {
//   const [geojsonData, setGeojsonData] = useState(null);
//   const [imagesData, setImagesData] = useState({});
//   const [selectedPlace, setSelectedPlace] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [suggestions, setSuggestions] = useState([]);
//   const [searchError, setSearchError] = useState("");
//   const mapRef = useRef(null);

//   const { t, i18n } = useTranslation();

//   useEffect(() => {
//     // تحميل بيانات الأماكن (GeoJSON)
//     fetch("/places.geojson")
//       .then((res) => res.json())
//       .then((data) => setGeojsonData(data))
//       .catch((err) => console.error("Error loading GeoJSON:", err));

//     // تحميل روابط الصور لكل مكان
//     fetch("/places-images.json")
//       .then((res) => res.json())
//       .then((data) => {
//         const imagesMap = {};
//         data.forEach((item) => {
//           const placeName = item["المكان"];
//           const imgUrl = item["رابط الصورة"];
//           imagesMap[placeName] = imgUrl;
//         });
//         setImagesData(imagesMap);
//       })
//       .catch((err) => console.error("Error loading images JSON:", err));
//   }, []);

//   // إنشاء أيقونة Marker مخصصة بالصور من JSON الصور
//   const createDivIcon = (imgUrl) => {
//     return L.divIcon({
//       html: `<div class="custom-div-icon"><img src="${imgUrl}" alt="" /></div>`,
//       className: "",
//       iconSize: [60, 60],
//       iconAnchor: [30, 30],
//       popupAnchor: [0, -30],
//     });
//   };

//   // جلب بيانات التفاصيل من الداتا بيس بناءً على الإحداثيات واللغة
//   const fetchPlaceDetails = async (lat, lng, placeName) => {
//     try {
//       const language = i18n.language || "ar";
//       const response = await fetch(
//         `http://localhost:4000/place?lat=${lat}&lng=${lng}&lang=${language}`
//       );
//       const data = await response.json();

//       setSelectedPlace({
//         name: data.place || placeName,
//         image: data.image_url || "",
//         story: data.story || "",
//         city: data.city || "",
//         summary: data.summary || "",
//       });
//     } catch (error) {
//       console.error("فشل في جلب بيانات المكان:", error);
//       setSelectedPlace(null);
//     }
//   };

//   // التعامل مع البحث بالفلتر: عند اختيار أو ضغط Enter
//   const handleSearch = (term) => {
//     const searchValue = (term || searchTerm).trim().toLowerCase();

//     if (!searchValue) {
//       setSearchError("يرجى إدخال اسم مكان للبحث.");
//       setSuggestions([]);
//       return;
//     }

//     if (!geojsonData) {
//       setSearchError("بيانات الأماكن غير محملة بعد.");
//       setSuggestions([]);
//       return;
//     }

//     // نبحث عن المكان بناء على بداية الاسم (يمكن تعديله حسب حاجتك)
//     const matched = geojsonData.features.find((feature) =>
//       feature.properties.place.toLowerCase().startsWith(searchValue)
//     );

// if (matched) {
//   setSearchError("");
//   setSuggestions([]);
//   setSearchTerm("");

//   const coords = matched.geometry.coordinates;
//   const latlng = [coords[1], coords[0]];

//   if (mapRef.current) {
//     mapRef.current.flyTo(latlng, 8, {
//       animate: true,
//       duration: 1.5,
//     });
//   }

//   fetchPlaceDetails(latlng[0], latlng[1], matched.properties.place);
// }
// else {
//       setSearchError("المكان غير موجود، تأكد من الاسم أو جرّب من القائمة.");
//       setSuggestions([]);
//     }
//   };

//   return (
//     <div className="App">
//       <h2>{t("mapsection.maptitle")}</h2>

//       <div className="map-wrapper">
//         <div className="map-container">
//           <div className="map-filters">
//             <select
//               className="filter-select"
//               onChange={(e) => console.log("المدينة:", e.target.value)}
//             >
//               <option value="">اختر المدينة</option>
//               <option value="مكة المكرمة">مكة المكرمة</option>
//               <option value="المدينة المنورة">المدينة المنورة</option>
//               <option value="بلاد الروم">بلاد الروم</option>
//               <option value="الكل">الكل</option>
//             </select>

//             <div style={{ position: "relative", width: "100%" }}>
//               <input
//                 type="text"
//                 placeholder="ابحث عن مكان..."
//                 className="search-input filter-select"
//                 value={searchTerm}
//                 onChange={(e) => {
//                   const value = e.target.value;
//                   setSearchTerm(value);

//                   if (!value || !geojsonData) {
//                     setSuggestions([]);
//                     setSearchError("");
//                     return;
//                   }

//                   const filtered = geojsonData.features
//                     .map((f) => f.properties.place)
//                     .filter((place) =>
//                       place?.toLowerCase().includes(value.trim().toLowerCase())
//                     );

//                   setSuggestions(filtered.slice(0, 5));
//                   setSearchError("");
//                 }}
//                 onKeyDown={(e) => {
//                   if (e.key === "Enter") handleSearch();
//                 }}
//               />

//               {suggestions.length > 0 && (
//                 <ul className="suggestion-list" style={{ position: "absolute", background: "#fff", zIndex: 1100, width: "100%", borderRadius: "6px", boxShadow: "0 2px 8px rgba(0,0,0,0.15)", maxHeight: "150px", overflowY: "auto", padding: 0, marginTop: "2px" }}>
//                   {suggestions.map((sug, idx) => (
//                     <li
//                       key={idx}
//                       onClick={() => handleSearch(sug)}
//                       className="suggestion-item"
//                       style={{ cursor: "pointer", padding: "6px 12px", borderBottom: "1px solid #eee" }}
//                     >
//                       {sug}
//                     </li>
//                   ))}
//                 </ul>
//               )}

//               {searchError && (
//                 <p
//                   className="search-error"
//                   style={{ color: "red", marginTop: "4px", fontWeight: "bold" }}
//                 >
//                   {searchError}
//                 </p>
//               )}
//             </div>
//           </div>

//           <MapContainer
//             center={[23, 44]}
//             zoom={5}
//             style={{ height: "100%", width: "100%" }}
//             whenCreated={(mapInstance) => {
//               mapRef.current = mapInstance;
//               window.mapRef = mapInstance;
//             }}
//           >
//             <TileLayer
//               url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
//               attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
//             />

//             {geojsonData &&
//               geojsonData.features.map((feature, index) => {
//                 const coords = feature.geometry.coordinates;
//                 const latlng = [coords[1], coords[0]];
//                 const placeName = feature.properties.place;
//                 const imgUrl = imagesData[placeName];
//                 if (!imgUrl) return null;

//                 const icon = createDivIcon(imgUrl);

//                 return (
//                   <Marker
//                     key={index}
//                     position={latlng}
//                     icon={icon}
//                     eventHandlers={{
//                       click: () => fetchPlaceDetails(latlng[0], latlng[1], placeName),
//                     }}
//                   >
//                     <Tooltip
//                       direction="top"
//                       offset={[10, -35]}
//                       opacity={1}
//                       permanent={false}
//                       className="my-tooltip"
//                     >
//                       {placeName}
//                     </Tooltip>
//                   </Marker>
//                 );
//               })}
//           </MapContainer>
//         </div>

//         {selectedPlace && (
//           <div className="details-sidebar">
//             <button className="close-btn" onClick={() => setSelectedPlace(null)}>
//               ×
//             </button>
//             <h3>{selectedPlace.name}</h3>
//             <img
//               src={selectedPlace.image}
//               alt={selectedPlace.name}
//               className="details-image"
//             />
//             <div className="details-description">
//               <div className="story-header">
//                 <h4>{t("mapsection.story")}</h4>
//                 <button className="tts-button-circle" title="استمع إلى القصة">
//                   🔊
//                 </button>
//               </div>
//               <p>{selectedPlace.story}</p>

//               <h4>{t("mapsection.city")}</h4>
//               <p>{selectedPlace.city}</p>

//               <h4>{t("mapsection.summary")}</h4>
//               <p>{selectedPlace.summary}</p>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };



import { useEffect, useRef, useState } from "react"; 
import {
  MapContainer,
  TileLayer,
  Marker,
  Tooltip,
  useMap,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "../css/mapsection.css";
import { useTranslation } from "react-i18next";
import { CiPlay1 } from "react-icons/ci";
import { FaPlay, FaPause, FaSpinner } from "react-icons/fa";

// مكون لتحريك الخريطة إلى موقع محدد عند التحديد
const MapMover = ({ position }) => {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.flyTo(position, 15, { duration: 1.2 });
    }
  }, [position, map]);

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

export const Mapsection = () => {
  const [geojsonData, setGeojsonData] = useState(null);
  const [imagesData, setImagesData] = useState({});
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [searchError, setSearchError] = useState("");
  const [mapTargetPosition, setMapTargetPosition] = useState(null);
  const audioRef = useRef(null);
  const [isLoading,setIsLoading]=useState(false);
  const[isPlaying, setIsPlaying]= useState(false);
  const [showDetails, setShowDetails] = useState(false);
  useEffect(()=>{
      if (audioRef.current) {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setIsPlaying(false);
  }
  },[selectedPlace]);

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

  const createDivIcon = (imgUrl, isActive = false) => {
    return L.divIcon({
      html: `<div class="custom-div-icon ${isActive ? "active-marker" : ""}"><img src="${imgUrl}" alt="" /></div>`,
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
        `http://localhost:3000/place?lat=${lat}&lng=${lng}&lang=${language}`
      );
      const data = await response.json();

      setSelectedPlace({
        name: data.place || placeName,
        image: data.image_url || "",
        story: data.story || "",
        city: data.city || "",
        summary: data.summary || "",
        audio:data.audio,
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
            <div style={{ position: "relative", width: "100%" }}>
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
            center={defaultPosition}
            zoom={5}
            style={{ height: "100%", width: "100%" }}
            whenCreated={(mapInstance) => {
              mapRef.current = mapInstance;
            }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            />

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

    <img
      src={selectedPlace.image}
      alt={selectedPlace.name}
      className="details-image"
    />

    <div className="details-description">
      {/* القصة */}
      <details className="details-section">
        <summary className="summary-header">
          {t("mapsection.story")}
          <button
            className="tts-button-circle"
            title={isPlaying ? "إيقاف الصوت" : "استمع إلى القصة"}
            onClick={(e) => {
              e.stopPropagation();

              if (!selectedPlace.audio) {
                alert("لا يوجد ملف صوتي متاح لهذا المكان.");
                return;
              }

              if (isPlaying) {
                audioRef.current?.pause();
                audioRef.current.currentTime = 0;
                setIsPlaying(false);
                return;
              }

              if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
              }

              const audio = new Audio(selectedPlace.audio);
              audioRef.current = audio;

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
            }}
          >
            <span className="audio-btn">
              {isLoading ? (
                <FaSpinner className="icon spinner" />
              ) : isPlaying ? (
                <FaPause className="icon" />
              ) : (
                <FaPlay className="icon" />
              )}
            </span>
          </button>
        </summary>
        <p>{selectedPlace.story}</p>
      </details>

      {/* المدينة */}
      <details className="details-section">
        <summary className="summary-header">{t("mapsection.city")}</summary>
        <p>{selectedPlace.city}</p>
      </details>

      {/* الملخص */}
      <details className="details-section">
        <summary className="summary-header">{t("mapsection.summary")}</summary>
        <p>{selectedPlace.summary}</p>
      </details>
    </div>
  </div>
)}

      </div>
    </div>
    
  );
  
};

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import '../css/mapsection.css';
import { useTranslation } from "react-i18next";

export const Mapsection = () => {
  
  const [geojsonData, setGeojsonData] = useState(null);
  const [imagesData, setImagesData] = useState({});
  const [selectedPlace, setSelectedPlace] = useState(null);

  useEffect(() => {
    fetch('/places.geojson')
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

  const createDivIcon = (imgUrl) => {
    return L.divIcon({
      html: `<div class="custom-div-icon"><img src="${imgUrl}" alt="" /></div>`,
      className: "",
      iconSize: [60, 60],
      iconAnchor: [30, 30],
      popupAnchor: [0, -30],
    });
  };

// خاصية القراءة الصوتية (Text to Speech)
// const handleSpeak = (text) => {
//   if (speechSynthesis.speaking) {
//     speechSynthesis.cancel();
//   }
//   const utterance = new SpeechSynthesisUtterance(text);
//   utterance.lang = "ar-SA";
//   speechSynthesis.speak(utterance);
// };

const {t,i18n}=useTranslation();
  return (
    <div className="App">
      <h2>{t("mapsection.maptitle")}</h2>
      <div className="map-container">
        <div className="map-filters">
          <select className="filter-select" onChange={(e) => console.log("المدينة:", e.target.value)}>
              <option value="">اختر المدينة</option>
              <option value="مكة المكرمة">مكة المكرمة</option>
              <option value="المدينة المنورة">المدينة المنورة</option>
              <option value="بلاد الروم">بلاد الروم</option>
              <option value="الكل">الكل</option>
            </select>

            <select className="filter-select" onChange={(e) => console.log("النوع:", e.target.value)}>
              <option value="">اختر نوع المكان</option>
              <option value="جبل">جبل</option>
              <option value="وادي">وادي</option>
              <option value="نهر">نهر</option>
              <option value="الكل">الكل</option>
            </select>
          </div>

          <MapContainer center={[23, 44]} zoom={5} style={{ height: "100%", width: "100%" }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            />

            {geojsonData &&
              geojsonData.features.map((feature, index) => {
                const coords = feature.geometry.coordinates;
                const latlng = [coords[1], coords[0]];
                const placeName = feature.properties.place || "اسم غير معروف";
                const story = feature.properties.description || "تفاصيل قصة هذا الموقع غير متوفرة.";
                const locationDetails = feature.properties.location || "تفاصيل الموقع غير متوفرة.";
                const classification = feature.properties.type || "غير مصنف.";
                const imgUrl = imagesData[placeName];
                if (!imgUrl) return null;

                const icon = createDivIcon(imgUrl);

                return (
                  <Marker
                    key={index}
                    position={latlng}
                    icon={icon}
                    eventHandlers={{
                      click: () => {
                        setSelectedPlace({
                          name: placeName,
                          image: imgUrl,
                          story,
                          location: locationDetails,
                          classification,
                        });
                      },
                    }}
                  >
                    <Tooltip>{placeName}</Tooltip>
                    <Popup>
                      <b>{placeName}</b>
                      <br />
                      <img
                        src={imgUrl}
                        alt={placeName}
                        style={{
                          width: "150px",
                          marginTop: "10px",
                          borderRadius: "8px",
                          boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
                        }}
                      />
                    </Popup>
                  </Marker>
                );
              })}
          </MapContainer>
        </div>

        {/*  مربع التفاصيل الجانبي */}
        {selectedPlace && (
          <div className="details-sidebar">
            <button className="close-btn" onClick={() => setSelectedPlace(null)}>×</button>
            <h3>{selectedPlace.name}</h3>
            <img src={selectedPlace.image} alt={selectedPlace.name} className="details-image" />

            <div className="details-description">
              <div className="story-header">
                <h4>القصة</h4>
                <button
                  className="tts-button-circle"
                  onClick={() => handleSpeak(selectedPlace.story)}
                  title="استمع إلى القصة"
                >
                  🔊
                </button>
              </div>
              <p>{selectedPlace.story}</p>

              <h4>الموقع</h4>
              <p>{selectedPlace.location}</p>

              <h4>التصنيف</h4>
              <p>{selectedPlace.classification}</p>
            </div>
          </div>
        )}
      </div>
    
  );
};




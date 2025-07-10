import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Tooltip } from "react-leaflet";

import L from "leaflet";
import "leaflet/dist/leaflet.css";
import '../css/mapsection.css';

export const Mapsection=()=> {
  const [geojsonData, setGeojsonData] = useState(null);
  const [imagesData, setImagesData] = useState({});

  useEffect(() => {
    // تحميل geojson
    fetch('/places.geojson')
      .then((res) => res.json())
      .then((data) => {
        setGeojsonData(data);
      })
      .catch((err) => console.error("Error loading GeoJSON:", err));

    // تحميل الصور من JSON
    fetch("/places-images.json")
      .then((res) => res.json())
      .then((data) => {
        const imagesMap = {};
        data.forEach((item) => {
          const placeName = item["المكان"];
          const imgUrl = item["رابط الصورة"];
          imagesMap[placeName] = imgUrl;
        });
        console.log("imagesData", imagesMap);
        setImagesData(imagesMap);
      })
      .catch((err) => console.error("Error loading images JSON:", err));
  }, []);

  const createDivIcon = (imgUrl) => {
    return L.divIcon({
      html: `
        <div class="custom-div-icon">
          <img src="${imgUrl}" alt="" />
        </div>
      `,
      className: "",
      iconSize: [60, 60],
      iconAnchor: [30, 30],
      popupAnchor: [0, -30],
    });
  };

  return (
    <div className="App">
      <h2>الخريطة التفاعلية</h2>
      <div className="map-container">
        <div className="map-filters">
          <select className="filter-select" onChange={(e) => console.log("المدينة:", e.target.value)}>
              <option value="">اختر المدينة</option>
              <option value="مكة المكرمة">مكة المكرمة</option>
              <option value="المدينة المنورة">المدينة المنورة</option>
              <option value="بلاد الروم">بلاد الروم</option>
              <option value='الكل'>الكل</option>
          </select>

          <select className="filter-select" onChange={(e) => console.log("النوع:", e.target.value)}>
              <option value="">اختر نوع المكان</option>
              <option value="جبل">جبل</option>
              <option value="وادي">وادي</option>
              <option value="نهر">نهر</option>
              <option value='الكل'>الكل</option>
          </select>
        </div>
        <MapContainer center={[23, 44]} zoom={5} style={{ height: "100%", width: "100%" }}>
<TileLayer
  url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://hot.openstreetmap.org/">HOT</a>'
/>



          {geojsonData &&
            geojsonData.features.map((feature, index) => {
              const coords = feature.geometry.coordinates;
              const latlng = [coords[1], coords[0]];
              const placeName = feature.properties.place || "اسم غير معروف";

              const imgUrl = imagesData[placeName];

              if (!imgUrl) {
                return null;
              }

              const icon = createDivIcon(imgUrl);

              return (
                <Marker key={index} position={latlng} icon={icon}>
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
    </div>
  );
}

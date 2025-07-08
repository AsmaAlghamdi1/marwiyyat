// import React, { useEffect } from "react";
// import '../css/mapsection.css';
// import L from 'leaflet';

// const dummyData = [
//   {
//     id: 1,
//     name: "جبل أحد",
//     city: "المدينة المنورة",
//     image: "https://via.placeholder.com/150"
//   },
//   {
//     id: 2,
//     name: "مسجد...",
//     city: "مكة المكرمة",
//     image: "https://via.placeholder.com/150"
//   },
//   {
//     id: 3,
//     name: "بئر أروى",
//     city: "خيبر",
//     image: "https://via.placeholder.com/150"
//   },
//   // ممكن تزيدي اللي تبغي
// ];

// export const Mapsection = () => {

//      useEffect(() => {
//          if (L.DomUtil.get('map') !== null) {
//     L.DomUtil.get('map')._leaflet_id = null;
//   }
//     // إنشاء الخريطة
//     const map = L.map("map").setView([23.8859, 45.0792], 6); // مركز السعودية تقريبا

//     // تحميل طبقة الخريطة من OpenStreetMap
//     L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//       attribution: '&copy; OpenStreetMap contributors',
//     }).addTo(map);
//   }, []);



//   return (
//     <section className="map-section">
//         <div className="map-container-wrapper">
//       <h2 className="map-title">الخريطة التفاعلية</h2>
// {/* الفلاتر */}
//       <div className="filters">
//         <select>
//           <option value="">اختر المكان</option>
//           <option value="المدينة المنورة">المدينة المنورة</option>
//           <option value="مكة المكرمة">مكة المكرمة</option>
//         </select>

//         <select>
//           <option value="">اختر التصنيف</option>
//           <option value="جبل">جبل</option>
//           <option value="مسجد">مسجد</option>
//         </select>

//         <input type="text" placeholder="البحث" />
//       </div>

//       {/* المحتوى الرئيسي */}
//       <div className="main-content">
//         <div className="map-container">
//           <div id="map">هنا حنرسم الخريطة التفاعلية</div>
//         </div>
//         {/* الكروت */}
//         <div className="cards-container">
//           {dummyData.map((place) => (
//             <div className="location-card" key={place.id}>
//               <img src={place.image} alt={place.name} />
//               <div className="card-info">
//                 <h3>{place.name}</h3>
//                 <p>{place.city}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//       </div>
//     </section>
//   );

// };

import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../css/mapsection.css";

const dummyData = [
  {
    id: 1,
    name: "جبل أحد",
    city: "المدينة المنورة",
    image: "https://via.placeholder.com/150"
  },
  {
    id: 2,
    name: "مسجد...",
    city: "مكة المكرمة",
    image: "https://via.placeholder.com/150"
  },
  {
    id: 3,
    name: "بئر أروى",
    city: "خيبر",
    image: "https://via.placeholder.com/150"
  },
  // ممكن تزيدي اللي تبغي
];

export const Mapsection = () => {
  return (
    <section className="map-section">
      <div className="map-container-wrapper">
        <h2 className="map-title">الخريطة التفاعلية</h2>

        {/* الفلاتر */}
        <div className="filters">
          <select>
            <option value="">اختر المكان</option>
            <option value="المدينة المنورة">المدينة المنورة</option>
            <option value="مكة المكرمة">مكة المكرمة</option>
          </select>

          <select>
            <option value="">اختر التصنيف</option>
            <option value="جبل">جبل</option>
            <option value="مسجد">مسجد</option>
          </select>

          <input type="text" placeholder="البحث" />
        </div>

        {/* المحتوى الرئيسي */}
        <div className="main-content">
          {/* الخريطة */}
          <div className="map-container">
            <MapContainer
              center={[23.8859, 45.0792]}
              zoom={6}
              scrollWheelZoom={true}
              style={{ width: "100%", height: "100%" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; OpenStreetMap contributors'
              />
            </MapContainer>
          </div>

          {/* الكروت */}
          <div className="cards-container">
            {dummyData.map((place) => (
              <div className="location-card" key={place.id}>
                <img src={place.image} alt={place.name} />
                <div className="card-info">
                  <h3>{place.name}</h3>
                  <p>{place.city}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

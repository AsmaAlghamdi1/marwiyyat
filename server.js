// import express from 'express';
// import dotenv from 'dotenv';
// import { createClient } from '@supabase/supabase-js';

// // تحميل متغيرات البيئة من .env
// dotenv.config();

// const app = express();

// const PORT =3000;

// // إعداد Supabase
// const supabaseUrl = process.env.DatabaseURL;
// const supabaseKey = process.env.SUPABASE_KEY;
// const supabase = createClient(supabaseUrl, supabaseKey);

// // مسار تجريبي
// app.get('/stories', async (req, res) => {
//   const { data, error } = await supabase.from('stories').select('*');

//   if (error) {
//     console.error(error);
//     return res.status(500).json({ error: 'فشل في جلب القصص' });
//   }

//   res.json(data);
// });

// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });


// console.log('server.js شغال من هنا ')
// import express from 'express';
// import dotenv from 'dotenv';
// import { createClient } from '@supabase/supabase-js';

// dotenv.config();

// const app = express();
// const PORT = 3000;

// // إعداد Supabase
// const supabaseUrl = process.env.DatabaseURL;
// const supabaseKey = process.env.SUPABASE_KEY;
// const supabase = createClient(supabaseUrl, supabaseKey);

// ✅ route لإرجاع بيانات المكان حسب الإحداثيات واللغة
// app.get('/place', async (req, res) => {
//   const { lat, lng, lang } = req.query;

//   if (!lat || !lng || !lang) {
//     return res.status(400).json({ error: 'الرجاء إرسال lat, lng, lang' });
//   }

//   try {
//     // ⚠️ البحث عن المكان الأقرب للإحداثيات
//     const { data: places, error } = await supabase
//       .rpc('get_place_by_coords', { lat_input: parseFloat(lat), lng_input: parseFloat(lng) });

//     if (error || !places || places.length === 0) {
//       console.error(error || 'لم يتم العثور على مكان');
//       return res.status(404).json({ error: 'المكان غير موجود' });
//     }

//     const place = places[0];

//     // ⚠️ نجيب الصورة (جدول images)
//     const { data: images } = await supabase
//       .from('images')
//       .select('image_url')
//       .eq('place_id', place.id)
//       .limit(1);

//     const imageUrl = images?.[0]?.image_url || null;

//     // ✅ نرجّع البيانات بحسب اللغة
//     res.json({
//       place: lang === 'ar' ? place.place_ar : place.place_en,
//       story: lang === 'ar' ? place.story_ar : place.story_en,
//       city: place.city,
//       type: place.type,
//       image_url: imageUrl,
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'فشل في معالجة الطلب' });
//   }
// });

// ✅ تأكدي إن هذا موجود في Supabase
// CREATE OR REPLACE FUNCTION get_place_by_coords(lat_input double precision, lng_input double precision)
// RETURNS SETOF places AS $$
// BEGIN
//   RETURN QUERY
//   SELECT *
//   FROM places
//   ORDER BY coords <-> ST_SetSRID(ST_MakePoint(lng_input, lat_input), 4326)
//   LIMIT 1;
// END;
// $$ LANGUAGE plpgsql;

// app.get('/place', async (req, res) => {
//   const { lat, lng, lang } = req.query;

//   if (!lat || !lng || !lang) {
//     return res.status(400).json({ error: 'الرجاء إرسال lat و lng و lang' });
//   }

//   try {
//     // مطابقة دقيقة حسب الإحداثيات
//     const { data: places, error } = await supabase
//       .from('places')
//       .select('*')
//       .eq('coords', `SRID=4326;POINT(${lng} ${lat})`);

//     if (error || !places || places.length === 0) {
//       return res.status(404).json({ error: 'لم يتم العثور على المكان' });
//     }

//     const place = places[0];

//     // جلب الصورة
//     const { data: images } = await supabase
//       .from('images')
//       .select('image_url')
//       .eq('place_id', place.id)
//       .limit(1);

//     const imageUrl = images?.[0]?.image_url || null;

//     // ترجيع البيانات باللغتين
//     res.json({
//       place: lang === 'ar' ? place.place_ar : place.place_en,
//       story: lang === 'ar' ? place.story_ar : place.story_en,
//       city: place.city,
//       type: place.type,
//       image_url: imageUrl,
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'حدث خطأ أثناء معالجة الطلب' });
//   }
// });


// app.get('/place', async (req, res) => {
//   const { lat, lng, lang } = req.query;

//   if (!lat || !lng || !lang) {
//     return res.status(400).json({ error: 'الرجاء إرسال lat و lng و lang' });
//   }

//   try {
//     // 1. نحاول نجيب المكان حسب الإحداثيات
//     const { data: places, error: placeError } = await supabase
//       .from('places')
//       .select('*')
//       .eq('coords', `SRID=4326;POINT(${lng} ${lat})`);
      

//     if (placeError || !places || places.length === 0) {
//       return res.status(404).json({ error: 'لم يتم العثور على المكان' });
//     }

//     const place = places[0];
//     console.log(place);
//     // 2. نجيب الصورة من جدول الصور
//     const { data: images } = await supabase
//       .from('images')
//       .select('image_url')
//       .eq('place_id', place.id)
//       .limit(1);

//     const imageUrl = images?.[0]?.image_url || null;

//     // 3. نجيب القصة من جدول القصص
//     const { data: stories } = await supabase
//       .from('stories')
//       .select('*')
//       .eq('place_id', place.id)
//       .limit(1);

//     const story = stories?.[0] || null;

//     res.json({
//       place: lang === 'ar' ? place.place_ar : place.place_en,
//       story: lang === 'ar' ? story?.story_ar : story?.story_en,
//       city: place.city,
//       type: place.type,
//       image_url: imageUrl,
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'حدث خطأ أثناء معالجة الطلب' });
//   }
// });




// import express from 'express';
// import dotenv from 'dotenv';
// import { createClient } from '@supabase/supabase-js';

// dotenv.config();

// const app = express();
// const PORT = 5000;

// // إعداد Supabase
// const supabaseUrl = process.env.DatabaseURL;
// const supabaseKey = process.env.SUPABASE_KEY;
// const supabase = createClient(supabaseUrl, supabaseKey);

// // مسار لجلب جميع الأماكن
// app.get('/places', async (req, res) => {
//     console.log("السيرفر وصل للاماكن");
//   const { data, error } = await supabase.from('places').select('*');
//   if (error) throw error; // <<< خليه يطيح إذا فيه مشكلة حقيقية
//   res.json(data);
// });

// app.get('/stories', async (req, res) => {
//     console.log("السيرفر وصل للقصص");
//   const { data, error } = await supabase.from('stories').select('*');
//   if (error) throw error; // <<< خليه يطيح إذا فيه مشكلة حقيقية
//   res.json(data);
// });

// app.get('/images', async (req, res) => {
    
//     console.log("السيرفر وصل للصور");
//   const { data, error } = await supabase.from('images').select('*');
//   if (error) throw error; // <<< خليه يطيح إذا فيه مشكلة حقيقية
//   res.json(data);
// });
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });



//هذا الكود الاخير هو الي بجربه 

import express from 'express';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import cors from 'cors';


dotenv.config();

const app = express();
const PORT = 8000;
app.use(cors());

// إعداد Supabase
const supabaseUrl = process.env.DatabaseURL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

app.get('/place', async (req, res) => {
  const { lat, lng, lang } = req.query;

  if (!lat || !lng || !lang) {
    return res.status(400).json({ error: 'الرجاء إرسال lat و lng و lang' });
  }

  try {
    //  1. استدعاء الدالة الجغرافية بدل المطابقة الدقيقة
    const { data: places, error: placeError } = await supabase
      .rpc('get_nearest_place', {
        lat_input: parseFloat(lat),
        lng_input: parseFloat(lng)
      });

    if (placeError || !places || places.length === 0) {
      console.error(placeError || 'لم يتم العثور على المكان');
      return res.status(404).json({ error: 'لم يتم العثور على المكان' });
    }

    const place = places[0];

    //  2. نجيب الصورة
    const { data: images } = await supabase
      .from('images')
      .select('image_url')
      .eq('place_id', place.id)
      .limit(1);

    const imageUrl = images?.[0]?.image_url ||null;

    //  3. نجيب القصة
    const { data: stories } = await supabase
      .from('stories')
      .select('*')
      .eq('place_id', place.id)
      .limit(1);

    const story = stories?.[0] || null;
    if(story?.id){
      await supabase
      .from('stories')
      .update({views:(story.views)+1})
      .eq('id',story.id);
    }
    res.json({
      place:lang === 'ar' ? place?.place_name : place?.place_name_en,
      placeID:place?.id,
      city: lang === 'ar' ? place?.city_name : place?.city_name_en,
      story: lang === 'ar' ? story?.story : story?.story_en,
      source: lang === 'ar' ? story?.source : story?.source_en,
      summary: lang === 'ar' ? story?.summary : story?.summary_en,
      audio: lang === 'ar' ? story?.audio_url_ar : story?.audio_url_en,
      image_url: imageUrl,
      views: story?.views ? story.views + 1 : 1,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'حدث خطأ أثناء معالجة الطلب' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

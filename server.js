

//هذا الكود الاخير هو الي بجربه 

import express from 'express';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import cors from 'cors';


dotenv.config();

const app = express();
const PORT = 5050;
app.use(cors());
app.use(express.json()); // لازم يكون في البداية
app.use(express.urlencoded({ extended: true }));


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

// app.post('/contact',(req,res)=>{
//     const fullname = req.body.fullname;
//     const email = req.body.email;
//     const subject = req.body.subject;
//     const message = req.body.message;
//     const phone = req.body.phone;

//     const query = 'INSERT INTO contacts(fullname,email,subject,message) VALUES (?,?,?,?)';
//     db.query(query, [fullname, email, subject, message,phone], (err, result) => {
//     if (err) {
//       console.error('Error while entering data:', err);
//       res.status(500).json({ message: 'Server error' });
//     } else {
//       res.status(200).json({ message: 'The data has been received successfully.' });
//     }
//   });
// });

app.post('/contact', async (req, res) => {
  console.log("Request Body:", req.body); // أضيفي هذا السطر
  const { fullname, email, subject, message, phone } = req.body;

  try {
    const { data, error } = await supabase
      .from('contacts')
      .insert([{ fullname, email, subject, message, phone }]);

    // if (error) {
    //   console.error('Supabase error:', error);
    //   return res.status(500).json({ message: 'Database insert failed' });
    // }
    if (error) {
  console.error('Supabase error:', error);
  return res.status(500).json({ message: 'Database insert failed', supabaseError: error.message });
}

    return res.status(200).json({ message: 'Data saved successfully', data });
  } catch (err) {
  console.error('Unexpected error:', err);
  return res.status(500).json({ message: 'Server error', error: err.message });
}
});




app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// const express = require('express');
// const { Pool } = require('pg');
// require('dotenv').config();
// const cors = require('cors');

// const app = express();
// app.use(cors());
// app.use(express.json());

// // الاتصال باستخدام Connection String
// const pool = new Pool({
//   connectionString: process.env.DatabaseURL,
//   ssl: {
//     rejectUnauthorized: false, // مهم مع Supabase
//   },
// });

// // مثال: API تعرض كل المواقع من جدول locations
// app.get('/api/locations', async (req, res) => {
//   try {
//     const result = await pool.query('SELECT * FROM locations');
//     res.json(result.rows);
//   } catch (err) {
//     console.error('خطأ في جلب البيانات:', err);
//     res.status(500).json({ error: 'فشل في جلب البيانات' });
//   }
// });

// // تشغيل السيرفر
// app.listen(5000, () => {
//   console.log(' السيرفر شغال على http://localhost:5000');
// });



// import express from 'express';
// const { createClient } = require('@supabase/supabase-js');
// require('dotenv').config();

// const app = express();


// // Supabase client setup
// const supabase = createClient(
//   process.env.SUPABASE_URL,
//   process.env.SUPABASE_KEY
// );

// // Endpoint: Get stories only
// app.get('/stories', async (req, res) => {
//   const { data, error } = await supabase
//     .from('stories')     
//     .select('place_id,story');  

//   if (error) {
//     console.error(error);
//     return res.status(500).json({ error: 'Something went wrong' });
//   }

//   res.json(data);
// });

// app.listen(PORT, () => {
//   console.log(` Server running on http://localhost:${PORT}`);
// });


import express from 'express';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

// تحميل متغيرات البيئة من .env
dotenv.config();

const app = express();

const PORT =3000;

// إعداد Supabase
const supabaseUrl = process.env.DatabaseURL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// مسار تجريبي
app.get('/stories', async (req, res) => {
  const { data, error } = await supabase.from('stories').select('*');

  if (error) {
    console.error(error);
    return res.status(500).json({ error: 'فشل في جلب القصص' });
  }

  res.json(data);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


// import express from 'express';
// import dotenv from 'dotenv';
// import pkg from 'pg';

// const { Pool } = pkg;

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 3000;

// const pool = new Pool({
//   host: 'aws-0-eu-north-1.pooler.supabase.com',
//   port: 6543,
//   database: 'postgres',
//   user: 'postgres.kvfpggxnglvyvexwovzq',
//   password: 'Project321$',
//   ssl: {
//     rejectUnauthorized: false, // عشان Supabase يستخدم SSL
//   },
// });

// app.get('/stories', async (req, res) => {
//   try {
//     const result = await pool.query('SELECT * FROM stories');
//     res.json(result.rows);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "للاسف في غلط" });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`✅ Server is running on port ${PORT}`);
// });
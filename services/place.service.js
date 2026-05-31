// import { supabase } from "../config/supabase.js";

// export const getNearestPlaceDetails = async ({ lat, lng, lang }) => {
//   const { data: places, error: placeError } = await supabase.rpc(
//     "get_nearest_place",
//     {
//       lat_input: parseFloat(lat),
//       lng_input: parseFloat(lng),
//     }
//   );

//   if (placeError) {
//     throw new Error(placeError.message);
//   }

//   if (!places || places.length === 0) {
//     return null;
//   }

//   const place = places[0];

//   const { data: images } = await supabase
//     .from("images")
//     .select("image_url")
//     .eq("place_id", place.id)
//     .limit(1);

//   const { data: stories } = await supabase
//     .from("stories")
//     .select("*")
//     .eq("place_id", place.id)
//     .limit(1);

//   const story = stories?.[0] || null;
//   const imageUrl = images?.[0]?.image_url || null;

//   if (story?.id) {
//     await supabase
//       .from("stories")
//       .update({ views: (story.views || 0) + 1 })
//       .eq("id", story.id);
//   }

//   return {
//     place: lang === "ar" ? place?.place_name : place?.place_name_en,
//     placeID: place?.id,
//     city: lang === "ar" ? place?.city_name : place?.city_name_en,
//     story: lang === "ar" ? story?.story : story?.story_en,
//     source: lang === "ar" ? story?.source : story?.source_en,
//     summary: lang === "ar" ? story?.summary : story?.summary_en,
//     audio: lang === "ar" ? story?.audio_url_ar : story?.audio_url_en,
//     image_url: imageUrl,
//     views: story?.views ? story.views + 1 : 1,
//   };
// };

import { supabase } from "../config/supabase.js";

export const getNearestPlaceDetails = async ({ lat, lng, lang = "ar" }) => {
  const selectedLang = lang === "en" ? "en" : "ar";

  const { data, error } = await supabase.rpc("get_nearest_place", {
    lat_input: parseFloat(lat),
    lng_input: parseFloat(lng),
    lang_input: selectedLang,
  });

  if (error) {
    throw new Error(error.message);
  }

  if (!data || data.length === 0) {
    return null;
  }

  const place = data[0];
  const updatedViews = Number(place.views || 0) + 1;

  const { error: updateError } = await supabase
    .from("places")
    .update({ views: updatedViews })
    .eq("id", place.id);

  if (updateError) {
    console.error("Failed to update views:", updateError.message);
  }

  return {
    place: place.place_name,
    placeID: place.id,
    city: place.city,
    story: place.story,
    source: place.source,
    summary: place.summary,
    audio: place.audio_url,
    image_url: place.picture_url,
    views: updatedViews,
    distance_meters: place.distance_meters,
  };
};
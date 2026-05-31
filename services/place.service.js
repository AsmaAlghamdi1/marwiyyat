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
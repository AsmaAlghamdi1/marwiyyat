import { getNearestPlaceDetails } from "../services/place.service.js";

export const getPlace = async (req, res) => {
  const { lat, lng, lang } = req.query;

  if (!lat || !lng || !lang) {
    return res.status(400).json({
      error: "الرجاء إرسال lat و lng و lang",
    });
  }

  try {
    const placeDetails = await getNearestPlaceDetails({ lat, lng, lang });

    if (!placeDetails) {
      return res.status(404).json({
        error: "لم يتم العثور على المكان",
      });
    }

    return res.status(200).json(placeDetails);
  } catch (error) {
    console.error("Place controller error:", error.message);

    return res.status(500).json({
      error: "حدث خطأ أثناء معالجة الطلب",
      details: error.message,
    });
  }
};
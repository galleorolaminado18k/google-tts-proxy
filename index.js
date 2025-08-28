import express from "express";
import axios from "axios";

const app = express();
app.use(express.json());

const API_KEY = process.env.GOOGLE_API_KEY; // 👈 aquí Render usará tu key como variable de entorno

app.post("/tts", async (req, res) => {
  try {
    const text = req.body.text || "Hola Karla desde Google TTS!";

    // Petición a Google Text-to-Speech
    const response = await axios.post(
      `https://texttospeech.googleapis.com/v1/text:synthesize?key=${API_KEY}`,
      {
        input: { text },
        voice: { languageCode: "es-ES", ssmlGender: "FEMALE" },
        audioConfig: { audioEncoding: "MP3" }
      }
    );

    const audioContent = response.data.audioContent;

    res.json({
      success: true,
      audioContent // base64 del MP3
    });
  } catch (error) {
    console.error(error?.response?.data || error.message);
    res.status(500).json({ error: "Error procesando la petición" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));

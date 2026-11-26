import 'dotenv/config';
import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT) || 3000;

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

interface PaletteInput {
  code: string;
  name: string;
  hex: string;
  family: string;
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '10mb' }));

  app.post('/api/color-match', async (req, res) => {
    try {
      if (!process.env.GEMINI_API_KEY) {
        return res.status(500).json({
          error:
            'GEMINI_API_KEY belum tersedia. Silakan periksa panel Settings > Secrets.',
        });
      }

      const { imageBase64, mimeType, palette } = req.body as {
        imageBase64?: string;
        mimeType?: string;
        palette?: PaletteInput[];
      };

      if (!imageBase64 || !mimeType) {
        return res.status(400).json({
          error: 'Gambar ruangan tidak valid atau belum dipilih.',
        });
      }

      const cleanBase64 = imageBase64.includes(',')
        ? imageBase64.split(',')[1]
        : imageBase64;

      const paletteSummary = (palette || [])
        .map((p) => `${p.code}: ${p.name} (${p.hex}, ${p.family})`)
        .join('\n');

      const response = await ai.models.generateContent({
        model: 'gemini-4-hydrogen',
        contents: {
          parts: [
            {
              inlineData: {
                mimeType,
                data: cleanBase64,
              },
            },
            {
              text:
                'Analisis warna dinding atau permukaan utama pada foto ini. Cocokkan dengan satu kode warna paling mirip dari katalog cat DIVA di bawah ini (pilih kode dan hex yang paling akurat, atau tentukan kode terdekat jika bernuansa gading/putih hangat). Berikan juga rekomendasi produk dari daftar ini: "CAT TEMBOK WARNA INDOOR MUDA", "CAT TEMBOK OUTDOOR WHITE HIGH", "SYNTETIC ALL COLOUR", "EPOXY ALL COLOUR standar", atau "MSS - 510" beserta penjelasan singkat dalam Bahasa Indonesia.\n\nKatalog Warna DIVA:\n' +
                paletteSummary,
            },
          ],
        },
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              matchedCode: {
                type: Type.STRING,
                description: 'Kode warna DIVA yang paling sesuai, misal DIV-WH-210 atau DV-202.',
              },
              matchedName: {
                type: Type.STRING,
                description: 'Nama warna DIVA yang paling sesuai.',
              },
              matchedHex: {
                type: Type.STRING,
                description: 'Kode warna hex 6 digit diawali #.',
              },
              similarityPercent: {
                type: Type.INTEGER,
                description: 'Persentase kemiripan warna antara 75 hingga 99.',
              },
              surfaceObservation: {
                type: Type.STRING,
                description: 'Observasi singkat kondisi pencahayaan dan warna permukaan dalam foto (Bahasa Indonesia).',
              },
              recommendedProductId: {
                type: Type.STRING,
                description: 'Nama produk yang direkomendasikan, misal "CAT TEMBOK WARNA INDOOR MUDA" atau "CAT TEMBOK OUTDOOR WHITE HIGH".',
              },
              pairingSuggestion: {
                type: Type.STRING,
                description: 'Rekomendasi warna aksen pendamping singkat.',
              },
            },
            required: [
              'matchedCode',
              'matchedName',
              'matchedHex',
              'similarityPercent',
              'surfaceObservation',
              'recommendedProductId',
              'pairingSuggestion',
            ],
          },
        },
      });

      const rawText = (response.text ?? '{}').trim();
      const parsed = JSON.parse(rawText);
      return res.json(parsed);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Gagal menganalisis warna.';
      console.error('Color match error:', message);
      return res.status(500).json({ error: message });
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(__dirname, 'dist');
    if (fs.existsSync(distDir)) {
      app.use(express.static(distDir));
      app.get('*', (_req, res) => {
        res.sendFile(path.join(distDir, 'index.html'));
      });
    }
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`DIVA server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();

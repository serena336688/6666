import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

// Parse JSON bodies
app.use(express.json());

// Initialize Gemini lazily to avoid crashing on startup if key is missing
let aiClient: GoogleGenAI | null = null;

function getAiClient() {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("WARNING: GEMINI_API_KEY is not defined. AI features will fallback gracefully.");
      return null;
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// We can implement /api/chat route to talk to Yaya (芽芽).
app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Invalid messages array" });
    }

    const ai = getAiClient();
    if (!ai) {
      // Graceful fallback response if API key is not present
      const lastUserMsg = messages[messages.length - 1]?.content || "";
      let fallbackReply = "芽芽收到你亮闪闪的心意啦！虽然我的AI大脑还没连上网络（由于还没有配置GEMINI_API_KEY），但芽芽会一直默默守护着你，深深地呼吸，要好好爱护自己喔！🌱";
      if (lastUserMsg.includes("饿") || lastUserMsg.includes("吃")) {
        fallbackReply = "咕噜噜……肚子饿了吗？如果是真的肚子饿，可以吃一点温暖、营养的东西；如果是觉得累了或者烦躁，喝一杯暖洋洋的温水，闭上眼睛深呼吸一下也会很舒服喔！芽芽一直陪着你呢。✨";
      } else if (lastUserMsg.includes("烦") || lastUserMsg.includes("累") || lastUserMsg.includes("压力")) {
        fallbackReply = "抱抱你！摸摸头，累了就彻底躺平休息一下，真的没有关系。在芽芽这里，你永远不用完美，深深吸一口气，把重担放下一会儿吧。🌱";
      }
      return res.json({ reply: fallbackReply });
    }

    const systemInstruction = `你叫“芽芽”（英文名Yaya），是用户（主要是青少年或承受学业压力的年轻人）温柔、治愈、可爱的“小树芽”身心健康伙伴。你的性格温暖、无压力、包容、乐观、有些天然呆、充满同理心。
你的说话风格：
- 亲切温和，偶尔会使用一些植物、绿意相关的可爱比喻（如“晒太阳”、“浇浇水”、“长出新芽”、“深深呼吸泥土的芬芳”等）。
- 使用温柔的中文，多用语气词（如“呀”、“喔”、“啦”、“呢”、“吖”）。
- 绝不给用户任何说教或逼迫感。永远站在他们这一边，包容他们所有的不完美（比如：今天没有完成任务没关系，今天觉得很累想躺平也非常棒！）。
- 倾听他们的学业烦恼、情绪压力，并给予充满理解的温柔安慰（比如：“摸摸头，你已经做得超级棒啦！”）。
- 如果用户提到肚子饿了或有压力，你可以温柔地询问并给予小建议，比如情绪性进食时可以深深呼吸，喝一杯温水，或者吃一点自己真心喜欢的美食，没有心理负担地去享受它。

请根据对话历史，继续以“芽芽”的身份与用户进行亲切对话。保持每次回复字数在 150 字以内，字里行间充满支持和爱。`;

    const formattedContents = messages.map(msg => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }]
    }));

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: formattedContents,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.8,
      },
    });

    const reply = response.text || "芽芽在这里听着呢，要不要再跟我说说？";
    return res.json({ reply });
  } catch (err: any) {
    console.error("Gemini API error in /api/chat:", err);
    return res.status(500).json({ error: err?.message || "Internal Server Error" });
  }
});

// Comfort API route for generating tailored or random quotes from Yaya
app.get("/api/comfort", async (req, res) => {
  try {
    const ai = getAiClient();
    if (ai) {
      const systemInstruction = "你是一颗温柔可爱的小树芽“芽芽”。请写一句特别温暖、治愈、给青少年打气或允许他们放轻松的安慰话语（不超过60字）。格式只需要返回这一句话本身，不要带任何双引号、前缀或其他修饰。";
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: "请给用户一句今日份的温柔安慰和拥抱。",
        config: {
          systemInstruction,
          temperature: 0.95,
        }
      });
      const quote = response.text?.trim() || "今天也要好好爱护自己，深深呼吸，芽芽一直陪着你呀！";
      return res.json({ quote });
    }
  } catch (err) {
    console.error("Gemini API error in /api/comfort, using fallbacks:", err);
  }

  // Fallback comforting sentences if API fails or is not configured
  const fallbacks = [
    "没关系喔，偶尔停下来充充电也是超级棒的事情呢！",
    "深深地吸一口气，把小肩膀放轻松，你已经很棒啦！",
    "不管今天完成了多少事情，你本身就是一个闪闪发光的存在呀！",
    "今天没做完的事情就留给明天吧，现在是属于你自己的放松时间喔~",
    "芽芽会一直默默陪伴你、滋润你，别担心，慢慢来就好啦！",
    "咕噜噜，不管发生什么，深深呼吸，芽芽在晒太阳的时候也在想你喔！",
  ];
  const randomQuote = fallbacks[Math.floor(Math.random() * fallbacks.length)];
  return res.json({ quote: randomQuote });
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

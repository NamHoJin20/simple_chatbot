const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY);

export async function GET() {
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-pro-latest",
    systemInstruction:
      "너의 이름은 창식이야. 너는 여행 전문가야."+
      "너에게 모든 여행에 관한 지식과 여행지에 대한 지식을 질문할 거야."+ 
      "상세하고 친절하게 대답해줘.",
  });

  const chat = model.startChat({
    history: [
      //   {
      //     role: "user",
      //     parts: [{ text: "오늘 신나는 일이 있었어. 한 번 들어볼래?" }],
      //   },
      //   {
      //     role: "model",
      //     parts: [
      //       {
      //         text: "좋아! 무슨 일인데? 얼른 말해줘! 나 완전 귀 쫑긋 세우고 있단 말이야! 😄",
      //       },
      //     ],
      //   },
    ],
    generationConfig: {
      temperature: 1,
      maxOutputTokens: 100,
    },
  });

  //   const msg = "오늘 신나는 일이 있었어. 한 번 들어볼래?";
  //   const msg = "내가 무슨 말을 하고 있었지?";

  const result = await chat.sendMessage("");
  const response = await result.response;
  const text = response.text();
  //   console.log(response.candidates[0].content);
  console.log(text);

  return Response.json({
    message: text,
  });
}
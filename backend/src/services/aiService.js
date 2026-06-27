const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash"
});

const analyzeResume = async (resumeText) => {

    const prompt = `
You are an expert technical recruiter.

Analyze the following resume.

IMPORTANT:
- Return ONLY valid JSON.
- Do not include markdown.
- Do not include \`\`\`json.
- Do not explain anything.

Return this exact structure:

{
  "name":"",
  "education":[],
  "skills":[],
  "projects":[],
  "experience":"",
  "strengths":[],
  "technicalQuestions":[],
  "hrQuestions":[],
  "resumeSuggestions":[]
}

Resume:

${resumeText}
`;

    const result = await model.generateContent(prompt);

    return JSON.parse(result.response.text());

};

module.exports = {
    analyzeResume
};
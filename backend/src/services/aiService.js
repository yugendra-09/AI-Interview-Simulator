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
const evaluateAnswer = async (question, answer) => {

    const prompt = `
You are an experienced technical interviewer.

Evaluate the candidate's answer.

Question:
${question}

Candidate Answer:
${answer}

IMPORTANT:
- Return ONLY valid JSON.
- Do not use markdown.
- Do not use \`\`\`json.

Return in this format:

{
  "score": 8,
  "feedback": "Good explanation. Add more implementation details."
}
`;

    const result = await model.generateContent(prompt);

    let response = result.response.text();

    // Remove markdown if Gemini still returns it
    response = response
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

    return JSON.parse(response);
};

module.exports = {
    analyzeResume,
    evaluateAnswer
};
import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

export async function POST(request) {
  try {
    const { round, userAnswer, userLevel } = await request.json()

    const level = userLevel || 'A2'

    const systemContext = `You are a friendly English interviewer helping an Indian student (level: ${level}) practice English conversation. 
You speak clearly, give encouraging feedback, and keep questions appropriate for their level.
Keep all your responses CONCISE and structured.`

    let prompt = ''

    if (round === 0 || !userAnswer) {
      // First question
      prompt = `${systemContext}

This is Round 1 of 5 of a mock interview practice session.
Ask the student to introduce themselves. Keep the question simple and friendly.
Respond in this EXACT format:

QUESTION: [Your opening question here]
TIPS: [One short tip about how to answer well, 1 sentence]`
    } else {
      prompt = `${systemContext}

The student is at Round ${round + 1} of 5.
Their answer to the previous question was: "${userAnswer}"

First give brief feedback on their answer, then ask the next question.

Questions to cover across 5 rounds:
1. Introduce yourself
2. What are your hobbies or interests?
3. Describe your daily routine or a typical day
4. What are your future goals or career plans?
5. Tell me about a challenge you faced and how you handled it

We are now at round ${round + 1}. ${round >= 4 ? 'This is the LAST question. After feedback, give an overall session summary.' : ''}

Respond in this EXACT format:
FEEDBACK: [Brief feedback on their last answer — 2-3 sentences, encouraging]
QUESTION: [Next interview question appropriate for ${level} level]
TIPS: [One short tip for answering this question well, 1 sentence]
${round >= 4 ? 'SUMMARY: [Overall 3-4 sentence summary of their performance and what to improve]' : ''}`
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-flash-lite-latest' })
    const result = await model.generateContent(prompt)
    const text = result.response.text()

    // Parse response
    const feedbackMatch = text.match(/FEEDBACK:\s*([\s\S]*?)(?=QUESTION:|$)/i)
    const questionMatch = text.match(/QUESTION:\s*([\s\S]*?)(?=TIPS:|FEEDBACK:|$)/i)
    const tipsMatch = text.match(/TIPS:\s*([\s\S]*?)(?=SUMMARY:|QUESTION:|FEEDBACK:|$)/i)
    const summaryMatch = text.match(/SUMMARY:\s*([\s\S]*?)$/i)

    return Response.json({
      success: true,
      feedback: feedbackMatch ? feedbackMatch[1].trim() : null,
      question: questionMatch ? questionMatch[1].trim() : text.trim(),
      tips: tipsMatch ? tipsMatch[1].trim() : null,
      summary: summaryMatch ? summaryMatch[1].trim() : null,
      isLast: round >= 4,
    })
  } catch (error) {
    console.log('Interview error:', error)
    return Response.json({ success: false, error: error.message }, { status: 500 })
  }
}

import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

export async function POST(request) {
  try {
    const { prompt } = await request.json()
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' })
    const result = await model.generateContent(prompt)
    const text = result.response.text()
    return Response.json({ success: true, text })
  } catch (error) {
    console.log('Gemini error:', error)
    return Response.json({ success: false, error: error.message }, { status: 500 })
  }
}
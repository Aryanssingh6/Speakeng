// Dummy data for SpeakEng — mock stats, conversations, analytics

export const dummyUser = {
  name: 'Aryan Singh',
  email: 'aryan@example.com',
  avatar: 'AS',
  level: 'B1',
  joinedDate: '2024-09-15',
  streak: 14,
  totalXP: 3840,
  weeklyXP: 420,
  accuracy: 78,
  lessonsCompleted: 24,
  practiceMinutes: 187,
  dailyGoal: 20, // minutes
  dailyProgress: 14, // minutes done today
}

export const weeklyXP = [
  { day: 'Mon', xp: 60 },
  { day: 'Tue', xp: 85 },
  { day: 'Wed', xp: 40 },
  { day: 'Thu', xp: 95 },
  { day: 'Fri', xp: 70 },
  { day: 'Sat', xp: 50 },
  { day: 'Sun', xp: 20 },
]

export const skillScores = {
  Grammar: 72,
  Vocabulary: 84,
  Fluency: 65,
  Pronunciation: 58,
  Listening: 80,
}

export const recentActivity = [
  { id: 1, type: 'practice', label: 'AI Speaking Session', detail: 'Job Interview scenario', time: '2h ago', xp: 45, icon: '🎤' },
  { id: 2, type: 'lesson', label: 'Completed Lesson', detail: 'Advanced Tense Usage – Unit 4', time: '5h ago', xp: 30, icon: '📚' },
  { id: 3, type: 'test', label: 'Grammar Quiz', detail: 'Score: 84% — B1 Confirmed', time: 'Yesterday', xp: 60, icon: '📊' },
  { id: 4, type: 'writing', label: 'Essay Submitted', detail: 'Topic: Future of AI', time: '2 days ago', xp: 50, icon: '✍️' },
  { id: 5, type: 'practice', label: 'AI Speaking Session', detail: 'Daily Conversation scenario', time: '3 days ago', xp: 40, icon: '🎤' },
]

export const chatMessages = [
  {
    id: 1,
    role: 'ai',
    text: "Hello! I'm your AI English tutor. Today let's practice for a job interview. Tell me about yourself and your professional experience.",
    time: '10:00 AM',
  },
  {
    id: 2,
    role: 'user',
    text: "Hi! I am a software engineer with 2 year experience. I worked mostly on web development projects using React and Node.js.",
    time: '10:01 AM',
  },
  {
    id: 3,
    role: 'ai',
    text: "Great start! I noticed a small correction: it should be '2 years of experience' (plural). Also, consider saying 'I have worked on' instead of 'I worked on' for a more professional tone. Would you like to continue and tell me about your greatest achievement?",
    time: '10:01 AM',
    feedback: {
      grammar: 85,
      fluency: 72,
      tip: "Use present perfect ('I have worked') when describing ongoing experiences."
    }
  },
  {
    id: 4,
    role: 'user',
    text: "Thank you for the correction. I have worked on several projects, and my greatest achievement was building a full-stack e-commerce platform that handled over 10,000 users.",
    time: '10:02 AM',
  },
  {
    id: 5,
    role: 'ai',
    text: "Excellent! That was much better! Your grammar and vocabulary showed a clear improvement. The phrase 'handled over 10,000 users' is professional and impactful. Let's continue — why do you want to work at our company?",
    time: '10:02 AM',
    feedback: {
      grammar: 95,
      fluency: 88,
      tip: "Perfect use of past simple tense for a completed project. Keep it up!"
    }
  },
]

export const badges = [
  { id: 1, icon: '🔥', name: '14-Day Streak', desc: 'Practiced 14 days in a row', earned: true },
  { id: 2, icon: '🎤', name: 'Confident Speaker', desc: 'Completed 10 speaking sessions', earned: true },
  { id: 3, icon: '📚', name: 'Bookworm', desc: 'Finished 20 lessons', earned: true },
  { id: 4, icon: '🏆', name: 'B1 Graduate', desc: 'Achieved B1 proficiency level', earned: true },
  { id: 5, icon: '⚡', name: 'Speed Learner', desc: 'Earn 500 XP in a single day', earned: false },
  { id: 6, icon: '🌟', name: 'Master Speaker', desc: 'Achieve 90%+ fluency score', earned: false },
  { id: 7, icon: '🎯', name: 'Perfectionist', desc: 'Get 100% on any grammar quiz', earned: false },
  { id: 8, icon: '👑', name: 'C2 Legend', desc: 'Reach the highest CEFR level', earned: false },
]

// 28-day practice heatmap (0-3 intensity)
export const heatmapData = [
  3,2,1,0, 3,3,2,1, 0,2,3,3, 1,1,2,3,
  3,0,1,2, 3,3,2,1, 0,1,3,3,
]

export const testimonials = [
  {
    name: 'Priya Sharma',
    role: 'Got IELTS Band 7.5',
    avatar: 'PS',
    text: "SpeakEng's AI tutor helped me prepare for IELTS in just 3 months. The instant feedback on my speaking sessions was a game-changer.",
    rating: 5,
  },
  {
    name: 'Carlos Mendez',
    role: 'Software Engineer at Google',
    avatar: 'CM',
    text: "The interview practice module is incredible. I practiced hundreds of conversations and landed my dream job. Highly recommend!",
    rating: 5,
  },
  {
    name: 'Yuki Tanaka',
    role: 'MBA Student at UCLA',
    avatar: 'YT',
    text: "Went from B1 to C1 in 4 months. The personalized curriculum and daily streaks kept me motivated every single day.",
    rating: 5,
  },
]

export const pricingPlans = [
  {
    name: 'Free',
    price: 0,
    period: 'forever',
    description: 'Perfect for getting started',
    color: 'white',
    features: [
      'Proficiency level test',
      '5 AI speaking sessions/month',
      'Basic grammar feedback',
      'Access to A1-A2 lessons',
      'Progress dashboard',
    ],
    notIncluded: ['Unlimited speaking practice', 'Advanced feedback', 'Priority support'],
    cta: 'Get Started Free',
    href: '/register',
  },
  {
    name: 'Pro',
    price: 12,
    period: 'month',
    description: 'For serious learners',
    color: 'amber',
    popular: true,
    features: [
      'Everything in Free',
      'Unlimited AI speaking sessions',
      'Advanced grammar & fluency scoring',
      'All CEFR levels (A1-C2)',
      'Writing studio with AI grading',
      'Mock interview practice',
      'Downloadable progress reports',
      'Priority support',
    ],
    cta: 'Start 7-Day Free Trial',
    href: '/register',
  },
  {
    name: 'Team',
    price: 8,
    period: 'user/month',
    description: 'For schools & organizations',
    color: 'sky',
    features: [
      'Everything in Pro',
      'Team dashboard & analytics',
      'Bulk user management',
      'Custom learning paths',
      'Dedicated account manager',
      'SCORM/LMS integration',
      'SSO support',
    ],
    cta: 'Contact Sales',
    href: '/contact',
  },
]

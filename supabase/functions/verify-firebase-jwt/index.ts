import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js'
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js'

serve(async (req) => {
  try {
    const { authorization } = req.headers
    if (!authorization || !authorization.startsWith('Bearer ')) {
      return new Response(
        JSON.stringify({ error: 'No authorization header' }),
        { status: 401 }
      )
    }

    const token = authorization.split(' ')[1]
    
    // Initialize Firebase Admin
    const app = initializeApp({
      projectId: Deno.env.get('FIREBASE_PROJECT_ID'),
      clientEmail: Deno.env.get('FIREBASE_CLIENT_EMAIL'),
      privateKey: Deno.env.get('FIREBASE_PRIVATE_KEY')
    })

    const auth = getAuth(app)
    const decodedToken = await auth.verifyIdToken(token)

    return new Response(
      JSON.stringify({
        sub: decodedToken.uid,
        email: decodedToken.email
      }),
      { headers: { 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 401 }
    )
  }
})
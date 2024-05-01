import { NextResponse } from 'next/server'
export const dynamic = 'force-dynamic'

export async function GET() {
  return NextResponse.redirect(
    'https://docs.google.com/document/d/1aLtcHduXXZ4JJFMmX_Iuw__pwZb8BKLp/edit?usp=sharing&ouid=100877972451705059128&rtpof=true&sd=true',
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    },
  )
}

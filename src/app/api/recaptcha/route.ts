import { NextResponse } from 'next/server';

type VerifyResponse = {
  success: boolean;
  score?: number;
  action?: string;
  challenge_ts?: string;
  hostname?: string;
  'error-codes'?: string[];
};

export async function POST(request: Request) {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json({ success: false, message: 'Missing token' }, { status: 400 });
    }

    const secret = process.env.RECAPTCHA_SECRET_KEY;
    if (!secret) {
      return NextResponse.json({ success: false, message: 'Server misconfigured' }, { status: 500 });
    }

    const verifyUrl = 'https://www.google.com/recaptcha/api/siteverify';
    const params = new URLSearchParams({ secret, response: token });

    const res = await fetch(verifyUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
    });

    const data = (await res.json()) as VerifyResponse;

    if (!data.success) {
      return NextResponse.json({ success: false, score: data.score ?? null, errorCodes: data['error-codes'] ?? [] }, { status: 200 });
    }

    return NextResponse.json({ success: true, score: data.score ?? null, action: data.action ?? null }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Internal error' }, { status: 500 });
  }
}



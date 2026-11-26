import { NextResponse } from 'next/server';
import { z } from 'zod';

const newsletterSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, 'Please enter your business email address.')
    .email('Please enter a valid business email address.'),
});

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    const parsed = newsletterSchema.safeParse(body);

    if (!parsed.success) {
      const firstError =
        parsed.error.issues[0]?.message ??
        'Please enter a valid business email address.';
      return NextResponse.json(
        { errors: { email: [firstError] }, message: firstError },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        status: 'subscribed',
        email: parsed.data.email,
        message:
          'You are subscribed to The Takhlees Business Briefing. Watch your inbox for curated UAE regulatory and business updates.',
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { message: 'Unable to process your subscription right now. Please try again.' },
      { status: 400 }
    );
  }
}

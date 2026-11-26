import { NextResponse } from 'next/server';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().trim().min(2, 'Please enter your full name.'),
  email: z
    .string()
    .trim()
    .min(1, 'Please enter your email address.')
    .email('Please enter a valid email address.'),
  phone: z
    .string()
    .trim()
    .min(6, 'Please enter a valid phone number.'),
  country: z.string().trim().min(1, 'Please select a country.'),
  message: z
    .string()
    .trim()
    .min(10, 'Please enter a message (at least 10 characters).'),
});

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      const fieldErrors: Record<string, string[]> = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0] ?? 'form');
        if (!fieldErrors[key]) fieldErrors[key] = [];
        fieldErrors[key].push(issue.message);
      }
      return NextResponse.json(
        {
          errors: fieldErrors,
          message: parsed.error.issues[0]?.message ?? 'Validation failed.',
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        status: 'received',
        message:
          'Thank you for reaching out. Our UAE corporate consultant will contact you shortly.',
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { message: 'Unable to send your message right now. Please try again.' },
      { status: 400 }
    );
  }
}

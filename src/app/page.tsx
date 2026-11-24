import { redirect } from 'next/navigation';

export default function RootPage() {
  // Redirect default root access to UAE experience by default
  redirect('/ae');
}

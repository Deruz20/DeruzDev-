import Link from 'next/link';
import { Button } from '@/components/ui/button'; // Assumes Shadcn created this alias

export default function Header() {
  return (
    <header className="bg-white dark:bg-gray-900 shadow-md">
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-gray-900 dark:text-white">
          OmniTrack
        </Link>
        <div className="flex items-center space-x-2">
          <Button variant="ghost">Login</Button>
          <Button>Sign Up</Button>
        </div>
      </nav>
    </header>
  );
}

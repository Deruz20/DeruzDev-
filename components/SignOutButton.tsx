'use client';

import { createClient } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function SignOutButton() {
  const router = useRouter();
  const supabase = createClient();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <button
      onClick={handleSignOut}
      className="text-sm font-medium text-muted-foreground hover:text-white transition-colors"
    >
      Sign Out
    </button>
  );
}
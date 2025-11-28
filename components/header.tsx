import Link from "next/link";
import { Brain } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { UserMenu } from "./user-menu";
import { Button } from "./ui/button";

export async function Header() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Brain className="h-6 w-6 text-primary" />
          <span>Learning Archetype</span>
        </Link>

        <nav className="flex items-center gap-4">
          <Link
            href="/resources"
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            Resources
          </Link>

          {user ? (
            <UserMenu user={user} />
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link href="/auth/signin">Sign In</Link>
              </Button>
              <Button asChild>
                <Link href="/auth/signup">Sign Up</Link>
              </Button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

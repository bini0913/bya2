"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function AdminLoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: username.trim(),
      password,
      options: { shouldCreateUser: false },
    });

    if (signInError) {
      setError("Incorrect username or password");
      setLoading(false);
      return;
    }

    if (!remember) {
      // Session duration is managed by Supabase; this flag is kept for UX compatibility.
    }

    router.push("/admin/dashboard");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#061227] px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border border-gold-500/25 bg-gradient-to-b from-[#0a1d37] to-[#061227] p-8 shadow-[0_30px_80px_rgba(0,0,0,0.5)]">
        <p className="text-xs uppercase tracking-[0.2em] text-gold-500/80">Boriyad Management Portal</p>
        <h1 className="mt-3 font-display text-3xl font-semibold text-white">Administrator Sign In</h1>
        <p className="mt-2 text-sm text-white/65">Secure access for authorized BYA administrators only.</p>

        <form onSubmit={onSubmit} className="mt-8 space-y-5">
          <div className="space-y-2">
            <Label htmlFor="username" className="text-white/90">Username</Label>
            <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="admin@boriyad.edu" className="border-white/15 bg-[#071833] text-white" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-white/90">Password</Label>
            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="border-white/15 bg-[#071833] text-white" required />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-white/75">
              <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="h-4 w-4 rounded border-white/20 bg-[#061227] text-gold-500" />
              Remember me
            </label>
            <span className="cursor-not-allowed text-white/35" aria-disabled>
              Forgot password
            </span>
          </div>

          {error ? <p className="rounded-md border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-200">{error}</p> : null}

          <Button type="submit" disabled={loading} className="h-11 w-full bg-gold-500 font-semibold text-[#071529] hover:bg-gold-400">
            {loading ? "Signing in..." : "Login"}
          </Button>
        </form>
      </div>
    </div>
  );
}

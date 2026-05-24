import Link from "next/link";

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#071529] px-4">
      <div className="w-full max-w-md rounded-xl border border-white/10 bg-[#0b1d36] p-8 text-center shadow-2xl">
        <h1 className="font-display text-3xl font-semibold text-gold-500">BYA Admin Entry</h1>
        <p className="mt-3 text-sm text-white/70">
          Authentication is disabled in this environment. Continue directly to the CMS.
        </p>
        <Link
          href="/admin"
          className="mt-6 inline-flex w-full items-center justify-center rounded-md bg-gold-500 px-4 py-2 text-sm font-semibold text-[#071529]"
        >
          Enter CMS
        </Link>
      </div>
    </div>
  );
}

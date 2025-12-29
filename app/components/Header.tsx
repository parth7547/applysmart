"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function Header() {
  const { data: session, status } = useSession();

  return (
    <div style={{ padding: "10px", textAlign: "right" }}>
      {status === "loading" && <span>Loading...</span>}

      {status === "unauthenticated" && (
        <button onClick={() => signIn("google")}>Sign in</button>
      )}

      {status === "authenticated" && (
        <>
          <span style={{ marginRight: "10px" }}>
            {session.user?.email}
          </span>
          <button onClick={() => signOut()}>Sign out</button>
        </>
      )}
    </div>
  );
}

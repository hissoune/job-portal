"use client";

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const res = await fetch("/api/auth", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      const data = await res.json();
      document.cookie = `token=${data.token}; path=/`;
      window.location.href = "/";
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h1>Login</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

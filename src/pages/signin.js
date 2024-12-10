import { useRouter } from "next/router";
import { useState } from "react";

const SignIn = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const router = useRouter();
  const signInHandler = async () => {
    const res = await fetch("/api/auth/signin", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    if (data.status === "success") {
      router.push("/dashboard");
    }
  };
  return (
    <div>
      <h3>Login Form</h3>
      <input
        placeholder="Email"
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder="Email"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={signInHandler}>Login</button>
    </div>
  );
};

export default SignIn;

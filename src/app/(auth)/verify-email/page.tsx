'use client';

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";

const VerifyEmailPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams(); // Use useSearchParams to get query parameters
  const token = searchParams.get("token"); // Extract the token from the URL
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    if (!token) return; // Wait until the token is available

    const verifyEmail = async () => {
      try {
        await axios.get(`http://localhost:3000/v1/auth/verify-email`, {
          params: { token },
        });

        setStatus("success");

        setTimeout(() => {
          router.push("/signin"); // Redirect to the sign-in page
        }, 3000);
      } catch (error) {
        console.error("Email verification failed:", error);
        setStatus("error");
      }
    };

    verifyEmail();
  }, [token, router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      {status === "loading" && <p>Verifying your email...</p>}
      {status === "success" && (
        <div className="text-green-600">
          <h1>Email Verified Successfully!</h1>
          <p>Redirecting to dashboard...</p>
        </div>
      )}
      {status === "error" && (
        <div className="text-red-600">
          <h1>Email Verification Failed</h1>
          <p>Please try again or request a new verification email.</p>
        </div>
      )}
    </div>
  );
};

export default VerifyEmailPage;
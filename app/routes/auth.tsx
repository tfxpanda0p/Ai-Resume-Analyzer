import { usePuterStore } from "~/lib/puter";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
export const meta = () => [
  { title: "Resumind | Auth" },
  {
    name: "description",
    content: "Sign in or register to create your account on Resumind",
  },
];

const auth = () => {
  const { isLoading, auth } = usePuterStore();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const next = searchParams.get("next") || "/";
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      await auth.signIn();
      navigate(next);
    } catch (error) {
      console.error("Sign in failed:", error);
    }
  };

  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover min-h-screen flex items-center justify-center ">
      <div className="gradient-border shadow-lg">
        <section className="flex flex-col gap-8 bg-white rounded-2xl p-10">
          <div className="flex flex-col items-center gap-2 text-center">
            <h1>Welcome</h1>
            <h2>Log in to continue your job journey</h2>
          </div>
          <div>
            {isLoading ? (
              <button className="auth-button animate-pulse">
                <p>Signing you in...</p>
              </button>
            ) : (
              <>
                {auth.isAuthenticated ? (
                  <button className="auth-button" onClick={auth.signOut}>
                    <p>Sign out</p>
                  </button>
                ) : (
                  <button className="auth-button" onClick={handleSignIn}>
                    <p>Sign In</p>
                  </button>
                )}
              </>
            )}
          </div>
        </section>
      </div>
    </main>
  );
};

export default auth;

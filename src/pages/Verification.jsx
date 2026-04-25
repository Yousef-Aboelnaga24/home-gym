import { useState } from "react";
import { Button } from "../components/ui/Button";
import api from "../services/api";

export function Verification() {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const resendEmail = async () => {
        setMessage("");

        try {
            setLoading(true);

            await api.post("/email/resend");

            setMessage("Verification email sent 📩");
        } catch (err) {
            setMessage(
                err.response?.data?.message || "Something went wrong ❌"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-white px-4">
            <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl w-full max-w-md text-center">

                <h1 className="text-2xl font-bold mb-2">
                    Verify your email 📩
                </h1>

                <p className="text-zinc-400 mb-6">
                    We sent a verification link to your email.
                    Please check your inbox and verify your account.
                </p>

                {message && (
                    <p className="mb-4 text-sm text-yellow-400">
                        {message}
                    </p>
                )}

                <Button
                    onClick={resendEmail}
                    disabled={loading}
                    className="w-full"
                >
                    {loading ? "Sending..." : "Resend Email"}
                </Button>

            </div>
        </div>
    );
}
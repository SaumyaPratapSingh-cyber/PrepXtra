"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Loader2, ShieldCheck } from "lucide-react";

function VerifyContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const emailParam = searchParams.get("email");

    const [otp, setOtp] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage("");

        console.log("Submitting Verification for:", emailParam, "OTP:", otp);

        try {
            const res = await fetch("/api/auth/verify", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: emailParam, otp }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Verification failed");
            }

            alert("Email Verified Successfully! Redirecting to Login...");
            router.push("/auth/login");

        } catch (error: any) {
            console.error("Verification Error:", error);
            setMessage(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleResend = async () => {
        if (!emailParam) return;
        setIsLoading(true);
        setMessage("");
        try {
            const res = await fetch("/api/auth/resend-otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: emailParam }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Failed to resend");
            alert("New code sent! Please check your email.");
        } catch (e: any) {
            alert(e.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-slate-950">
            <div className="fixed inset-0 -z-10 h-full w-full bg-slate-950 [background:radial-gradient(125%_125%_at_50%_10%,#020617_40%,#10b981_100%)] opacity-10" />

            <Card className="w-full max-w-md glass-card border-slate-800">
                <CardHeader className="text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
                        <ShieldCheck className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-2xl">Verify your Email</CardTitle>
                    <p className="text-sm text-slate-400">
                        Enter the 6-digit code sent to <span className="text-white">{emailParam}</span>
                    </p>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleVerify} className="space-y-4">
                        <Input
                            placeholder="123456"
                            className="text-center text-2xl tracking-widest"
                            maxLength={6}
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                        />

                        {message && (
                            <p className="text-sm text-red-500 text-center">{message}</p>
                        )}

                        <Button className="w-full bg-emerald-600 hover:bg-emerald-700" type="submit" disabled={isLoading || otp.length < 6}>
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Verify Account
                        </Button>

                        <div className="text-center mt-4">
                            <button
                                type="button"
                                onClick={handleResend}
                                className="text-sm text-slate-400 hover:text-white underline"
                                disabled={isLoading}
                            >
                                Resend Code
                            </button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

export default function VerifyPage() {
    return (
        <Suspense fallback={<div className="flex h-screen items-center justify-center bg-slate-950 text-white"><Loader2 className="h-8 w-8 animate-spin" /></div>}>
            <VerifyContent />
        </Suspense>
    );
}

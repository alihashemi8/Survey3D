import React, { useState } from "react";

export default function AuthForm({ onClose, onLogin }) {
  const [step, setStep] = useState("input"); // input | verify
  const [input, setInput] = useState("");
  const [otp, setOtp] = useState("");

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!input) return alert("لطفاً شماره یا ایمیل را وارد کنید");

    try {
      const res = await fetch("http://localhost:8000/api/send-otp/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier: input }),
      });

      const data = await res.json();

      if (res.ok) {
        setStep("verify");
      } else {
        alert(data.message || "خطا در ارسال کد");
      }
    } catch (err) {
      alert("خطا در اتصال به سرور");
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otp) return alert("کد را وارد کنید");

    try {
      const res = await fetch("http://localhost:8000/api/verify-otp/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier: input, otp }),
      });

      const data = await res.json();

      if (res.ok && data.token) {
        onLogin(data.token);
      } else {
        alert(data.message || "کد اشتباه است");
      }
    } catch (err) {
      alert("خطا در تایید کد");
    }
  };

  return (
    <div
      className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg max-w-md mx-auto"
      dir="rtl"
    >
      <button
        onClick={onClose}
        className="absolute top-2 right-3 text-gray-500 hover:text-black dark:text-gray-300"
        aria-label="بستن فرم"
      >

      </button>
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800 dark:text-amber-400">
        {step === "input" ? "ورود با شماره یا ایمیل" : "کد را وارد کنید"}
      </h2>

      <form onSubmit={step === "input" ? handleSendOtp : handleVerifyOtp}>
        {step === "input" ? (
          <input
            type="text"
            placeholder="شماره موبایل یا ایمیل"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full mb-4 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            autoFocus
          />
        ) : (
          <input
            type="text"
            placeholder="کد یک‌بار مصرف"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full mb-4 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            autoFocus
          />
        )}

        <button
          type="submit"
          className="w-full bg-amber-500 hover:bg-amber-600 text-white py-3 rounded-md font-semibold transition"
        >
          {step === "input" ? "دریافت کد یک‌بار مصرف" : "ورود"}
        </button>
      </form>

      {step === "verify" && (
        <p className="mt-4 text-center text-sm text-gray-600 dark:text-amber-300">
          ارسال به: {input}{" "}
          <button
            className="text-amber-600 hover:underline ml-2"
            onClick={() => setStep("input")}
            type="button"
          >
            تغییر؟
          </button>
        </p>
      )}
    </div>
  );
}

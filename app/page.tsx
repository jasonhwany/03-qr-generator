"use client";
import { useState, useRef } from "react";

export default function QRGenerator() {
  const [text, setText] = useState("");
  const [size, setSize] = useState(256);
  const [generated, setGenerated] = useState(false);
  const [loading, setLoading] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hiddenRef = useRef<HTMLCanvasElement>(null);

  const generate = async () => {
    const t = text.trim();
    if (!t) return;
    setLoading(true);
    try {
      const QRCode = (await import("qrcode")).default;
      const target = generated ? canvasRef.current : hiddenRef.current;
      if (target) {
        await QRCode.toCanvas(target, t, { width: size, margin: 2, color: { dark: "#000000", light: "#ffffff" } });
        setGenerated(true);
      }
    } finally {
      setLoading(false);
    }
  };

  const download = () => {
    const c = canvasRef.current;
    if (!c) return;
    const a = document.createElement("a");
    a.href = c.toDataURL("image/png");
    a.download = "qrcode.png";
    a.click();
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-4 font-sans">
      <div className="max-w-md mx-auto pt-10">
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">🔲</div>
          <h1 className="text-3xl font-bold tracking-tight">QR코드 생성기</h1>
          <p className="text-gray-400 mt-1 text-sm">URL 또는 텍스트를 QR코드로 변환</p>
        </div>

        <div className="bg-gray-900 rounded-2xl p-6 space-y-4">
          <div>
            <label className="text-xs text-gray-400 mb-1.5 block">URL 또는 텍스트 입력</label>
            <textarea value={text} onChange={e => setText(e.target.value)}
              onKeyDown={e => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), generate())}
              className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 resize-none h-24 focus:outline-none focus:border-emerald-500 transition-colors text-sm"
              placeholder="https://example.com" />
          </div>

          <div>
            <label className="flex justify-between text-xs text-gray-400 mb-2">
              <span>QR 크기</span><span className="text-emerald-400">{size}px</span>
            </label>
            <input type="range" min="128" max="512" step="32" value={size} onChange={e => setSize(+e.target.value)}
              className="w-full accent-emerald-500" />
          </div>

          <button onClick={generate} disabled={!text.trim() || loading}
            className="w-full bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 text-white font-semibold py-3 rounded-xl transition-colors">
            {loading ? "생성 중..." : "QR 생성"}
          </button>
        </div>

        {/* Hidden canvas for first generation */}
        <canvas ref={hiddenRef} className="hidden" />

        {generated && (
          <div className="mt-5 bg-gray-900 rounded-2xl p-6 flex flex-col items-center gap-4">
            <div className="bg-white p-4 rounded-xl shadow-lg">
              <canvas ref={canvasRef} />
            </div>
            <div className="flex gap-3">
              <button onClick={download}
                className="bg-gray-700 hover:bg-gray-600 px-5 py-2.5 rounded-xl text-sm font-medium transition-colors">
                PNG 다운로드
              </button>
              <button onClick={() => { setText(""); setGenerated(false); }}
                className="bg-gray-800 hover:bg-gray-700 px-5 py-2.5 rounded-xl text-sm font-medium transition-colors text-gray-400">
                초기화
              </button>
            </div>
          </div>
        )}

        <p className="text-center text-xs text-gray-600 mt-10">
          <a href="https://moneystom7.com" className="hover:text-gray-400 transition-colors">← MoneyStom7 홈으로</a>
        </p>
      </div>
    </div>
  );
}

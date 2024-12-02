import { Mic, FileText, Zap, Shield, Ellipsis } from "lucide-react";
import { Button } from "@/components/ui/button";
import DemoVideo from "@/components/Video";
import Link from "next/link";
import { SpeedInsights } from "@vercel/speed-insights/next";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Mic size={32} className="text-likeBlue" />
          <Ellipsis className="text-2xl font-bold text-likeBlue animate-bounce" />
          <FileText size={32} className="text-likeBlue" />
        </div>
      </header>

      <main className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center py-16">
        <div>
          <h1 className="text-5xl font-bold mb-6 text-gray-800">
            Transcribe Audio <br />
            in Seconds
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            AI-powered transcription that turns your audio files into accurate,
            searchable text with one click.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-likeBlue hover:bg-likeBlue/90"
          >
            <Link href="/upload">Start Transcribing</Link>
          </Button>
        </div>
        <div className="relative rounded-xl overflow-hidden size-full shadow-lg border">
          <DemoVideo />
        </div>
      </main>

      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-12 text-gray-800">
            What makes us special?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap size={48} />,
                title: "Lightning Fast",
                desc: "Transcribe hours of audio in minutes",
              },
              {
                icon: <FileText size={48} />,
                title: "Precision Accuracy",
                desc: "Advanced AI ensures near-perfect transcripts",
              },
              {
                icon: <Shield size={48} />,
                title: "Completely Secure",
                desc: "Military-grade encryption protects your files",
              },
            ].map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md">
                <div className="text-[#3A41FD] mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {process.env.NODE_ENV === "production" && <SpeedInsights />}
    </div>
  );
}

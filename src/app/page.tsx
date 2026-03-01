import { Button } from "@/components/ui/button";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold text-gray-600">Welcome to ChatAI!</h1>
      <Button variant="destructive">Start Chatting</Button>
      <p className="mt-4 text-lg text-gray-600">Your AI-powered chat assistant.</p>
    </main>
  );
} 
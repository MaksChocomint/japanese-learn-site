import MainPage from "@/components/Home/MainPage";
import { Suspense } from "react";

export default function Home() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

  return (
    <Suspense>
      <main>
        <MainPage />
      </main>
    </Suspense>
  );
}

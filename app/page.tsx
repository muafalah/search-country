import SearchBar from "@/components/SearchBar";

export default function Home() {
  return (
    <main className="w-screen h-screen flex flex-col gap-8 -mt-20 justify-center items-center">
      <h2 className="font-bold text-black text-4xl md:text-5xl">Country</h2>
      <SearchBar />
    </main>
  );
}

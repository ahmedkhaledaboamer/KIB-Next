import Button from "@/components/button";

export default function Header() {
  return (
    <header className="relative grid grid-cols-1 lg:grid-cols-2 h-svh gap-4">
      <div className="absolute inset-0 bg-black/50 z-10" />
      <video
        src="/header.mp4"
        autoPlay
        muted
        loop
        className="w-full h-full object-cover absolute z-0"
      />
      <div className="container z-20 text-white text-center flex flex-col items-center justify-center gap-4">
        <h1 className="text-4xl md:text-7xl font-bold text-primary">Premium Legal Counsel</h1>
        <h2 className="text-2xl md:text-3xl font-bold text-white">
          Trusted Legal Expertise with a Gold‑Standard
        </h2>
        <div className="flex items-center justify-center gap-4 flex-col lg:flex-row">
          <Button variant="primary" size="lg" className="font-extrabold">
            Book Your Consultation
          </Button>
          <Button variant="secondary" size="lg" className="font-extrabold">
            Explore Our Services
          </Button>
        </div>
      </div>
    </header>
  );
}

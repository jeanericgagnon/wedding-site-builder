import React from 'react';

interface HeroData {
  names: string;
  date: string;
  location: string;
  tagline?: string;
  backgroundImage?: string;
}

interface HeroProps {
  data: HeroData;
  variant: string;
}

export const HeroClassic: React.FC<HeroProps> = ({ data }) => (
  <section
    className="relative h-screen flex items-center justify-center bg-cover bg-center"
    style={{ backgroundImage: data.backgroundImage ? `url(${data.backgroundImage})` : undefined }}
  >
    <div className="absolute inset-0 bg-black/30" />
    <div className="relative z-10 text-center text-white px-4">
      <h1 className="text-6xl md:text-8xl font-serif mb-4">{data.names}</h1>
      <p className="text-2xl md:text-3xl mb-2">{data.date}</p>
      <p className="text-xl md:text-2xl">{data.location}</p>
      {data.tagline && <p className="mt-8 text-lg italic">{data.tagline}</p>}
    </div>
  </section>
);

export const HeroMinimal: React.FC<HeroProps> = ({ data }) => (
  <section className="h-screen flex items-center justify-center bg-neutral-50">
    <div className="text-center px-4">
      <h1 className="text-5xl md:text-7xl font-light mb-6 text-neutral-800">{data.names}</h1>
      <div className="w-24 h-px bg-neutral-400 mx-auto mb-6" />
      <p className="text-xl md:text-2xl text-neutral-600 mb-2">{data.date}</p>
      <p className="text-lg md:text-xl text-neutral-500">{data.location}</p>
    </div>
  </section>
);

export const HeroElegant: React.FC<HeroProps> = ({ data }) => (
  <section
    className="relative h-screen flex items-center justify-center bg-cover bg-center"
    style={{ backgroundImage: data.backgroundImage ? `url(${data.backgroundImage})` : undefined }}
  >
    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/40" />
    <div className="relative z-10 text-center text-white px-4 max-w-4xl">
      <div className="border border-white/30 p-12 backdrop-blur-sm bg-white/10">
        <p className="text-sm tracking-[0.3em] uppercase mb-6">Together with their families</p>
        <h1 className="text-7xl md:text-9xl font-serif mb-8 tracking-tight">{data.names}</h1>
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="h-px w-16 bg-white/50" />
          <p className="text-xl">{data.date}</p>
          <div className="h-px w-16 bg-white/50" />
        </div>
        <p className="text-lg tracking-wide">{data.location}</p>
      </div>
    </div>
  </section>
);

export const HeroModern: React.FC<HeroProps> = ({ data }) => (
  <section className="h-screen grid md:grid-cols-2">
    <div
      className="bg-cover bg-center"
      style={{ backgroundImage: data.backgroundImage ? `url(${data.backgroundImage})` : undefined }}
    />
    <div className="bg-neutral-900 text-white flex items-center justify-center p-12">
      <div className="max-w-md">
        <h1 className="text-6xl md:text-7xl font-bold mb-8 leading-tight">{data.names}</h1>
        <div className="space-y-4 text-lg">
          <p className="flex items-baseline gap-2">
            <span className="text-neutral-400 text-sm uppercase tracking-wider">Date</span>
            <span>{data.date}</span>
          </p>
          <p className="flex items-baseline gap-2">
            <span className="text-neutral-400 text-sm uppercase tracking-wider">Location</span>
            <span>{data.location}</span>
          </p>
        </div>
        {data.tagline && <p className="mt-8 text-neutral-300 italic">{data.tagline}</p>}
      </div>
    </div>
  </section>
);

export const HeroRomantic: React.FC<HeroProps> = ({ data }) => (
  <section
    className="relative h-screen flex items-center justify-center bg-cover bg-center"
    style={{ backgroundImage: data.backgroundImage ? `url(${data.backgroundImage})` : undefined }}
  >
    <div className="absolute inset-0 bg-rose-900/20" />
    <div className="relative z-10 text-center text-white px-4">
      <div className="mb-8">
        <svg className="w-16 h-16 mx-auto text-rose-300" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
        </svg>
      </div>
      <h1 className="text-5xl md:text-7xl font-serif mb-6 text-shadow-lg">{data.names}</h1>
      {data.tagline && <p className="text-xl md:text-2xl mb-8 font-light italic">{data.tagline}</p>}
      <div className="inline-block bg-white/10 backdrop-blur-sm px-8 py-4 rounded-full">
        <p className="text-lg mb-1">{data.date}</p>
        <p className="text-sm text-rose-200">{data.location}</p>
      </div>
    </div>
  </section>
);

export const HeroSection: React.FC<HeroProps> = ({ variant, data }) => {
  switch (variant) {
    case 'minimal': return <HeroMinimal data={data} variant={variant} />;
    case 'elegant': return <HeroElegant data={data} variant={variant} />;
    case 'modern': return <HeroModern data={data} variant={variant} />;
    case 'romantic': return <HeroRomantic data={data} variant={variant} />;
    default: return <HeroClassic data={data} variant={variant} />;
  }
};

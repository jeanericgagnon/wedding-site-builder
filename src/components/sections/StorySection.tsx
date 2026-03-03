import React from 'react';

interface StoryCouple {
  name: string;
  story: string;
  image?: string;
}

interface StoryData {
  title: string;
  couples: StoryCouple[];
}

interface StoryProps {
  data: StoryData;
  variant: string;
}

export const StoryClassic: React.FC<StoryProps> = ({ data }) => (
  <section className="py-20 px-4 bg-white">
    <div className="max-w-6xl mx-auto">
      <h2 className="text-4xl md:text-5xl font-serif text-center mb-16">{data.title}</h2>
      <div className="grid md:grid-cols-2 gap-12">
        {data.couples.map((couple, idx) => (
          <div key={idx} className="text-center">
            {couple.image && (
              <img
                src={couple.image}
                alt={couple.name}
                className="w-48 h-48 rounded-full object-cover mx-auto mb-6"
              />
            )}
            <h3 className="text-2xl font-serif mb-4">{couple.name}</h3>
            <p className="text-neutral-600 leading-relaxed">{couple.story}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export const StoryMinimal: React.FC<StoryProps> = ({ data }) => (
  <section className="py-24 px-4 bg-neutral-50">
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-light text-center mb-20 tracking-wide">{data.title}</h2>
      <div className="space-y-16">
        {data.couples.map((couple, idx) => (
          <div key={idx} className={`flex flex-col ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 items-center`}>
            {couple.image && (
              <img
                src={couple.image}
                alt={couple.name}
                className="w-64 h-80 object-cover"
              />
            )}
            <div className="flex-1">
              <h3 className="text-xl font-light mb-4 text-neutral-400">{couple.name}</h3>
              <p className="text-neutral-700 text-lg leading-relaxed">{couple.story}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export const StoryElegant: React.FC<StoryProps> = ({ data }) => (
  <section className="py-24 px-4 bg-gradient-to-b from-white to-neutral-50">
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-16">
        <div className="inline-block">
          <h2 className="text-4xl md:text-5xl font-serif mb-4">{data.title}</h2>
          <div className="h-px bg-neutral-300" />
        </div>
      </div>
      <div className="space-y-20">
        {data.couples.map((couple, idx) => (
          <div key={idx} className="relative">
            <div className={`flex flex-col ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 items-center`}>
              {couple.image && (
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-neutral-200 to-neutral-300 transform translate-x-4 translate-y-4" />
                  <img
                    src={couple.image}
                    alt={couple.name}
                    className="relative w-80 h-96 object-cover"
                  />
                </div>
              )}
              <div className="flex-1 max-w-md">
                <h3 className="text-3xl font-serif mb-6 text-neutral-800">{couple.name}</h3>
                <p className="text-neutral-600 text-lg leading-relaxed italic">{couple.story}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export const StoryModern: React.FC<StoryProps> = ({ data }) => (
  <section className="py-24 px-4 bg-neutral-900 text-white">
    <div className="max-w-6xl mx-auto">
      <h2 className="text-4xl md:text-5xl font-bold mb-20">{data.title}</h2>
      <div className="grid md:grid-cols-2 gap-16">
        {data.couples.map((couple, idx) => (
          <div key={idx} className="space-y-6">
            {couple.image && (
              <img
                src={couple.image}
                alt={couple.name}
                className="w-full h-96 object-cover"
              />
            )}
            <div className="border-l-4 border-white pl-6">
              <h3 className="text-2xl font-bold mb-4">{couple.name}</h3>
              <p className="text-neutral-300 leading-relaxed">{couple.story}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export const StorySection: React.FC<StoryProps> = ({ variant, data }) => {
  switch (variant) {
    case 'minimal': return <StoryMinimal data={data} variant={variant} />;
    case 'elegant': return <StoryElegant data={data} variant={variant} />;
    case 'modern': return <StoryModern data={data} variant={variant} />;
    default: return <StoryClassic data={data} variant={variant} />;
  }
};

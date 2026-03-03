import React from 'react';

interface TimelineEvent {
  date: string;
  title: string;
  description: string;
}

interface TimelineData {
  title: string;
  events: TimelineEvent[];
}

interface TimelineProps {
  data: TimelineData;
  variant: string;
}

export const TimelineClassic: React.FC<TimelineProps> = ({ data }) => (
  <section className="py-20 px-4 bg-white">
    <div className="max-w-4xl mx-auto">
      <h2 className="text-4xl md:text-5xl font-serif text-center mb-20">{data.title}</h2>
      <div className="relative">
        <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-neutral-200" />
        {data.events.map((event, idx) => (
          <div key={idx} className={`relative flex items-center mb-16 ${idx % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
            <div className={`w-1/2 ${idx % 2 === 0 ? 'pr-12 text-right' : 'pl-12 text-left'}`}>
              <div className="inline-block bg-white px-6 py-4 rounded-lg shadow-md">
                <p className="text-sm text-neutral-500 mb-1">{event.date}</p>
                <h3 className="text-xl font-serif mb-2">{event.title}</h3>
                <p className="text-neutral-600">{event.description}</p>
              </div>
            </div>
            <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-neutral-800 border-4 border-white" />
            <div className="w-1/2" />
          </div>
        ))}
      </div>
    </div>
  </section>
);

export const TimelineVertical: React.FC<TimelineProps> = ({ data }) => (
  <section className="py-20 px-4 bg-neutral-50">
    <div className="max-w-3xl mx-auto">
      <h2 className="text-4xl font-light text-center mb-16">{data.title}</h2>
      <div className="space-y-8">
        {data.events.map((event, idx) => (
          <div key={idx} className="flex gap-6 group">
            <div className="flex-none w-32 text-right">
              <p className="text-sm text-neutral-400 font-medium">{event.date}</p>
            </div>
            <div className="relative flex-none">
              <div className="w-3 h-3 rounded-full bg-neutral-800 mt-1.5 group-hover:scale-150 transition-transform" />
              {idx < data.events.length - 1 && (
                <div className="absolute top-6 left-1/2 transform -translate-x-px w-0.5 h-full bg-neutral-200" />
              )}
            </div>
            <div className="flex-1 pb-8">
              <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
              <p className="text-neutral-600">{event.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export const TimelineModern: React.FC<TimelineProps> = ({ data }) => (
  <section className="py-24 px-4 bg-neutral-900 text-white">
    <div className="max-w-6xl mx-auto">
      <h2 className="text-4xl md:text-5xl font-bold mb-20">{data.title}</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {data.events.map((event, idx) => (
          <div key={idx} className="relative group">
            <div className="absolute -top-4 -left-4 text-8xl font-bold text-white/5 group-hover:text-white/10 transition-colors">
              {(idx + 1).toString().padStart(2, '0')}
            </div>
            <div className="relative bg-neutral-800 p-6 hover:bg-neutral-700 transition-colors">
              <p className="text-sm text-neutral-400 mb-3">{event.date}</p>
              <h3 className="text-xl font-bold mb-3">{event.title}</h3>
              <p className="text-neutral-300 text-sm">{event.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export const TimelineSection: React.FC<TimelineProps> = ({ variant, data }) => {
  switch (variant) {
    case 'vertical': return <TimelineVertical data={data} variant={variant} />;
    case 'modern': return <TimelineModern data={data} variant={variant} />;
    default: return <TimelineClassic data={data} variant={variant} />;
  }
};

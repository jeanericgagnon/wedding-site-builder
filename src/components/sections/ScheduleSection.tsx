import React from 'react';
import { Clock } from 'lucide-react';

interface ScheduleEvent {
  time: string;
  title: string;
  location: string;
  description?: string;
}

interface ScheduleData {
  title: string;
  date: string;
  events: ScheduleEvent[];
}

interface ScheduleProps {
  data: ScheduleData;
  variant: string;
}

export const ScheduleClassic: React.FC<ScheduleProps> = ({ data }) => (
  <section className="py-20 px-4 bg-white">
    <div className="max-w-4xl mx-auto">
      <h2 className="text-4xl md:text-5xl font-serif text-center mb-4">{data.title}</h2>
      <p className="text-center text-neutral-600 mb-16">{data.date}</p>
      <div className="space-y-8">
        {data.events.map((event, idx) => (
          <div key={idx} className="flex gap-8 items-start">
            <div className="flex-none w-24 text-right">
              <p className="text-2xl font-serif">{event.time}</p>
            </div>
            <div className="flex-1 border-l-2 border-neutral-200 pl-8 pb-8">
              <h3 className="text-2xl font-serif mb-2">{event.title}</h3>
              <p className="text-neutral-600 mb-2">{event.location}</p>
              {event.description && (
                <p className="text-neutral-500">{event.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export const ScheduleCards: React.FC<ScheduleProps> = ({ data }) => (
  <section className="py-20 px-4 bg-neutral-50">
    <div className="max-w-6xl mx-auto">
      <h2 className="text-4xl font-light text-center mb-4">{data.title}</h2>
      <p className="text-center text-neutral-600 mb-16">{data.date}</p>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {data.events.map((event, idx) => (
          <div key={idx} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-neutral-600" />
              <p className="text-lg font-semibold">{event.time}</p>
            </div>
            <h3 className="text-xl font-serif mb-2">{event.title}</h3>
            <p className="text-sm text-neutral-600">{event.location}</p>
            {event.description && (
              <p className="text-sm text-neutral-500 mt-3">{event.description}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  </section>
);

export const ScheduleModern: React.FC<ScheduleProps> = ({ data }) => (
  <section className="py-24 px-4 bg-neutral-900 text-white">
    <div className="max-w-5xl mx-auto">
      <h2 className="text-4xl font-bold mb-4">{data.title}</h2>
      <p className="text-neutral-400 mb-16">{data.date}</p>
      <div className="space-y-1">
        {data.events.map((event, idx) => (
          <div key={idx} className="group bg-neutral-800 hover:bg-neutral-700 p-6 transition-colors">
            <div className="flex items-start justify-between gap-8">
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-2">{event.title}</h3>
                <p className="text-neutral-300">{event.location}</p>
                {event.description && (
                  <p className="text-neutral-400 text-sm mt-2">{event.description}</p>
                )}
              </div>
              <div className="flex-none text-right">
                <p className="text-3xl font-bold">{event.time}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export const ScheduleSection: React.FC<ScheduleProps> = ({ variant, data }) => {
  switch (variant) {
    case 'cards': return <ScheduleCards data={data} variant={variant} />;
    case 'modern': return <ScheduleModern data={data} variant={variant} />;
    default: return <ScheduleClassic data={data} variant={variant} />;
  }
};

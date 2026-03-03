import React from 'react';
import { MapPin } from 'lucide-react';

interface LocationData {
  title: string;
  venueName: string;
  address: string;
  description?: string;
  mapUrl?: string;
  image?: string;
}

interface LocationProps {
  data: LocationData;
  variant: string;
}

export const LocationClassic: React.FC<LocationProps> = ({ data }) => (
  <section className="py-20 px-4 bg-white">
    <div className="max-w-5xl mx-auto">
      <h2 className="text-4xl md:text-5xl font-serif text-center mb-16">{data.title}</h2>
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h3 className="text-3xl font-serif mb-4">{data.venueName}</h3>
          <div className="flex items-start gap-2 mb-6">
            <MapPin className="w-5 h-5 text-neutral-600 mt-1 flex-none" />
            <p className="text-neutral-600">{data.address}</p>
          </div>
          {data.description && (
            <p className="text-neutral-700 leading-relaxed mb-6">{data.description}</p>
          )}
          <button className="bg-neutral-900 text-white px-6 py-3 rounded hover:bg-neutral-800 transition-colors">
            Get Directions
          </button>
        </div>
        <div>
          {data.image ? (
            <img src={data.image} alt={data.venueName} className="w-full h-96 object-cover rounded-lg" />
          ) : (
            <div className="w-full h-96 bg-neutral-200 rounded-lg" />
          )}
        </div>
      </div>
    </div>
  </section>
);

export const LocationMinimal: React.FC<LocationProps> = ({ data }) => (
  <section className="py-24 px-4 bg-neutral-50">
    <div className="max-w-3xl mx-auto text-center">
      <h2 className="text-3xl font-light mb-12">{data.title}</h2>
      <div className="bg-white p-12 shadow-sm">
        <h3 className="text-2xl font-light mb-2">{data.venueName}</h3>
        <p className="text-neutral-600 mb-6">{data.address}</p>
        {data.description && (
          <p className="text-neutral-700 mb-8 max-w-md mx-auto">{data.description}</p>
        )}
        <div className="inline-flex items-center gap-2 text-neutral-800 hover:text-neutral-600 transition-colors cursor-pointer">
          <MapPin className="w-4 h-4" />
          <span className="text-sm uppercase tracking-wider">View Map</span>
        </div>
      </div>
    </div>
  </section>
);

export const LocationModern: React.FC<LocationProps> = ({ data }) => (
  <section className="py-0">
    <div className="grid md:grid-cols-2">
      <div className="bg-neutral-900 text-white p-12 md:p-20 flex items-center">
        <div>
          <h2 className="text-4xl font-bold mb-8">{data.title}</h2>
          <h3 className="text-2xl mb-4">{data.venueName}</h3>
          <p className="text-neutral-300 mb-6">{data.address}</p>
          {data.description && (
            <p className="text-neutral-400 leading-relaxed mb-8">{data.description}</p>
          )}
          <button className="border-2 border-white text-white px-8 py-3 hover:bg-white hover:text-neutral-900 transition-colors">
            Directions
          </button>
        </div>
      </div>
      <div>
        {data.image ? (
          <img src={data.image} alt={data.venueName} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-neutral-200" />
        )}
      </div>
    </div>
  </section>
);

export const LocationSection: React.FC<LocationProps> = ({ variant, data }) => {
  switch (variant) {
    case 'minimal': return <LocationMinimal data={data} variant={variant} />;
    case 'modern': return <LocationModern data={data} variant={variant} />;
    default: return <LocationClassic data={data} variant={variant} />;
  }
};

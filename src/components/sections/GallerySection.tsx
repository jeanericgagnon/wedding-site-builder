import React from 'react';

interface GalleryImage {
  url: string;
  caption?: string;
}

interface GalleryData {
  title: string;
  images: GalleryImage[];
}

interface GalleryProps {
  data: GalleryData;
  variant: string;
}

export const GalleryClassic: React.FC<GalleryProps> = ({ data }) => (
  <section className="py-20 px-4 bg-neutral-50">
    <div className="max-w-7xl mx-auto">
      <h2 className="text-4xl md:text-5xl font-serif text-center mb-16">{data.title}</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {data.images.map((img, idx) => (
          <div key={idx} className="group relative aspect-square overflow-hidden">
            <img
              src={img.url}
              alt={img.caption || `Gallery image ${idx + 1}`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            {img.caption && (
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                <p className="text-white text-center">{img.caption}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  </section>
);

export const GalleryMasonry: React.FC<GalleryProps> = ({ data }) => (
  <section className="py-20 px-4 bg-white">
    <div className="max-w-7xl mx-auto">
      <h2 className="text-4xl font-light text-center mb-16">{data.title}</h2>
      <div className="columns-2 md:columns-3 gap-4">
        {data.images.map((img, idx) => (
          <div key={idx} className="mb-4 break-inside-avoid">
            <img
              src={img.url}
              alt={img.caption || `Gallery image ${idx + 1}`}
              className="w-full rounded"
            />
            {img.caption && (
              <p className="text-sm text-neutral-500 mt-2 px-1">{img.caption}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  </section>
);

export const GalleryElegant: React.FC<GalleryProps> = ({ data }) => (
  <section className="py-24 px-4 bg-neutral-900">
    <div className="max-w-7xl mx-auto">
      <h2 className="text-4xl md:text-5xl font-serif text-center mb-20 text-white">{data.title}</h2>
      <div className="grid md:grid-cols-2 gap-8">
        {data.images.map((img, idx) => (
          <div key={idx} className="relative group">
            <div className="relative overflow-hidden">
              <img
                src={img.url}
                alt={img.caption || `Gallery image ${idx + 1}`}
                className="w-full h-96 object-cover transition-all duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            {img.caption && (
              <p className="absolute bottom-0 left-0 right-0 text-white p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                {img.caption}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  </section>
);

export const GalleryCarousel: React.FC<GalleryProps> = ({ data }) => (
  <section className="py-20 px-4 bg-white">
    <div className="max-w-5xl mx-auto">
      <h2 className="text-4xl font-serif text-center mb-16">{data.title}</h2>
      <div className="relative">
        <div className="overflow-x-auto flex gap-6 snap-x snap-mandatory pb-4 scrollbar-hide">
          {data.images.map((img, idx) => (
            <div key={idx} className="flex-none w-4/5 md:w-2/3 snap-center">
              <img
                src={img.url}
                alt={img.caption || `Gallery image ${idx + 1}`}
                className="w-full h-96 object-cover rounded-lg"
              />
              {img.caption && (
                <p className="text-center mt-4 text-neutral-600">{img.caption}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export const GallerySection: React.FC<GalleryProps> = ({ variant, data }) => {
  switch (variant) {
    case 'masonry': return <GalleryMasonry data={data} variant={variant} />;
    case 'elegant': return <GalleryElegant data={data} variant={variant} />;
    case 'carousel': return <GalleryCarousel data={data} variant={variant} />;
    default: return <GalleryClassic data={data} variant={variant} />;
  }
};

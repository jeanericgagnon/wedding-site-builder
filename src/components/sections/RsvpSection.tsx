import React from 'react';

interface RsvpData {
  title: string;
  deadline: string;
  message: string;
  fields: string[];
}

interface RsvpProps {
  data: RsvpData;
  variant: string;
}

export const RsvpClassic: React.FC<RsvpProps> = ({ data }) => (
  <section className="py-20 px-4 bg-neutral-50">
    <div className="max-w-2xl mx-auto">
      <h2 className="text-4xl md:text-5xl font-serif text-center mb-6">{data.title}</h2>
      <p className="text-center text-neutral-600 mb-4">{data.message}</p>
      <p className="text-center text-sm text-neutral-500 mb-12">Deadline: {data.deadline}</p>
      <form className="bg-white p-8 rounded-lg shadow-md space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Full Name</label>
          <input type="text" className="w-full border border-neutral-300 rounded px-4 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Email</label>
          <input type="email" className="w-full border border-neutral-300 rounded px-4 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Number of Guests</label>
          <select className="w-full border border-neutral-300 rounded px-4 py-2">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Dietary Restrictions</label>
          <textarea className="w-full border border-neutral-300 rounded px-4 py-2 h-24" />
        </div>
        <button type="submit" className="w-full bg-neutral-900 text-white py-3 rounded hover:bg-neutral-800 transition-colors">
          Submit RSVP
        </button>
      </form>
    </div>
  </section>
);

export const RsvpMinimal: React.FC<RsvpProps> = ({ data }) => (
  <section className="py-24 px-4 bg-white">
    <div className="max-w-xl mx-auto">
      <h2 className="text-3xl font-light text-center mb-8">{data.title}</h2>
      <p className="text-center text-neutral-600 mb-2">{data.message}</p>
      <p className="text-center text-xs text-neutral-400 mb-12 uppercase tracking-wider">By {data.deadline}</p>
      <form className="space-y-4">
        <input type="text" placeholder="Your Name" className="w-full border-b border-neutral-300 py-3 focus:border-neutral-900 outline-none transition-colors" />
        <input type="email" placeholder="Email Address" className="w-full border-b border-neutral-300 py-3 focus:border-neutral-900 outline-none transition-colors" />
        <input type="number" placeholder="Number of Guests" className="w-full border-b border-neutral-300 py-3 focus:border-neutral-900 outline-none transition-colors" />
        <textarea placeholder="Message or Dietary Requirements" className="w-full border-b border-neutral-300 py-3 h-24 focus:border-neutral-900 outline-none transition-colors resize-none" />
        <button type="submit" className="w-full border border-neutral-900 text-neutral-900 py-3 mt-8 hover:bg-neutral-900 hover:text-white transition-colors">
          Confirm Attendance
        </button>
      </form>
    </div>
  </section>
);

export const RsvpModern: React.FC<RsvpProps> = ({ data }) => (
  <section className="py-24 px-4 bg-neutral-900 text-white">
    <div className="max-w-3xl mx-auto">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">{data.title}</h2>
          <p className="text-neutral-300 mb-4">{data.message}</p>
          <div className="inline-block bg-white/10 px-4 py-2 rounded">
            <p className="text-sm">Deadline: {data.deadline}</p>
          </div>
        </div>
        <form className="space-y-4">
          <input type="text" placeholder="Name" className="w-full bg-white/10 border border-white/20 rounded px-4 py-3 text-white placeholder:text-neutral-400" />
          <input type="email" placeholder="Email" className="w-full bg-white/10 border border-white/20 rounded px-4 py-3 text-white placeholder:text-neutral-400" />
          <select className="w-full bg-white/10 border border-white/20 rounded px-4 py-3 text-white">
            <option>Number of Guests</option>
            <option>1</option>
            <option>2</option>
          </select>
          <button type="submit" className="w-full bg-white text-neutral-900 py-3 rounded font-semibold hover:bg-neutral-100 transition-colors">
            Submit
          </button>
        </form>
      </div>
    </div>
  </section>
);

export const RsvpSection: React.FC<RsvpProps> = ({ variant, data }) => {
  switch (variant) {
    case 'minimal': return <RsvpMinimal data={data} variant={variant} />;
    case 'modern': return <RsvpModern data={data} variant={variant} />;
    default: return <RsvpClassic data={data} variant={variant} />;
  }
};

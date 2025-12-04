import {
  Music,
  Mountain,
  Gamepad2,
  Utensils,
  Camera,
  Laptop,
  ArrowRight,
} from 'lucide-react';

const EventCategory = () => {
  const categories = [
    {
      id: 1,
      name: 'Music',
      icon: <Music size={24} />,
      color: 'bg-purple-100 text-purple-600',
    },
    {
      id: 2,
      name: 'Sports',
      icon: (
        <div className='w-6 h-6 rounded-full border-2 border-current flex items-center justify-center text-xs font-bold'>
          S
        </div>
      ),
      color: 'bg-blue-100 text-blue-600',
    },
    {
      id: 3,
      name: 'Hiking',
      icon: <Mountain size={24} />,
      color: 'bg-green-100 text-green-600',
    },
    {
      id: 4,
      name: 'Gaming',
      icon: <Gamepad2 size={24} />,
      color: 'bg-red-100 text-red-600',
    },
    {
      id: 5,
      name: 'Tech',
      icon: <Laptop size={24} />,
      color: 'bg-indigo-100 text-indigo-600',
    },
    {
      id: 6,
      name: 'Dining',
      icon: <Utensils size={24} />,
      color: 'bg-orange-100 text-orange-600',
    },
    {
      id: 7,
      name: 'Art',
      icon: <Camera size={24} />,
      color: 'bg-pink-100 text-pink-600',
    },
  ];

  return (
    <section className='py-10 bg-white'>
      <div className='container-custom'>
        <div className='flex justify-between items-end mb-12'>
          <div>
            <h2 className='text-3xl md:text-4xl font-bold mb-3'>
              Explore Activities
            </h2>
            <p className='text-muted-foreground text-lg'>
              Discover communities based on your interests
            </p>
          </div>
          <button className='hidden md:flex items-center gap-2 text-primary font-medium hover:text-primary-dark transition-colors'>
            View all categories <ArrowRight size={18} />
          </button>
        </div>

        <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4'>
          {categories.map((category) => (
            <div
              key={category.id}
              className='group flex flex-col items-center justify-center p-6 rounded-2xl bg-primary/5 border border-transparent hover:border-gray-200 hover:shadow-md transition-all duration-300 cursor-pointer hover:-translate-y-1'
            >
              <div
                className={`w-14 h-14 rounded-full flex items-center justify-center mb-4 ${category.color} transition-transform duration-300 group-hover:scale-110`}
              >
                {category.icon}
              </div>
              <h3 className='font-medium text-muted-foreground group-hover:text-primary transition-colors'>
                {category.name}
              </h3>
            </div>
          ))}
        </div>

        <button className='md:hidden w-full mt-8 py-3 border border-gray-200 rounded-xl text-muted-foreground font-medium hover:bg-gray-50 transition-colors'>
          View all categories
        </button>
      </div>
    </section>
  );
};

export default EventCategory;

import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';

const CommunitySideBar = ({ className }: { className?: string }) => {
  return (
    <div className={`space-y-6 lg:mt-15 ${className}`}>
      <div className='rounded-xl border bg-white p-6 shadow-sm'>
        <h3 className='mb-4 text-lg font-bold text-slate-900'>
          Community Discussions
        </h3>
        <div className='space-y-4'>
          {[1, 2, 3].map((i) => (
            <div key={i} className='flex gap-3'>
              <div className='h-10 w-10 shrink-0 rounded-full bg-slate-100 flex items-center justify-center'>
                <MessageSquare className='h-5 w-5 text-slate-500' />
              </div>
              <div>
                <p className='text-sm font-medium text-slate-900 hover:text-emerald-600 cursor-pointer'>
                  Best gear for beginner hikers?
                </p>
                <p className='text-xs text-slate-500'>
                  Posted 2 hours ago • 15 replies
                </p>
              </div>
            </div>
          ))}
        </div>
        <Button variant='outline' className='mt-6 w-full'>
          View All Discussions
        </Button>
      </div>

      <div className='rounded-xl bg-emerald-50 p-6 border border-emerald-100'>
        <h3 className='mb-2 text-lg font-bold text-emerald-900'>
          Join this Community
        </h3>
        <p className='mb-4 text-sm text-emerald-700'>
          Get notified about new events, join discussions, and meet people with
          similar interests.
        </p>
        <Button className='w-full bg-emerald-600 hover:bg-emerald-700'>
          Join Now
        </Button>
      </div>
    </div>
  );
};

export default CommunitySideBar;

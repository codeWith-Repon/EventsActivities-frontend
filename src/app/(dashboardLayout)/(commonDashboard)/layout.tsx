import { UserContextProvider } from '@/context/UserContext';

const CommonLayoutForEvents = ({ children }: { children: React.ReactNode }) => {
  return <UserContextProvider>{children}</UserContextProvider>;
};

export default CommonLayoutForEvents;

import { UserContextProvider } from '@/context/UserContext';

const layout = ({ children }: { children: React.ReactNode }) => {
  return <UserContextProvider>{children}</UserContextProvider>;
};

export default layout;

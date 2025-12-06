'use client';

import { getUserInfo } from '@/services/auth/getUserInfo';
import { IUserInfo } from '@/types/user.interface';
import { createContext, ReactNode, useEffect, useState } from 'react';

interface UserContextType {
  user: IUserInfo | null;
  setUser: (user: IUserInfo | null) => void;
  loading: boolean;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUserInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      const res = await getUserInfo();
      setUser(res?.data || null);
      setLoading(false);
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};

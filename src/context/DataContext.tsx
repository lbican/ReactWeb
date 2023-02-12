import React, { createContext, ReactElement, useState } from 'react';
import { pb } from '../utils/database.utils';

export interface User {
  id: string
  username: string
  email: string
  name: string
  admin: boolean
  avatar: string
}

export interface DataContextType {
  user?: User
  login: (authorizedUser: any, rememberUser: boolean) => void
  update: (user: User) => void
  logout: () => void
}

export const DataContext = createContext<DataContextType>({} as DataContextType);

export const UserProvider = (props: { children?: ReactElement }): ReactElement => {
  let remember = false;
  const getUser = (): User | undefined => {
    if (sessionStorage.getItem('user')) {
      return { ...JSON.parse(sessionStorage.getItem('user') ?? '') };
    }

    if (localStorage.getItem('user')) {
      return { ...JSON.parse(localStorage.getItem('user') ?? '') };
    }

    return undefined;
  };
  const prevUser = getUser();
  const [user, setUser] = useState<User | undefined>(prevUser);

  const { children } = props;

  const login = (authorizedUser: any, rememberUser: boolean): void => {
    remember = rememberUser;
    if (rememberUser) {
      localStorage.setItem('user', JSON.stringify(authorizedUser));
    } else {
      sessionStorage.setItem('user', JSON.stringify(authorizedUser));
    }

    setUser(authorizedUser);
  };
  const logout = (): void => {
    localStorage.removeItem('user');
    sessionStorage.removeItem('user');
    setUser(undefined);
  };
  const update = (user: User): void => {
    setUser(user);
    login(user, remember);
  };

  return (
      <DataContext.Provider value={{ user, login, logout, update }}>
        {children}
      </DataContext.Provider>
  );
};

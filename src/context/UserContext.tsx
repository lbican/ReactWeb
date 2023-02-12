import React, { createContext, ReactElement, useState } from 'react';

export interface User {
  id: string
  username: string
  email: string
  name: string
  admin: boolean
  avatar: string
}

export interface UserContextType {
  user?: User
  login: (authorizedUser: any, rememberUser: boolean) => void
  update: (user: User) => void
  logout: () => void
}

export const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = (props: { children?: ReactElement }): ReactElement => {
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
  };

  return (
      <UserContext.Provider value={{ user, login, logout, update }}>
        {children}
      </UserContext.Provider>
  );
};

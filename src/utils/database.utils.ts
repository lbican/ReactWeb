import PocketBase from 'pocketbase';
export const DATABASE_URL = 'http://127.0.0.1:8090';
export const pb = new PocketBase(DATABASE_URL);

export const getUserAvatar = (id: string | undefined, avatar: string | undefined): string => {
  if (id && avatar) {
    return `${DATABASE_URL}/api/files/_pb_users_auth_/${id}/${avatar}`;
  }

  return '';
};

export interface UserDatabase {
  email: string
  name: string
  avatar?: string
}

export interface RegisterUserDatabase extends UserDatabase{
  password: string
  username: string
  emailVisibility: boolean
  passwordConfirm: string
}

export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem('user') || !!sessionStorage.getItem('user');
};

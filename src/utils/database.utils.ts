import PocketBase from 'pocketbase';
export const DATABASE_URL = 'https://reactweb-88497-default-rtdb.europe-west1.firebasedatabase.app/';
export const pb = new PocketBase('http://127.0.0.1:8090');

export interface User {
  username: string
  email: string
  emailVisibility: boolean
  password: string
  passwordConfirm: string
  name: string
  avatar?: string
}

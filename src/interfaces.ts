export interface loginDataI {
  email: string;
  password: string;
}

export interface fetchedDataI {
  userId: number;
  id: number;
  title: string;
  completed: boolean | string;
}

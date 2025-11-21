export interface IAuthContext<T extends any> {
  username?: string;
  userProfile?: T;
  updateUserProfile: (userProfile: T) => void;
  login: (username: string, password: string) => void;
  logout: () => void;
  //   isAuthenticated: boolean;
  //   isLoading: boolean;
  //   error: string | null;
  //   setError: (error: string | null) => void;
  //   setIsLoading: (isLoading: boolean) => void;
  //   setIsAuthenticated: (isAuthenticated: boolean) => void;
  //   setUserProfile: (userProfile: T) => void;
  //   setUsername: (username: string) => void;
}

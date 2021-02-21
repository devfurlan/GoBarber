import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import api from '../services/api';
import AsyncStorage from '@react-native-community/async-storage';

interface IAuthState {
  token: string;
  user: Object;
}

interface ISignInCredentials {
  email: string;
  password: string;
}

interface IAuthContext {
  user: object;
  loading: boolean;

  signIn(credentials: ISignInCredentials): Promise<void>;

  signOut(): void;
}

const Auth = createContext<IAuthContext>({} as IAuthContext);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<IAuthState>({} as IAuthState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData(): Promise<void> {
      const [token, user] = await AsyncStorage.multiGet([
        '@GoBarber:token',
        '@GoBarber:user',
      ]);

      if (token[1] && user[1]) {
        setData({ token: token[1], user: JSON.parse(user[1]) });
      }

      setLoading(false);
    }

    loadStorageData();
  }, []);

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    await AsyncStorage.multiSet([
      ['@GoBarber:token', token],
      ['@GoBarber:user', JSON.stringify(user)],
    ]);

    setData({ token, user });
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove([
      '@GoBarber:token',
      '@GoBarber:user',
    ]);

    setData({} as IAuthState);
  }, []);

  return (
    <Auth.Provider value={{ user: data.user, loading, signIn, signOut }}>
      {children}
    </Auth.Provider>
  );
};

function useAuth(): IAuthContext {
  const context = useContext(Auth);

  if (!context) {
    throw new Error('useAuth must be used whitin an AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };

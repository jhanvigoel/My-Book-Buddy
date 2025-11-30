import { createContext, useCallback, useState, useEffect, useContext } from "react";
import { axiosPrivate, axiosPublic } from "../api/axios";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const refreshTokens = useCallback(async () => {
    try {
      const { data } = await axiosPublic.post('/refresh-token');
      if (data?.accessToken) {
        setAccessToken(data.accessToken);
        // Also update axios default header for immediate subsequent calls
        axiosPrivate.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`;
        return data.accessToken; // return fresh token for immediate use
      }
      setAccessToken(null);
      return null;
    } catch (err) {
      setAccessToken(null);
      return null;
    }
  }, []);

  useEffect(() => {
    (async () => {
      await refreshTokens();
      setLoading(false);
    })();
  }, [refreshTokens]);

  useEffect(() => {
    const reqId = axiosPrivate.interceptors.request.use(
      config => {
        if (accessToken) {
          config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
      },
      error => Promise.reject(error)
    );

    const resId = axiosPrivate.interceptors.response.use(
      res => res,
      async err => {
        const original = err.config;
        if (!original || original._retry) return Promise.reject(err);
        if (err.response && [401, 403].includes(err.response.status)) {
          original._retry = true;
          const newToken = await refreshTokens();
          if (newToken) {
            original.headers['Authorization'] = `Bearer ${newToken}`;
            return axiosPrivate(original);
          }
        }
        return Promise.reject(err);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(reqId);
      axiosPrivate.interceptors.response.eject(resId);
    };
  }, [accessToken, refreshTokens]);

  const login = useCallback(async (email, password) => {
    try {
      const { data } = await axiosPublic.post('/login', { email, password });
      if (data?.accessToken) {
        setAccessToken(data.accessToken);
        axiosPrivate.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`;
        return { success: true };
      }
      return { success: false, error: new Error('No access token returned') };
    } catch (err) {
      return { success: false, error: err };
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await axiosPublic.post('/dashboard/profile');
      return {success: true};
    } catch (err) {
        console.error('Logout error:', err);
        return {success: false, error: err};
    } finally {
      setAccessToken(null);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken, login, logout, refreshTokens, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
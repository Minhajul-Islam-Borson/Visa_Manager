import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

import { profileApi } from "../services/authApi";


interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}


interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (token: string) => Promise<void>;
  logout: () => void;
}


const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);


interface Props {
  children: ReactNode;
}


export const AuthProvider = ({ children }: Props) => {

  const [user, setUser] = useState<User | null>(null);

  const [loading, setLoading] = useState(true);



  // Load logged-in user profile
  const loadProfile = async () => {

    try {

      const res = await profileApi();

      setUser(res.data.data);


    } catch (error) {

      localStorage.removeItem("token");

      setUser(null);


    } finally {

      setLoading(false);

    }
  };



  // Check token when app starts
  useEffect(() => {

    const token = localStorage.getItem("token");


    if(token){

      loadProfile();

    }
    else{

      setLoading(false);

    }


  }, []);




  // Login
  const login = async (token: string) => {

    localStorage.setItem(
      "token",
      token
    );


    await loadProfile();

  };




  // Logout
  const logout = () => {


    // Remove JWT token
    localStorage.removeItem(
      "token"
    );


    // Clear user data
    setUser(null);


    // Go to login page
    window.location.href = "/";

  };



  return (

    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
      }}
    >

      {children}

    </AuthContext.Provider>

  );
};




export const useAuth = () => {

  const context = useContext(AuthContext);


  if(!context){

    throw new Error(
      "useAuth must be used inside AuthProvider"
    );

  }


  return context;

};
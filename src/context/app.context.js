import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../config';

const UserContext = createContext();

const UserProviderWrapper = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getData = async () => {
      let response = await axios.get(`${API_URL}/categories`, {
        withCredentials: true,
      });
      setCategories(response.data);
    };

    getData();
  }, []);

  return (
    <UserContext.Provider
      value={{
        categories,
        setCategories,
        user,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProviderWrapper };

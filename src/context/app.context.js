import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../config';

const UserContext = createContext();

const UserProviderWrapper = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [fetchingUser, setFetchingUser] = useState(true);
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

  //we make the user requst here to know if the user is logged in or not
  useEffect(() => {
    const getUserData = async () => {
      try {
        let userResponse = await axios.get(`${API_URL}/user`, {
          withCredentials: true,
        });
        setFetchingUser(false);
        setUser(userResponse.data);
      } catch (err) {
        // the request will fail if the user is not logged in
        setFetchingUser(false);
      }
    };
    getUserData();
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

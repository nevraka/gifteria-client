import { createContext, useState } from 'react';

const UserContext = createContext();

const UserProviderWrapper = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [categoryItems, setCategoryItems] = useState([]);
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider
      value={{
        categories,
        setCategories,
        products,
        setProducts,
        categoryItems,
        setCategoryItems,
        user,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProviderWrapper };

import { createContext, useState } from "react";

export const UserContext = createContext();
export const PostsContext = createContext();

export const UserProvider = ({ children }) => {
  const [username, setUsername] = useState(" ");
  return (
    <UserContext.Provider value={{ username, setUsername }}>
      {children}
    </UserContext.Provider>
  );
};

export const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  return (
    <PostsContext.Provider value={{ posts, setPosts }}>
      {children}
    </PostsContext.Provider>
  );
};

import { createContext, useContext, useState} from "react";

const UserContext = createContext();
const  UserProvider =  ({children}) => {
    const [user, setUser] = useState(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        return user;
    });
    return (
        <UserContext.Provider value={{user, setUser}}>
         {children}
        </UserContext.Provider>
    )
};

const useUser = () => {
    return  useContext(UserContext);
};
export default UserProvider;
export {useUser};
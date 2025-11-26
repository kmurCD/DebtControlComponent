import * as React from "react";

interface UserContextType {
    userEmail: string;
}

const UserContext = React.createContext<UserContextType | null>(null);

export const UserProvider: React.FC<{ children: React.ReactNode; userEmail: string }> = ({
    children,
    userEmail,
}) => {
    return (
        <UserContext.Provider value={{ userEmail }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = React.useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};

export default UserContext;
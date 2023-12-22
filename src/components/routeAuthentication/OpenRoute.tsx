import { useAuth } from "../../hooks/useAuth";

interface OpenRouteProps {
    children: JSX.Element;
}

export const OpenRoute = ({ children }: OpenRouteProps) => {
    const { user, setUser } = useAuth();

    const parseJwt = (token: String) => {
        try {
            return JSON.parse(atob(token.split(".")[1]));
        } catch (e) {
            ;
        }
    };

    if (user != null) {
        const decodedJwt = parseJwt(user.accessToken);
        if (decodedJwt.exp * 1000 < Date.now()) {
            setUser(null);
            return children;
        }
    }

    return children;
};
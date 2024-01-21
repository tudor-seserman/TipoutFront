import { useAuth } from "../../hooks/useAuth";

interface OpenRouteProps {
    children: JSX.Element;
}

export const OpenRoute = ({ children }: OpenRouteProps) => {
    const { user, timedOutLogout } = useAuth();

    const parseJwt = (token: String) => {
        try {
            return JSON.parse(atob(token.split(".")[1]));
        } catch (e) {
            ;
        }
    };
    console.log(user)
    if (user != null) {
        try {
            console.log("Should not be able to read this.")
            const decodedJwt = parseJwt(user.accessToken);
            if (decodedJwt.exp * 1000 < Date.now()) {
                timedOutLogout();
                return children;
            }
        } catch (e) { console.log(e) }
    }

    return children;
};
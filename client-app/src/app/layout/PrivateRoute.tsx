import { Redirect, Route, RouteComponentProps, RouteProps, useLocation } from "react-router-dom";
import { useStore } from "../stores/store";

interface Props extends RouteProps {
    component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
}

export default function PrivateRoute({component: Component, ...rest}: Props) {
    const { pathname } = useLocation();    

    const {userStore: {isLoggedIn, user}} = useStore();
    return (
        <Route 
            {...rest}
            render={(props) => isLoggedIn && user?.role.toLowerCase() === pathname.split('/')[1] ? <Component {...props} /> : <Redirect to={`/${user?.role.toLowerCase()}`} />}
        />
    )
}
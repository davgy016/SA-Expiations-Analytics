import { useOutletContext, Navigate } from 'react-router-dom'

//Ref: https://dev.to/miracool/how-to-manage-user-authentication-with-react-js-3ic5
function AuthRoute({ children }) {
    const { user } = useOutletContext();    

    if (!user) {
        return <Navigate to="/Login"></Navigate>;
    }
    return children;
}

export default AuthRoute;
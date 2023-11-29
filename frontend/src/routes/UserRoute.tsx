import { TOKEN, UNAUTHENTICATED_ENTRY, AUTHENTICATED_ADMIN_ENTRY } from 'constants/AppConstants'
import { useAppDispatch, useAppSelector } from 'hooks/reduxHooks'
import { FC } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { changeUserId, changeUserRole } from 'slices/userSlice'
import { IJwtClaims, IToken } from 'types/authentication_types'
import { UserRole } from 'types/user_types'
import { jwtDecode } from 'jwt-decode';


const UserRoute: FC = () => {
    const dispatch = useAppDispatch();
    const token = localStorage.getItem(TOKEN)
    const { role } = useAppSelector(state => state.user)
    
    if (token)
    {        
        const parsedToken: IToken = JSON.parse(token) as IToken;

        if (parsedToken) {
            const decodedToken: IJwtClaims = jwtDecode<IJwtClaims>(parsedToken.accessToken);
            
            if (decodedToken) {
                let userRole: UserRole = UserRole.USER;

                if (decodedToken.role === 'admin') {
                    userRole = UserRole.ADMIN
                }

                dispatch(changeUserId(decodedToken.userId))
                dispatch(changeUserRole(userRole))
            }
        }

        if (role) 
        {
            if (role === UserRole.ADMIN) 
            {
                return <Navigate replace to={AUTHENTICATED_ADMIN_ENTRY} />
            }
            else
            {
                return <Outlet />
            }
        }
        else
        {
            return <Navigate to={UNAUTHENTICATED_ENTRY} replace />
        }
    }
    else
    {
        return <Navigate to={UNAUTHENTICATED_ENTRY} replace />
    }
}

export default UserRoute

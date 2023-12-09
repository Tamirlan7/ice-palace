import { AUTHENTICATED_USER_ENTRY, UNAUTHENTICATED_ENTRY } from 'constants/AppConstants'
import { useAppDispatch, useAppSelector } from 'hooks/reduxHooks'
import { FC } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { getUserThunk} from 'slices/userSlice'
import { UserRole } from 'types/user_types'


const AdminRoute: FC = () => {
    const { role } = useAppSelector(state => state.user)

    if (role)
    {
        if (role === UserRole.USER)
        {
            return <Navigate replace to={AUTHENTICATED_USER_ENTRY} />
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

export default AdminRoute

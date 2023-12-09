import { UNAUTHENTICATED_ENTRY, AUTHENTICATED_ADMIN_ENTRY } from 'constants/AppConstants'
import { useAppDispatch, useAppSelector } from 'hooks/reduxHooks'
import {FC, useEffect} from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { getUserThunk} from 'slices/userSlice'
import { UserRole } from 'types/user_types'


const UserRoute: FC = () => {
    const { role } = useAppSelector(state => state.user)

    if (role != null)
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

export default UserRoute

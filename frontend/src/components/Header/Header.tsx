import React from "react";
import c from './Header.module.scss'
import Menu from "components/Menu/Menu";
import Container from "components/Container/Container";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { HOME_PAGE, UrlPaths } from "constants/AppConstants";
import Button from "UI/Button/Button";
import { useAppDispatch, useAppSelector } from "hooks/reduxHooks";
import { logoutThunk } from "slices/authSlice";


const Header: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const { role } = useAppSelector(state => state.user)


    const navigateToLoginPage = () => {
        navigate(UrlPaths.LOGIN, { state: { from: pathname } })
    }

    const logout = () => {
        dispatch(logoutThunk())
    }

    return (
        <div className={c.header}>
            <Container>
                <div className={c['inner-header']}>
                    <Link to={HOME_PAGE } className={c.logo}>
                        ЛЕДОВЫЙ ДВОРЕЦ   
                    </Link>
                    
                    <nav className={c.nav}>
                        <Menu />
                    </nav>

                    <div className={c['right-side']}>
                        {role === null ? (
                            <Button onClick={() => navigateToLoginPage()}>Войти</Button>
                        ) : (
                            <Button onClick={() => logout()}>Выйти</Button>
                        )}
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default Header;

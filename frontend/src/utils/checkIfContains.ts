import { adminRoutes, userRoutes } from "routes/routes";

export function checkIfPathIsAuthenticated(pathname: string): boolean {
    let isAuthenticatedPath = false;

    [...userRoutes, ...adminRoutes].forEach(element => {
        if (element.path === pathname) {
            isAuthenticatedPath = true;
        }
    });
  
    return isAuthenticatedPath;
}
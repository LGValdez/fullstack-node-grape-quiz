import Cookies from 'js-cookie';
const authTokenKey: string = 'authToken';


class AuthService {

    public static setAuthToken(newToken: string): void {
        if (typeof window !== 'undefined') {
            localStorage.setItem(authTokenKey, newToken)
        }
        Cookies.set(authTokenKey, newToken, { expires: 365, path: '/' })
    }

    public static cleanAuthToken(): void {
        if (typeof window !== 'undefined') {
            localStorage.removeItem(authTokenKey)
        }
        Cookies.remove(authTokenKey)
    }

    public static getAuthToken(): string | undefined {
        if (typeof window !== 'undefined') {
            return localStorage.getItem(authTokenKey) || ""
        }
        return Cookies.get(authTokenKey)
    }

    public static isAuthenticated(): boolean {
        if (typeof window !== 'undefined') {
            return (localStorage.getItem(authTokenKey)) ? true : false
        }
        return (Cookies.get(authTokenKey)) ? true : false
    }

    public static getAuthHeader() {
        const authToken = AuthService.getAuthToken()
        const authHeaders = {
            headers: {
                'Authorization': `Token ${authToken}`
            }
        }
        return authHeaders
    }
}

type ICookies = {
    [key: string]: string
}
class serverAuthService {
    public static isAuthenticated(cookies: ICookies): boolean {
        return (cookies[authTokenKey]) ? true : false
    }

    public static getAuthToken(cookies: ICookies): string | undefined {
        return cookies[authTokenKey]
    }

    public static getAuthHeader(cookies: ICookies) {
        const authToken = serverAuthService.getAuthToken(cookies)
        const authHeaders = {
            headers: {
                'Authorization': `Token ${authToken}`
            }
        }
        return authHeaders
    }
}

export { AuthService, serverAuthService }

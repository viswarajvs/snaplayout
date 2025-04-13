

const decodeJWT = (token: string) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
        atob(base64)
            .split('')
            .map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join('')
    );
    return JSON.parse(jsonPayload);
};
export const isUserLoggedIn = () => {
    const token = localStorage.getItem("google_token");
    if (!token) return null;

    try {
        const decoded: any = decodeJWT(token);
        return decoded;
    } catch (err) {
        return null;
    }
};

export const getUserDetails = () => {
    const decoded = isUserLoggedIn();
    const now = Date.now() / 1000;
    return {
        details: decoded,
        isLoggedIn: decoded?.exp > now
    }
}

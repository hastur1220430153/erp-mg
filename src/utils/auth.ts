const TokenKey = '__token__'

export function getToken(): any {
	return localStorage.getItem(TokenKey)
}

export function setToken(token: string) {
	return localStorage.setItem(TokenKey, token)
}

export function removeToken() {
	return localStorage.removeItem(TokenKey)
}

export function getAxiosDebug() {
	return localStorage.getItem('debug') || null
}

export const API_BASE = process.env.NEXT_PUBLIC_API_URL; 

export const API_ROUTES = {
	AUTH: {
		LOGIN: `${API_BASE}/auth/login`,
		SIGNUP: `${API_BASE}/auth/signup`,
		LOGOUT: `${API_BASE}/auth/logout`,
	},
	VENDOR: {
		ROOT: `${API_BASE}/shops`,
		STATUS: `${API_BASE}/shops/status`,
	},
};

export const APP_ROUTES = {
	HOME: "/",
	LOGIN: "/auth/login",
	SIGNUP: "/auth/signup",
	VENDOR_DASHBOARD: "/vendor",
};

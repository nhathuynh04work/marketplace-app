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
		PRODUCTS: `${API_BASE}/vendor/products`,
		CATEGORIES: `${API_BASE}/vendor/categories`,
	},
	CATEGORIES: {
		ROOT: `${API_BASE}/categories`,
		ROOTS: `${API_BASE}/categories/roots`,
	},
};

export const APP_ROUTES = {
	HOME: "/",
	LOGIN: "/auth/login",
	SIGNUP: "/auth/signup",
	VENDOR_DASHBOARD: "/vendor",
	VENDOR_PRODUCTS: "/vendor/products",
	VENDOR_PRODUCTS_NEW: "/vendor/products/new",
	ACCOUNT: "/account",
};

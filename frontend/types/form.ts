export type FormState = {
	status: "idle" | "success" | "error";
	message: string; 
	fieldErrors?: Record<string, string[] | undefined>; 
	timestamp?: number; 
};

export interface FetchJsonConfig extends RequestInit {}

export interface FetchJsonResponse<T = any> extends Response {
	data?: T;
}

export interface FetchJsonError extends Error {
	response?: FetchJsonResponse;
}

export class FetchJson {
	private baseUrl: string;
	private headers: Headers;

	constructor(baseUrl: string, headers: Headers = new Headers()) {
		this.baseUrl = baseUrl;
		this.headers = headers;
	}

	public async get<T = any>(
		url: string,
		config?: FetchJsonConfig
	): Promise<FetchJsonResponse<T>> {
		const response = await fetch(`${this.baseUrl}${url}`, {
			method: "GET",
			headers: this.headers,
			...config,
		});

		return this.handleResponse<T>(response);
	}

	public async post<T = any>(
		url: string,
		data?: any,
		config?: FetchJsonConfig
	): Promise<FetchJsonResponse<T>> {
		const response = await fetch(`${this.baseUrl}${url}`, {
			method: "POST",
			headers: this.headers,
			body: JSON.stringify(data),
			...config,
		});

		return this.handleResponse<T>(response);
	}

	public async put<T = any>(
		url: string,
		data?: any,
		config?: FetchJsonConfig
	): Promise<FetchJsonResponse<T>> {
		const response = await fetch(`${this.baseUrl}${url}`, {
			method: "PUT",
			headers: this.headers,
			body: JSON.stringify(data),
			...config,
		});

		return this.handleResponse<T>(response);
	}

	public async delete<T = any>(
		url: string,
		config?: FetchJsonConfig
	): Promise<FetchJsonResponse<T>> {
		const response = await fetch(`${this.baseUrl}${url}`, {
			method: "DELETE",
			headers: this.headers,
			...config,
		});

		return this.handleResponse<T>(response);
	}

	private async handleResponse<T>(
		response: Response
	): Promise<FetchJsonResponse<T>> {
		const contentType = response.headers.get("content-type");
		const isJson = contentType?.includes("application/json");

		const data = isJson ? await response.json() : undefined;

		if (response.ok) {
			return { ...response, data };
		} else {
			const error: FetchJsonError = new Error(response.statusText);
			error.response = { ...response, data };
			throw error;
		}
	}
}

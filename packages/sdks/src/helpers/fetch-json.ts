type Query = Record<string, string | number | boolean | undefined | null>;

export interface FetchJsonConfig extends RequestInit {
	query?: Query;
}

export interface FetchJsonResponse<T = any> extends Response {
	data: T;
}

export interface FetchJsonError extends Error {
	response?: FetchJsonResponse;
}

export class FetchJson {
	constructor(
		private baseUrl: string = "",
		private headers: Record<string, string> = {}
	) {}

	public async get<T = any>(
		url: string,
		config?: FetchJsonConfig
	): Promise<FetchJsonResponse<T>> {
		const query = this.getQueryString(config?.query);

		const response = await fetch(`${this.baseUrl}${url}${query}`, {
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
		const query = this.getQueryString(config?.query);

		const response = await fetch(`${this.baseUrl}${url}${query}`, {
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
		const query = this.getQueryString(config?.query);

		const response = await fetch(`${this.baseUrl}${url}${query}`, {
			method: "DELETE",
			headers: this.headers,
			...config,
		});

		return this.handleResponse<T>(response);
	}

	private getQueryString(query?: Query): string {
		if (!query) {
			return "";
		}

		const filteredQuery = Object.entries(query)
			.filter(([_, value]) => value !== undefined && value !== null)
			.reduce((acc, [key, value]) => {
				acc[key] = value!.toString();
				return acc;
			}, {} as Record<string, string>);

		return `?${new URLSearchParams(filteredQuery).toString()}`;
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

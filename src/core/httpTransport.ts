enum METHODS {
	GET = "GET",
	POST = "POST",
	PUT = "PUT",
	DELETE = "DELETE",
}
// Тип данных неизвестен
type TData = Record<string, any>;
interface IOptions {
	headers?: Record<string, string>;
	method: METHODS;
	data?: TData;
	timeout?: number | 5000;
}
type TOptionsWithoutMethod = Omit<IOptions, "method">;
type HTTPMethod = <TResponse>(
	url: string,
	options?: TOptionsWithoutMethod
) => Promise<TResponse>;
type TApiUrl = string;

export default class HTTPTransport {
	private apiUrl: TApiUrl = "";

	constructor(apiPath: string) {
		this.apiUrl = `https://ya-praktikum.tech/api/v2${apiPath}`;
	}

	private _queryStringify(data: TData) {
		if (typeof data !== "object") {
			throw new Error("Data must be object");
		}

		return Object.keys(data as XMLHttpRequestBodyInit)
			.map((key) => {
				if (typeof key === "string")
					encodeURIComponent(key) + "=" + encodeURIComponent(data && data[key]);
			})
			.join("&");
	}

	private _request<TResponse>(
		url: string,
		options: IOptions
	): Promise<TResponse> {
		const { headers = {}, method, data, timeout } = options;

		return new Promise((resolve, reject) => {
			if (!method) {
				reject("No method");
				return;
			}

			const xhr = new XMLHttpRequest();
			const urlString =
				method === "GET" && !!data
					? `${url}${this._queryStringify(data)}`
					: url;

			xhr.open(method, urlString);

			Object.keys(headers).forEach((key) =>
				xhr.setRequestHeader(key, headers[key])
			);

			xhr.onload = function () {
				if (xhr.status >= 200 && xhr.status < 300) {
					resolve(xhr.response);
				} else {
					const { error, reason } = JSON.parse(xhr.response);
					reject({
						error,
						reason,
					});
				}
			};

			xhr.onabort = reject;
			xhr.onerror = function () {
				reject({
					status: xhr.status,
					statusText: xhr.statusText,
				});
			};
			xhr.ontimeout = reject;
			if (timeout) xhr.timeout = timeout;

			if (method === METHODS.GET || !data) {
				xhr.send();
			} else {
				console.log(data);
				xhr.send(JSON.stringify(data));
				console.log({ ...data });
			}
		});
	}

	public get: HTTPMethod = (url, options = {}) => {
		const requestProps = {
			...options,
			method: METHODS.GET,
		};
		const requestUrl = `${this.apiUrl}${url}`;
		return this._request(requestUrl, requestProps);
	};

	public post: HTTPMethod = (url, options = {}) => {
		const requestProps = {
			...options,
			method: METHODS.POST,
		};
		const requestUrl = `${this.apiUrl}${url}`;
		return this._request(requestUrl, requestProps);
	};

	public put: HTTPMethod = (url, options = {}) => {
		const requestProps = {
			...options,
			method: METHODS.PUT,
		};
		const requestUrl = `${this.apiUrl}${url}`;
		return this._request(requestUrl, requestProps);
	};

	public delete: HTTPMethod = (url, options = {}) => {
		const requestProps = {
			...options,
			method: METHODS.PUT,
		};
		const requestUrl = `${this.apiUrl}${url}`;
		return this._request(requestUrl, requestProps);
	};
}

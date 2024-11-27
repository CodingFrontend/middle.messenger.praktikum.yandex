enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}
type TUrl = string;
type TData = Record<string, unknown> | Document | XMLHttpRequestBodyInit | null;
interface IOptions {
  headers?: Record<string, string>;
  method: METHODS;
  data?: TData;
}
interface IRequest extends IOptions {
  url: TUrl;
  timeout: number | 5000;
}

export default class HTTPTransport {
  public options: IOptions;

  constructor(options: IOptions) {
    this.options = options;
  }

  private _queryStringify(data: TData) {
    if (typeof data !== 'object') {
      throw new Error('Data must be object');
    }

    // return Object.keys(data as XMLHttpRequestBodyInit)
    //   .map(function (key) {
    //     return (
    //       encodeURIComponent(key) + '=' + encodeURIComponent(data && data[key])
    //     );
    //   })
    //   .join('&');
  }

  private _request = (props: IRequest): Promise<XMLHttpRequest> => {
    const { headers = {}, method, data, url, timeout } = props;

    return new Promise((resolve, reject) => {
      if (!method) {
        reject('No method');
        return;
      }

      const xhr: XMLHttpRequest = new XMLHttpRequest();
      const urlString =
        method === 'GET' && !!data
          ? `${url}${this._queryStringify(data)}`
          : url;

      xhr.open(method, urlString);

      Object.keys(headers).forEach((key) =>
        xhr.setRequestHeader(key, headers[key])
      );

      xhr.onload = function () {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;
      xhr.timeout = timeout;

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else {
        xhr.send(data as XMLHttpRequestBodyInit);
      }
    });
  };

  public get = (url: TUrl, props: IRequest) => {
    const requestProps = {
      ...props,
      url,
      method: METHODS.GET,
    };
    return this._request(requestProps);
  };

  post = (url: TUrl, props: IRequest) => {
    const requestProps = {
      ...props,
      url,
      method: METHODS.POST,
    };
    return this._request(requestProps);
  };

  put = (url: TUrl, props: IRequest) => {
    const requestProps = {
      ...props,
      url,
      method: METHODS.PUT,
    };
    return this._request(requestProps);
  };

  delete = (url: TUrl, props: IRequest) => {
    const requestProps = {
      ...props,
      url,
      method: METHODS.PUT,
    };
    return this._request(requestProps);
  };
}

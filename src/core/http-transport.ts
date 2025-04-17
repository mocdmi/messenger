type Data = Record<string, unknown>;

interface Options extends Partial<XMLHttpRequest> {
    headers?: Record<string, string>;
    timeout?: number;
    data?: Data;
    method?: string;
}

type HTTPMethod = (url: string, options?: Options) => Promise<XMLHttpRequest>;

export default class HttpTransport {
    static METHODS = {
        GET: 'GET',
        PUT: 'PUT',
        POST: 'POST',
        DELETE: 'DELETE',
    } as const;

    private queryStringify(data: Data): string {
        if (typeof data !== 'object' || data === null) {
            throw new Error('Должно быть объектом');
        }

        const props: string[] = [];

        for (const prop in data) {
            if (data[prop] !== null && data[prop] !== undefined) {
                props.push(`${prop}=${encodeURIComponent(data[prop].toString())}`);
            }
        }

        return `?${props.join('&')}`;
    }

    private createMethod(
        method: (typeof HttpTransport.METHODS)[keyof typeof HttpTransport.METHODS],
    ): HTTPMethod {
        return (url: string, options: Options = {}) => this.request(url, { ...options, method });
    }

    get = this.createMethod(HttpTransport.METHODS.GET);

    put = this.createMethod(HttpTransport.METHODS.PUT);

    post = this.createMethod(HttpTransport.METHODS.POST);

    delete = this.createMethod(HttpTransport.METHODS.DELETE);

    private request(url: string, options: Options = {}): Promise<XMLHttpRequest> {
        const { headers = {}, data, method = HttpTransport.METHODS.GET, ...xhrOptions } = options;
        const isGet: boolean = method === HttpTransport.METHODS.GET;

        return new Promise((resolve, reject): void => {
            const xhr = new XMLHttpRequest();

            Object.assign(xhr, xhrOptions);

            xhr.timeout = options.timeout || 5000;
            xhr.open(method, isGet && !!data ? `${url}${this.queryStringify(data)}` : url);

            for (const prop in headers) {
                xhr.setRequestHeader(prop, headers[prop]);
            }

            if (isGet || !data) {
                xhr.send();
            } else {
                const body = data && typeof data === 'object' ? JSON.stringify(data) : data;
                xhr.send(body);
            }

            xhr.onload = () => {
                resolve(xhr);
            };

            xhr.onerror = () => reject('Ошибка соединения');
            xhr.onabort = () => reject('Запрос прерван');
            xhr.ontimeout = () => reject('Таймаут');
        });
    }
}

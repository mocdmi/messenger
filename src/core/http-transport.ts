type Data = Record<string, unknown>;

interface Options extends Partial<XMLHttpRequest> {
    headers?: Record<string, string>;
    timeout?: number;
    data?: Data;
    method?: string;
}

export default class HttpTransport {
    private static METHODS = {
        GET: 'GET',
        PUT: 'PUT',
        POST: 'POST',
        DELETE: 'DELETE',
    };

    private queryStringify(data: Data): string {
        if (typeof data !== 'object' || data === null) {
            throw new Error('Должно быть объектом');
        }

        const props: string[] = [];

        for (const prop in data) {
            props.push(`${prop}=${data[prop]!.toString()}`);
        }

        return `?${props.join('&')}`;
    }

    get(url: string, options: Options = {}): Promise<XMLHttpRequest> {
        return this.request(
            url,
            { ...options, method: HttpTransport.METHODS.GET },
            options.timeout,
        );
    }

    put(url: string, options: Options = {}): Promise<XMLHttpRequest> {
        return this.request(
            url,
            { ...options, method: HttpTransport.METHODS.PUT },
            options.timeout,
        );
    }

    post(url: string, options: Options = {}): Promise<XMLHttpRequest> {
        return this.request(
            url,
            { ...options, method: HttpTransport.METHODS.POST },
            options.timeout,
        );
    }

    delete(url: string, options: Options = {}): Promise<XMLHttpRequest> {
        return this.request(
            url,
            { ...options, method: HttpTransport.METHODS.DELETE },
            options.timeout,
        );
    }

    private request(
        url: string,
        options: Options = {},
        timeout: number = 5000,
    ): Promise<XMLHttpRequest> {
        const { headers = {}, data, method = HttpTransport.METHODS.GET, ...xhrOptions } = options;
        const isGet: boolean = method === HttpTransport.METHODS.GET;

        return new Promise((resolve, reject): void => {
            const xhr = new XMLHttpRequest();

            Object.assign(xhr, xhrOptions);

            xhr.timeout = timeout;
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

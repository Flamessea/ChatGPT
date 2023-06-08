interface RequestOptions extends RequestInit {
  headers: any;
}

class HttpClient {
  private baseUrl: string;
  private headers: Headers;
  private accessToken: string | null;

  constructor(baseUrl?: string) {
    this.baseUrl = baseUrl || "http://localhost:5000";
    this.headers = new Headers();
    this.accessToken = null;
  }

  public setAccessToken(token: string): void {
    this.accessToken = token;
  }

  public async get<T>(url: string, options?: RequestOptions): Promise<T> {
    try {
      const requestOptions = this.prepareRequestOptions(options);
      const response = await fetch(this.baseUrl + url, requestOptions);
      const data: T = await response.json();
      return data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  public async post<T>(
    url: string,
    body?: any,
    options?: RequestOptions
  ): Promise<T> {
    try {
      const requestOptions = this.prepareRequestOptions(options);
      requestOptions.method = "POST";
      requestOptions.body = JSON.stringify(body);
      const response = await fetch(this.baseUrl + url, requestOptions);
      const data: T = await response.json();
      return data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  private prepareRequestOptions(options?: RequestOptions): RequestOptions {
    const requestOptions: RequestOptions = {
      headers: {
        "Content-Type": "application/json",
        ...this.headers,
        ...options?.headers,
      },
      ...options,
    };

    if (this.accessToken) {
      requestOptions.headers["Authorization"] = `Bearer ${this.accessToken}`;
    }

    return requestOptions;
  }

  private handleError(error: any): void {
    console.error("Request error:", error.message);
  }
}

export default HttpClient;

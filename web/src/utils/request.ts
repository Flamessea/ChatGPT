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

  public async get(url: string, options?: RequestOptions): Promise<Response> {
    try {
      const requestOptions = this.prepareRequestOptions(options);
      const response: Response = await fetch(
        this.baseUrl + url,
        requestOptions
      );
      return response;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  public async post(
    url: string,
    body?: any,
    options?: RequestOptions
  ): Promise<Response> {
    try {
      const requestOptions = this.prepareRequestOptions(options);
      requestOptions.method = "POST";
      requestOptions.body = JSON.stringify(body);
      const response: Response = await fetch(
        this.baseUrl + url,
        requestOptions
      );
      return response;
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

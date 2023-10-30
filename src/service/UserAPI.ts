import { User } from "types/model";

const BASE_URL = "http://localhost:8000/api"
export class UserAPI {
    public async login(email: string): Promise<Response> {
      const response = await fetch(
        `${BASE_URL}/login?email=${email}`,
      );
      return await response.json();
    }

    public async register(user: User): Promise<Response> {
      const headers: Headers = new Headers()
      headers.set('Content-Type', 'application/json')
      headers.set('Accept', 'application/json')
      const request: RequestInfo = new Request(`${BASE_URL}/register`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(user)
      });

      return fetch(request)
      .then(res => {
        return res.json()
      })
    }
}
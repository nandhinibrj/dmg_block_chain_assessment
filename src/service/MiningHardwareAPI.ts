import { MiningHardware } from "types/model";

const BASE_URL = "http://localhost:8000/api"
export class MiningHardwareAPI {
    public async getMiningHardwares(): Promise<Response> {
      const response = await fetch(
        `${BASE_URL}/get_mining_hardware_records`,
      );
      return await response.json();
    }

    public async getHashRate(): Promise<Response> {
      const response = await fetch(
        `${BASE_URL}/get_mining_hash_Rate`,
      );
      return await response.json();
    }

    public async createMiningHardware(mining_data: MiningHardware): Promise<Response> {
      const headers: Headers = new Headers()
      headers.set('Content-Type', 'application/json')
      headers.set('Accept', 'application/json')
      const request: RequestInfo = new Request(`${BASE_URL}/create_mining_hardware`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(mining_data)
      });

      return fetch(request)
      .then(res => {
        return res.json()
      })
    }

    public async updateMiningHardware(mining_data: MiningHardware): Promise<Response> {
      const headers: Headers = new Headers()
      headers.set('Content-Type', 'application/json')
      headers.set('Accept', 'application/json')
      const request: RequestInfo = new Request(`${BASE_URL}/update_mining_hardware`, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(mining_data)
      });
      return fetch(request)
      .then(res => {
        return res.json()
      })
    }

    public async deleteMiningHardware(mining_id: number): Promise<Response> {
      const headers: Headers = new Headers()
      headers.set('Content-Type', 'application/json')
      headers.set('Accept', 'application/json')
      const request: RequestInfo = new Request(`${BASE_URL}/delete_mining_hardware`, {
        method: 'DELETE',
        headers: headers,
        body: JSON.stringify({id: mining_id})
      });
      return fetch(request)
      .then(res => {
        return res.json()
      })
    }
}
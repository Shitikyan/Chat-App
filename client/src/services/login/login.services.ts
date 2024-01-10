import ApiBase from '../ApiBase';
import { APIResponseLogin } from '../types';

class LoginService {
  private apiBase: ApiBase<any>;

  constructor() {
    this.apiBase = new ApiBase();
  }

  public async signup(
    url: string,
    values: { username: string; password: string },
  ): Promise<APIResponseLogin> {
    try {
      const data = await this.apiBase.postAsync(url, values);
console.log(data, 'datadatadata');

      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
}

export default LoginService;

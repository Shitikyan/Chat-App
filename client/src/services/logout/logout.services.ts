import ApiBase from '../ApiBase';
import { APIResponseLogout } from '../types';

class LogoutService {
  private apiBase: ApiBase<any>;

  constructor() {
    this.apiBase = new ApiBase();
  }

  public async logout(url: string): Promise<APIResponseLogout> {
    try {
      const data = await this.apiBase.getAsync(url);

      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
}

export default LogoutService;

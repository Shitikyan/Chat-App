import ApiBase from '../ApiBase';
import { APIResponseSetAvatar } from '../types';

class SetAvatarService {
  private apiBase: ApiBase<any>;

  constructor() {
    this.apiBase = new ApiBase<any>();
  }

  public async getAvatar(url: string): Promise<APIResponseSetAvatar> {
    try {
      const data = await this.apiBase.getAsync(url);
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  public async addAvatar(
    url: string,
    values: { image: string },
  ): Promise<APIResponseSetAvatar> {
    try {
      const { data } = await this.apiBase.postAsync(url, values);

      return data;
    } catch (error) {
      console.error(error);
    }
  }
}

export default SetAvatarService;

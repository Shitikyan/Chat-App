import ApiBase from '../ApiBase';
import { APIResponseChatContainer } from '../types';

class ChatContainerService {
  private apiBase: ApiBase<any>;

  constructor() {
    this.apiBase = new ApiBase();
  }

  public async addMessages(
    url: string,
    values: { from: string; to: string },
  ): Promise<APIResponseChatContainer> {
    try {
      const data = await this.apiBase.postAsync(url, values);

      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  public async sendMessages(
    url: string,
    values: { from: string; to: string; message: string },
  ): Promise<APIResponseChatContainer> {
    try {
      const data = this.apiBase.postAsync(url, values);

      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
}

export default ChatContainerService;

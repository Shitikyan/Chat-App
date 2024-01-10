import ApiBase from '../ApiBase';
import { APIResponseChat } from '../types';

class ChatService {
  private apiBase: ApiBase<any>;

  constructor() {
    this.apiBase = new ApiBase();
  }

  public async getContacts(url: string): Promise<APIResponseChat> {
    try {
      const data = await this.apiBase.getAsync(url);

      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
}

export default ChatService;

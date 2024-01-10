import ApiBase from '../ApiBase';
import { APIResponseRegister } from '../types';

class RegisterService {
  private apiBase: ApiBase<any>;

  constructor() {
    this.apiBase = new ApiBase<any>();
  }

  public async signin(
    url: string,
    signinData: { username: string; email: string; password: string },
  ): Promise<APIResponseRegister> {
    try {
      const data = await this.apiBase.postAsync(url, signinData);

      return data;
    } catch (error) {
      console.error(error);
    }
  }
}

export default RegisterService;

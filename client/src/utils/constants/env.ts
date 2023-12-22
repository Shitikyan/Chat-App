interface EnvVariables {
  localhostKey: string;
  baseUrl: string;
  multiAvatarApi: string;
}

const env: EnvVariables = {
  localhostKey: process.env.REACT_APP_LOCALHOST_KEY ?? 'chat-app-current-user',
  baseUrl: process.env.REACT_APP_BASE_API_URL ?? 'http://localhost:5000',
  multiAvatarApi:
    process.env.REACT_APP_MULTI_AVATAR_API ??
    'https://api.multiavatar.com/4645646',
};

export default env;

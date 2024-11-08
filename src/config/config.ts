import { developmentStage } from 'utils/constants';

const ENV = process.env.NODE_ENV || developmentStage;

type ServerConfig = {
  app: {
    CLIENT_URL: string;
    SERVER_URL: string;
  };
  services: {
    dauth: {
      TSK: string | undefined;
      DOMAIN_NAME: string | undefined;
    };
  };
};

type ConfigEnv = {
  [key: string]: ServerConfig;
};

const CONFIG: ConfigEnv = {
  development: {
    app: {
      CLIENT_URL: process.env.REACT_APP_CLIENT_URL || 'http://localhost:3000',
      SERVER_URL: `${window.location.protocol}//${window.location.hostname}:${process.env.REACT_APP_API_PORT}/api/${process.env.REACT_APP_API_VERSION}`,
    },
    services: {
      dauth: {
        TSK: process.env.REACT_APP_DAUTH_TSK,
        DOMAIN_NAME: process.env.REACT_APP_DAUTH_DOMAIN_NAME,
      },
    },
  },
  production: {
    app: {
      CLIENT_URL: process.env.REACT_APP_CLIENT_URL || 'http://localhost:3000',
      SERVER_URL: `${window.location.origin}/api/${process.env.REACT_APP_API_VERSION}`,
    },
    services: {
      dauth: {
        TSK: process.env.REACT_APP_DAUTH_TSK,
        DOMAIN_NAME: process.env.REACT_APP_DAUTH_DOMAIN_NAME,
      },
    },
  },
};

export default CONFIG[ENV] as ServerConfig;

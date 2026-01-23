// .d.ts are declaration files

import axios from 'axios';

declare global {
  interface Window {     //interface is used istead of type because this is global
    axios: typeof axios;
  }
}

export {};

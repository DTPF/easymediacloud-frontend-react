import ReactDOM from 'react-dom/client';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import App from './App';
import './index.scss';
import { message } from 'antd';
import 'antd/dist/reset.css';
import 'moment/locale/es';
import 'utils/i18n';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<App />);

serviceWorkerRegistration.register({
  onUpdate: (registration: any) => {
    const reload = () => window.location.reload();
    if (registration && registration.waiting) {
      registration.waiting.postMessage({ type: 'SKIP_WAITING' });
      registration.update();
      message.info('Nueva versión. Actualizando la web', reload);
    }
  },
});

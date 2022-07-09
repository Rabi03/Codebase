import App from './App';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';

import 'nprogress/nprogress.css';
import { SidebarProvider } from './contexts/SidebarContext';
import {Provider} from 'react-redux';
import ConfigureStore from './store/configureStore'

const store=ConfigureStore();

ReactDOM.render(
  <Provider store={store}>
    <HelmetProvider>
    <SidebarProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </SidebarProvider>
  </HelmetProvider>
  </Provider>
  ,
  document.getElementById('root')
);

serviceWorker.unregister();

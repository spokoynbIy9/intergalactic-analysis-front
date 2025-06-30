import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@/app/styles/variables/global.css';
import '@/app/styles/index.css';
import '@/app/styles/reset.css';
import App from './app/App';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</StrictMode>
);

import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Transactions } from './pages/Transactions';
import React from 'react';

const App = () => {
	return (
		<>
			<Routes>
				<Route path="/" element={<Transactions />} />
			</Routes>
		</>
	);
};

const root = ReactDOM.createRoot(document.getElementById('app') as HTMLElement);
root.render(
	<BrowserRouter>
		<App />
	</BrowserRouter>
);

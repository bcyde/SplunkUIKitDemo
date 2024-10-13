import Toaster, { makeCreateToast } from '@splunk/react-toast-notifications/Toaster';


import { BrowserRouter, Routes, Route } from "react-router-dom";

import DefaultLayout from './layouts/DefaultLayout';

import DetailsPage from './pages/DetailsPage';
import ImportPage from './pages/ImportPage';

import './App.css';


function App() {
  
    const createToast = makeCreateToast(Toaster);
    const APIENDPOINT = 'http://192.168.1.78:5000/'
    /**
     * todo:
THURS
     * theme
     * custom font
     * wait spinner UI
FRI
    FINAL DESIGN
    PYTHON API
*/

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<DefaultLayout />}>
                    <Route index element={<ImportPage createToast={createToast} apiEndpoint={APIENDPOINT} />} />
                    <Route path="tournaments/:tournament_id" element={<DetailsPage createToast={createToast} apiEndpoint={APIENDPOINT}/>} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
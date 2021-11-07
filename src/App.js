import * as React from 'react';
import PetTable from './pets/pets-view/pets-view.component';
import PetCreate from './pets/pets-create/pets-create.component';
import MyAppBar from './app-bar/app-bar.component';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div>
      <Router>
      <MyAppBar/>
        <main>
          <Routes>
            <Route path="/" element={<Navigate to="/view-pets" />}/>
            <Route path="/create-pet" element={<PetCreate/>} />
            <Route path="/view-pets" element={<PetTable/>} />
            <Route path="*" element={<Navigate to="/view-pets" />} />
          </Routes>
        </main>
      </Router>
    </div>
  );
}
export default App;

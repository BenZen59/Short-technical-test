import './App.scss';
import Books from './components/Books/Books';
import Chapters from './components/Chapters/Chapters';
import Home from './components/Home/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/books' element={<Books />} />
          <Route path='/chapters' element={<Chapters />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

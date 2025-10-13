
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { InvestingStyleQuizPage, TrustPage } from './pages';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<InvestingStyleQuizPage />} />
        <Route path="/trust" element={<TrustPage />} />
      </Routes>
    </Router>
  );
}

export default App;

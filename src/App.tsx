
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { InvestingStyleQuizPage, QuestionPage, TrustPage } from './pages';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<InvestingStyleQuizPage />} />
        <Route path="/trust" element={<TrustPage />} />
        <Route path="/question" element={<QuestionPage />} />
      </Routes>
    </Router>
  );
}

export default App;

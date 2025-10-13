
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { AnalyzingAnswerPage, InvestingStyleQuizPage, OptionBasedPage, QuestionPage, ResultsPage, TrustPage, WelcomePage } from './pages';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<InvestingStyleQuizPage />} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/analyzing" element={<AnalyzingAnswerPage />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/trust" element={<TrustPage />} />
        <Route path="/question" element={<QuestionPage />} />
        <Route path="/option-based" element={<OptionBasedPage />} />
      </Routes>
    </Router>
  );
}

export default App;

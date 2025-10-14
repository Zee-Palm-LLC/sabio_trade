
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import {
  AnalyzingAnswerPage, InvestingStyleQuizPage, LeadPage, OptionBasedPage,
  QuestionPage, ScratchPage,
  TradingProfiles,
  TrustPage, WelcomePage,
  YourTraderProfile
} from './pages';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<InvestingStyleQuizPage />} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/analyzing" element={<AnalyzingAnswerPage />} />
        <Route path="/lead" element={<LeadPage />} />
        <Route path="/trust" element={<TrustPage />} />
        <Route path="/question" element={<QuestionPage />} />
        <Route path="/option-based" element={<OptionBasedPage />} />
        <Route path="/scratch" element={<ScratchPage />} />
        <Route path="/trading-profiles" element={<TradingProfiles />} />
        <Route path='/your-trader-profile' element={<YourTraderProfile/>}/>
      </Routes>
    </Router>
  );
}

export default App;

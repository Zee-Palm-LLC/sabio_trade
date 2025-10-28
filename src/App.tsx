
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import {
  AdvanceQuestionPage,
  AnalyzingAnswerPage,
  AnalyzingVid,
  InvestingStyleQuizPage, LeadPage, OptionBasedPage,
  QuestionPage,
  ScratchPage,
  TradingProfiles,
  TradingQuizExtraPage,
  TrustPage,
  YourTraderProfile
} from './pages';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<InvestingStyleQuizPage />} />
        {/* <Route path="/welcome" element={<WelcomePage />} /> */}
        {/* <Route path="/sabio-intro" element={<SabioIntroPage />} /> */}
        <Route path="/analyzing-final" element={<AnalyzingVid />} />
        <Route path="/analyzing" element={<AnalyzingAnswerPage />} />
        <Route path="/advance-question" element={<AdvanceQuestionPage />} />
        <Route path="/lead" element={<LeadPage />} />
        <Route path="/trust" element={<TrustPage />} />
        <Route path="/question" element={<QuestionPage />} />
        <Route path="/option-based" element={<OptionBasedPage />} />
        <Route path="/scratch" element={<ScratchPage />} />
        <Route path="/trading-profiles" element={<TradingProfiles />} />
        <Route path='/your-trader-profile' element={<YourTraderProfile/>}/>
        <Route path='/quiz-extra' element={<TradingQuizExtraPage/>}/>
        <Route path='/trading-quiz-extra' element={<TradingQuizExtraPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;

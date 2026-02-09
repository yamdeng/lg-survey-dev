import React from 'react';
import { Routes, Route } from 'react-router-dom';

import DashboardMain from '@/publish/pages/dashboardMain';
import Notice from '@/publish/pages/notice';

import LanguageInfo from '@/publish/pages/edition/languageInfo';
import SurveyInfo from '@/publish/pages/edition/surveyInfo';

import CommonInfo from '@/publish/pages/question/commonInfo';
import QuestionInfo from '@/publish/pages/question/questionInfo';

const RoutesList = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardMain />} />
      <Route path="/notice" element={<Notice />} />

      <Route path="/edition/surveyInfo" element={<SurveyInfo />} />
      <Route path="/edition/languageInfo" element={<LanguageInfo />} />

      <Route path="/question/commonInfo" element={<CommonInfo />} />
      <Route path="/question/questionInfo" element={<QuestionInfo />} />
    </Routes>
  );
};

export default RoutesList;

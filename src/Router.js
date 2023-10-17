// AppRouter.js
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './pages/Index/Index.jsx';
import Test from './pages/test/test.jsx';

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/index" element={<Index/>} />
        <Route path="/test" element={<Test/>} />
        {/* 添加其他路由规则 */}
      </Routes>
    </Router>
  );
}

export default AppRouter;

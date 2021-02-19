import React from 'react';
import SignIn from './pages/SignIn';

import AppProvider from './hooks';

import GlobalStyle from './styles/global';

const App: React.FC = () => {
  return (
    <>
      <AppProvider>
        <SignIn/>
      </AppProvider>

      <GlobalStyle/>
    </>
  );
};

export default App;
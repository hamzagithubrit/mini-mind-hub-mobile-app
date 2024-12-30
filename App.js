import React from 'react';
import AppNavigator from './navigation/AppNavigator';
import { UserProvider } from './context/UserContext'; // Import UserProvider

const App = () => {
  return (
    <UserProvider>
      <AppNavigator />
    </UserProvider>
  );
};

export default App;



import { memo } from 'react';
import MainRouters from './pages';
const App = () => {
  return (
    <div className="App">
      <MainRouters />
    </div>
  );
};

export default memo(App);
import React, { useEffect, useContext, Suspense } from 'react';
import { useTranslation } from 'react-i18next';

import AppContext from '../../context/AppContext';
import LeftSidebar from '../LeftSidebar/LeftSidebar';
import RightSidebar from '../RightSidebar/RightSidebar';

import templates from '../../templates';

const App = () => {
  const { i18n } = useTranslation();
  const context = useContext(AppContext);
  const { state, dispatch } = context;
  const { theme, settings } = state;

  useEffect(() => {
    i18n.changeLanguage(settings.language);
    const storedState = JSON.parse(localStorage.getItem('state'));
    dispatch({ type: 'import_data', payload: storedState });
  }, [dispatch, i18n, settings.language]);

  return (
    <Suspense fallback="Loading...">
      <div className="h-screen overflow-hidden grid grid-cols-5 items-center">
        <LeftSidebar />

        <div className="z-0 h-screen col-span-3 flex justify-center items-center overflow-scroll">
          <div
            id="page"
            className="animated fadeIn my-auto shadow-2xl"
            style={{ animationDelay: '500ms' }}
          >
            {templates.find(x => theme.layout.toLowerCase() === x.key).component()}
          </div>
        </div>

        <RightSidebar />
      </div>
    </Suspense>
  );
};

export default App;

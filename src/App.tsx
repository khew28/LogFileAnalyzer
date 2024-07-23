import React, { ReactComponentElement } from 'react';
import { Header } from './views/Header'
import { TopMenu} from './views/TopMenu';
import {  BrowserRouter as Router,  Switch,  Route } from "react-router-dom";
import { RenderHistory } from './views/AllRecentLogs';
import { RenderTestLog } from './views/TestLogDetail';
import { RenderUploadPage} from './views/UploadLog';
import {RenderLoginPage} from './views/LoginPage';
import {RenderUserTestLogs} from './views/CurrentUserRecentLogs';
import {RenderQueryTCPage} from './views/QueryTestCases';

const AppContainer = ({children}:React.PropsWithChildren<{}>) => {
  return (
    <div className="app-container">
      {children}
    </div>
  )
}

function App() {

  //console.log("state testLogHistory:", store.getState().testLogHistory);
  return (
    <Router>
        <AppContainer>
          <Header/>
          <TopMenu/>
          <Switch>
            <Route exact path="/" component={RenderHistory} />
            <Route exact path="/recent" component={RenderHistory} />
            <Route exact path="/testLogDetails/:id" component={RenderTestLog} />
            <Route exact path="/loginRegister" component={RenderLoginPage} />
            <Route exact path="/curUserWork/:id" component={RenderUserTestLogs} />
            <Route exact path="/uploadFile" component={RenderUploadPage} />
            <Route exact path="/queryTestCases" component={RenderQueryTCPage} />
          </Switch>
        </AppContainer>
    </Router>
  );
}

export default App;

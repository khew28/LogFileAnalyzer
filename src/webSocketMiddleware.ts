import { hubConnection, Connection  } from 'signalr-no-jquery';
import { UPDATE_TEST_LOG_RT } from './historyReducer'
import { INIT_APP} from './reducer'


export const signalRMiddleware = (store: any) => (next: any) => async (action: any) => {
  // register signalR after the user logged in
  if (action.type === INIT_APP) {
    const connection = hubConnection('/signalr');
    const hubProxy = connection.createHubProxy('ModelUpdateHubHub')

    // set up event listeners i.e. for incoming "message" event
    hubProxy.on('updateTestLogModel', testLogs => {
      console.log('updateTestLogRecords: ', testLogs);
      store.dispatch({type : UPDATE_TEST_LOG_RT, payload : testLogs})
    });
    
    // atempt connection, and handle errors
    connection.start()
     .done(() => console.log('Now connected, connection ID=' + connection.id))
     .fail(() => console.log('Could not connect'));
  }

  return next(action);
};

export default signalRMiddleware;
import React, { useEffect, useState } from 'react';
import './App.css';
import { Amplify, Auth } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsExports from './aws-exports';
Amplify.configure(awsExports);

// https://ui.docs.amplify.aws/components/authenticator#quick-start
export default function App() {

  // Cognito から Token を取得
  // 参考：https://docs.amplify.aws/lib/restapi/authz/q/platform/js/#cognito-user-pools-authorization
  const [token, setToken] = useState('');
  const [errorLog, setErrorLog] = useState('');
  useEffect(() => {
    Auth.currentSession().then((session) => {
      if (session) {
        setToken(session.getIdToken().getJwtToken());
      } else {
        setErrorLog('session is undefined.');
      }
    }).catch((e) => { setErrorLog(e) });
  });

  return (
    <Authenticator loginMechanisms={['email']}>
      {({ signOut, user }) => (
        <main>
          <h1>Hello {user.username}</h1>
          {errorLog && (<div>{errorLog}</div>)}
          <div>
            Token is {token}
          </div>
          <button onClick={signOut}>Sign out</button>
        </main>
      )}
    </Authenticator>
  );
};

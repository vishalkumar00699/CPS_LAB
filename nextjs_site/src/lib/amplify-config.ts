
import { Amplify } from 'aws-amplify';

export const config = {
  Auth: {
    Cognito: {
      userPoolId: 'us-east-1_NLhmZBt0q',
      userPoolClientId: '1mrpdo856s8ilqavv7kkn8vm97',
      region: 'us-east-1',
    },
  },
};

export function configureAmplify() {
  const userPoolId = process.env.NEXT_PUBLIC_USER_POOL_ID || config.Auth.Cognito.userPoolId;
  const userPoolClientId = process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID || config.Auth.Cognito.userPoolClientId;
  
  console.log('Configuring Amplify with:', {
    userPoolId,
    userPoolClientId: userPoolClientId ? '***' + userPoolClientId.slice(-4) : 'undefined',
    region: 'us-east-1'
  });

  const redirectUri = typeof window !== 'undefined' 
    ? `${window.location.origin}/home` 
    : 'https://www.cpslabhub.com/home';

  Amplify.configure({
    Auth: {
      Cognito: {
        userPoolId,
        userPoolClientId,
        loginWith: {
          oauth: {
            domain: 'auth.cpslabhub.com',
            scopes: ['openid', 'email', 'profile'],
            redirectSignIn: [redirectUri],
            redirectSignOut: [redirectUri],
            responseType: 'code',
          },
        },
      },
    },
  });
}
 

import { Amplify } from 'aws-amplify';

export const config = {
  Auth: {
    Cognito: {
      userPoolId: 'us-east-1_NLhmZBt0q',
      userPoolClientId: '7ggmg2h7is565730c43am4l15s',
      region: 'us-east-1',
    },
  },
};

export const configureAmplify = () => {
  try {
    Amplify.configure(config);
    return true;
  } catch (error) {
    console.error('Amplify configuration error:', error);
    return false;
  }
};


import { 
  signIn, 
  signUp, 
  confirmSignUp, 
  signOut, 
  getCurrentUser, 
  fetchUserAttributes,
  resendSignUpCode,
  resetPassword,
  confirmResetPassword,
  updateUserAttributes,
  SignInInput,
  SignUpInput,
  ConfirmSignUpInput,
  ResendSignUpCodeInput,
  ResetPasswordInput,
  ConfirmResetPasswordInput,
} from 'aws-amplify/auth';

/**
 * Handle Login
 */
export async function handleSignIn({ username, password }: SignInInput) {
  try {
    const { isSignedIn, nextStep } = await signIn({ username, password });
    return { isSignedIn, nextStep };
  } catch (error: any) {
    console.error('Sign-in error:', error);
    throw error;
  }
}

/**
 * Handle Logout
 */
export async function handleSignOut() {
  try {
    await signOut();
  } catch (error) {
    console.error('Sign-out error:', error);
    throw error;
  }
}

/**
 * Handle Signup
 */
export async function handleSignUp({ username, password, options }: SignUpInput) {
  try {
    const { isSignUpComplete, userId, nextStep } = await signUp({
      username,
      password,
      options,
    });
    return { isSignUpComplete, userId, nextStep };
  } catch (error) {
    console.error('Sign-up error:', error);
    throw error;
  }
}

/**
 * Confirm Signup (OTP)
 */
export async function handleConfirmSignUp({ username, confirmationCode }: ConfirmSignUpInput) {
  try {
    const { isSignUpComplete, nextStep } = await confirmSignUp({ 
      username, 
      confirmationCode 
    });
    return { isSignUpComplete, nextStep };
  } catch (error) {
    console.error('Confirm sign-up error:', error);
    throw error;
  }
}

/**
 * Resend Signup Code
 */
export async function handleResendSignUpCode({ username }: ResendSignUpCodeInput) {
  try {
    await resendSignUpCode({ username });
  } catch (error) {
    console.error('Resend code error:', error);
    throw error;
  }
}

/**
 * Handle Forgot Password
 */
export async function handleForgotPassword({ username }: ResetPasswordInput) {
  try {
    const output = await resetPassword({ username });
    return output;
  } catch (error) {
    console.error('Forgot password error:', error);
    throw error;
  }
}

/**
 * Confirm Reset Password
 */
export async function handleConfirmForgotPassword({ username, confirmationCode, newPassword }: ConfirmResetPasswordInput) {
  try {
    await confirmResetPassword({ username, confirmationCode, newPassword });
  } catch (error) {
    console.error('Confirm reset password error:', error);
    throw error;
  }
}

/**
 * Get Current Authenticated User
 */
export async function handleGetCurrentUser() {
  try {
    const user = await getCurrentUser();
    const attributes = await fetchUserAttributes();
    return { ...user, attributes };
  } catch (error) {
    return null;
  }
}

/**
 * Helper to check if user is admin based on email
 * Uses the same hardcoded logic as the Flutter app
 */
export function isUserAdmin(email: string): boolean {
  const adminEmails = [
    'thvwork07@gmail.com',
    'vishal808066@gmail.com'
 ];
  return adminEmails.includes(email.toLowerCase());
}

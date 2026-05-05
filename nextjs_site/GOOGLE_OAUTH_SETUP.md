# Google OAuth Setup Guide for Cognito

## ⚠️ IMPORTANT: Complete These Steps in AWS Cognito Console

Your app is now set up to handle Google OAuth login, but you **MUST** configure Google as an identity provider in your AWS Cognito user pool. Follow these steps:

---

## Step 1: Enable Google as an Identity Provider in Cognito

### In AWS Cognito Console:

1. Go to your User Pool: `cpslab-google` (or your pool name)
2. Navigate to **Sign-in experience** → **Federated identity provider configuration**
3. Click **Add identity provider** → Choose **Google**
4. Fill in the Google Provider Details:
   - **Provider name**: `Google`
   - **Client ID**: Your Google OAuth Client ID (from Google Cloud Console)
   - **Client secret**: Your Google OAuth Client Secret (from Google Cloud Console)
   - **Authorize scopes**: `openid email profile`

5. Click **Add identity provider**

---

## Step 2: Configure App Client for Google

1. Go to **App integration** → **App client settings**
2. Find your app client: `7ggmg2h7is565730c43am4l15s`
3. Click **Edit** and configure:

   **Sign-in experience:**
   - ✅ Enable Username password based authentication (ALLOW_USER_PASSWORD_AUTH)
   - ✅ Enable Refresh token based authentication (ALLOW_REFRESH_TOKEN_AUTH)

   **Enabled identity providers:**
   - ✅ Google (SELECT THIS)
   - ✅ Username Password Authentication (if desired)

   **Callback URL(s):**
   ```
   http://localhost:3000/auth/callback
   https://www.cpslabhub.com/auth/callback
   ```

   **Sign-out URL(s):**
   ```
   http://localhost:3000/login
   https://www.cpslabhub.com/login
   ```

4. Click **Save changes**

---

## Step 3: Configure Google Cloud Console

### Create Google OAuth Credentials:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Go to **APIs & Services** → **Credentials**
4. Click **Create Credentials** → **OAuth 2.0 Client IDs**
5. Choose **Web application**
6. Add Authorized redirect URIs:
   ```
   https://cpslab-google.auth.us-east-1.amazoncognito.com/oauth2/idpresponse
   http://localhost:3000/auth/callback
   https://www.cpslabhub.com/auth/callback
   ```

7. Copy the **Client ID** and **Client Secret**
8. Paste them into Cognito (Step 1)

---

## Step 4: Set App Client Environment Variables

**In `nextjs_site/.env.local`:**

```env
NEXT_PUBLIC_COGNITO_DOMAIN=https://cpslab-google.auth.us-east-1.amazoncognito.com
NEXT_PUBLIC_COGNITO_CLIENT_ID=7ggmg2h7is565730c43am4l15s
NEXT_PUBLIC_USER_POOL_ID=us-east-1_NLhmZBt0q
NEXT_PUBLIC_USER_POOL_CLIENT_ID=7ggmg2h7is565730c43am4l15s
```

---

## Step 5: Test the Flow

1. **Restart your Next.js dev server** (important for env changes to take effect)
   ```bash
   npm run dev
   ```

2. **Open a private/incognito window** (to avoid Google account auto-selection)

3. **Go to the Login page**: `http://localhost:3000/login`

4. **Click "Continue with Google"**

5. **You should now see the "Choose account" dialog** from Google

6. **Select your Google account** and complete the login

7. **You will be redirected to `/auth/callback`** where the token exchange happens

8. **You will then be redirected to `/home`** if successful

---

## Troubleshooting

### "Redirect URI mismatch" error
- Check that the redirect URI in Cognito matches exactly with:
  - Your app (login page)
  - Google Cloud Console OAuth credentials
  - This setup guide

### No "Choose account" dialog appears
- Make sure you're in an incognito/private window
- Verify Google is enabled in Cognito App Client
- Check console logs for errors

### "Invalid client_id" error
- Ensure `COGNITO_CLIENT_ID` in `.env.local` is correct
- Restart the dev server after changing env variables

### Token exchange fails
- Check that Google OAuth credentials are correctly set in Cognito
- Verify Cognito domain is accessible
- Check browser console for detailed error messages

---

## After Configuration is Complete

1. ✅ Google login should work
2. ✅ Users see the "Choose account" dialog
3. ✅ Tokens are stored in localStorage and cookies
4. ✅ User is logged in and redirected to `/home`

---

## Important Notes

- **Do NOT commit `.env.local`** to Git (it contains secrets)
- **Always use HTTPS in production** for OAuth
- **Google OAuth credentials must be kept secret**
- **Cognito Callback URLs must match exactly** (no trailing slashes differences)

---

## Questions?

If you have issues:
1. Check the browser console (F12) for error messages
2. Check AWS Cognito logs for auth failures
3. Verify all URIs match exactly (including protocol, domain, path)
4. Ensure Google is enabled in your Cognito App Client

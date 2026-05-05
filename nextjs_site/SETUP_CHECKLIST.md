# 🎯 Google OAuth Fix - Action Checklist

## ✅ Already Completed (Code Changes)

- [x] Created `.env.local` with Cognito credentials
- [x] Created dedicated OAuth callback handler at `/auth/callback`
- [x] Updated login page with improved Google OAuth flow
- [x] Updated Amplify configuration with correct redirect URI
- [x] Added enhanced console logging for debugging
- [x] Created GOOGLE_OAUTH_SETUP.md guide
- [x] Created FIX_SUMMARY.md documentation

---

## 📋 You Must Complete (Cognito & Google Setup)

### AWS Cognito Console Tasks

- [ ] Go to [AWS Cognito Console](https://console.aws.amazon.com/cognito/)
- [ ] Select your user pool: **cpslab-google**

#### Enable Google Identity Provider
- [ ] Navigate to **Sign-in experience** → **Federated identity provider configuration**
- [ ] Click **Add identity provider** → Select **Google**
- [ ] Enter Google credentials:
  - [ ] Client ID: `(from Google Cloud Console)`
  - [ ] Client Secret: `(from Google Cloud Console)`
  - [ ] Authorize scopes: `openid email profile`
- [ ] Click **Add identity provider**

#### Configure App Client
- [ ] Go to **App integration** → **App client settings**
- [ ] Select app client: **7ggmg2h7is565730c43am4l15s**
- [ ] Click **Edit** and enable:
  - [ ] ✅ Google (under Enabled identity providers)
  - [ ] ✅ Username password based authentication
  - [ ] ✅ Refresh token based authentication
- [ ] Set Callback URL(s):
  - [ ] `http://localhost:3000/auth/callback` (local development)
  - [ ] `https://www.cpslabhub.com/auth/callback` (production)
- [ ] Set Sign-out URL(s):
  - [ ] `http://localhost:3000/login` (local development)
  - [ ] `https://www.cpslabhub.com/login` (production)
- [ ] Click **Save changes**

### Google Cloud Console Tasks

- [ ] Go to [Google Cloud Console](https://console.cloud.google.com/)
- [ ] Create or select your project
- [ ] Go to **APIs & Services** → **Credentials**
- [ ] Create **OAuth 2.0 Client ID** (Web application type)
- [ ] Add Authorized redirect URIs:
  - [ ] `https://cpslab-google.auth.us-east-1.amazoncognito.com/oauth2/idpresponse`
  - [ ] `http://localhost:3000/auth/callback`
  - [ ] `https://www.cpslabhub.com/auth/callback`
- [ ] Copy **Client ID** and **Client Secret**
- [ ] Paste them into Cognito (from the "Enable Google Identity Provider" section above)

### Local Testing

- [ ] Restart your development server: `npm run dev`
- [ ] Open a **PRIVATE/INCOGNITO window** (critical!)
- [ ] Navigate to: `http://localhost:3000/login`
- [ ] Click **"Continue with Google"**
- [ ] Verify you see the **"Choose account"** dialog
- [ ] Select your Google account
- [ ] Verify you are redirected to `/auth/callback` with "Authenticating..." message
- [ ] Verify token exchange succeeds and you are redirected to `/home`
- [ ] Verify you are logged in with your Google account info

---

## 🐛 If Something Goes Wrong

### Check These First
- [ ] Are you in a **private/incognito window**? (This is important!)
- [ ] Did you **restart the dev server** after creating `.env.local`?
- [ ] Are all **redirect URIs exactly the same** in Cognito and Google Cloud?
- [ ] Is **Google enabled** in your Cognito App Client?
- [ ] Did you **save your changes** in Cognito?

### Debug Steps
1. [ ] Open **F12 Developer Console** in your browser
2. [ ] Go to **Console tab** and look for error messages starting with 🔴
3. [ ] Check for messages like:
   - [ ] `🔐 [Google Login] Initiating Google OAuth flow...` ✅
   - [ ] `🔐 [OAuth Callback] Received: { code: true, ... }` ✅
   - [ ] `✅ [OAuth Callback] Token exchange successful` ✅
4. [ ] Go to **Network tab** and check requests to:
   - [ ] `cpslab-google.auth.us-east-1.amazoncognito.com/oauth2/authorize`
   - [ ] `cpslab-google.auth.us-east-1.amazoncognito.com/oauth2/token`

### Helpful Commands

```bash
# Navigate to project
cd nextjs_site

# Restart dev server
npm run dev

# Check if .env.local exists
ls -la .env.local

# View .env.local contents (don't commit this!)
cat .env.local
```

---

## 📞 Support Information

### Reference Files
- **Setup Guide**: `nextjs_site/GOOGLE_OAUTH_SETUP.md`
- **Fix Summary**: `nextjs_site/FIX_SUMMARY.md`
- **Environment Template**: `nextjs_site/.env.local.example`

### Modified Files
- `src/app/login/page.tsx` - Google login handler
- `src/lib/amplify-config.ts` - Amplify OAuth configuration
- `src/app/auth/callback/page.tsx` - OAuth callback handler (NEW)

### Error Messages Explained

| Error | Cause | Fix |
|-------|-------|-----|
| "Redirect URI mismatch" | URLs don't match exactly | Check all 3 places (login page, Cognito, Google Cloud) |
| "Invalid client_id" | Env vars not loaded | Restart dev server after creating `.env.local` |
| "Invalid credentials" | Wrong Google credentials in Cognito | Copy correct Client ID & Secret from Google Cloud |
| "Token exchange failed" | Google not enabled in Cognito | Enable Google in App Client settings |

---

## 🎉 Success Criteria

You'll know it's working when:

1. ✅ "Choose account" dialog appears when clicking "Continue with Google"
2. ✅ You can select your Google account
3. ✅ You see "Authenticating with Google..." message
4. ✅ Browser shows no errors in console (no 🔴 messages)
5. ✅ You're redirected to `/home` and logged in
6. ✅ Your Google email/name appears in the app

---

## 📅 Estimated Time
- **Cognito Setup**: 5-10 minutes
- **Google Cloud Setup**: 5-10 minutes
- **Testing**: 5 minutes
- **Total**: ~20 minutes

---

## 💾 Important Notes

⚠️ **DO NOT:**
- Commit `.env.local` to Git (contains secrets)
- Share your Google credentials
- Use production secrets in development

✅ **DO:**
- Use private/incognito windows for testing
- Keep credentials safe and secure
- Restart dev server after env changes
- Use HTTPS in production

---

**Status**: ✅ Code changes complete | ⏳ Waiting for your Cognito & Google setup

**Next Action**: Follow the checklist above and complete Cognito & Google Cloud configuration!

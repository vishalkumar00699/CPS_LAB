# 🚀 Quick Reference - Google OAuth Setup

## Copy/Paste Values for Cognito & Google Cloud

### 📌 Your Cognito Details
```
User Pool: cpslab-google
Region: us-east-1
App Client ID: 7ggmg2h7is565730c43am4l15s
OAuth Domain: cpslab-google.auth.us-east-1.amazoncognito.com
```

### 📌 Callback URIs (Copy these exactly)

**For Local Development:**
```
http://localhost:3000/auth/callback
http://localhost:3000/login
```

**For Production:**
```
https://www.cpslabhub.com/auth/callback
https://www.cpslabhub.com/login
```

**For Google OAuth Response (Cognito domain):**
```
https://cpslab-google.auth.us-east-1.amazoncognito.com/oauth2/idpresponse
```

---

## 🔑 OAuth Scopes

```
openid
email
profile
```

---

## ✅ Cognito Checklist (In Order)

### 1. Enable Google Provider
**Path:** User Pool → Sign-in experience → Federated identity provider configuration

```
Provider Name: Google
Client ID: [paste from Google Cloud]
Client Secret: [paste from Google Cloud]
Authorize Scopes: openid email profile
```

### 2. Configure App Client
**Path:** App integration → App client settings → Edit

**Enabled Authentication Flows:**
- ✅ ALLOW_USER_PASSWORD_AUTH
- ✅ ALLOW_REFRESH_TOKEN_AUTH
- ✅ ALLOW_CUSTOM_AUTH (optional)

**Enabled Identity Providers:**
- ✅ Google
- ✅ Username password-based authentication (optional)

**Callback URLs:**
```
http://localhost:3000/auth/callback
https://www.cpslabhub.com/auth/callback
```

**Sign-out URLs:**
```
http://localhost:3000/login
https://www.cpslabhub.com/login
```

**Advanced Settings** (Optional):
- Allowed OAuth Flows: `code`
- Allowed OAuth Scopes: `openid`, `email`, `profile`

---

## 🟥 Google Cloud Setup Checklist

### 1. Create OAuth 2.0 Credentials
**Path:** APIs & Services → Credentials → Create Credentials → OAuth 2.0 Client ID

```
Application Type: Web application
Name: CPS Lab OAuth
```

### 2. Add Authorized Redirect URIs
```
https://cpslab-google.auth.us-east-1.amazoncognito.com/oauth2/idpresponse
http://localhost:3000/auth/callback
https://www.cpslabhub.com/auth/callback
```

### 3. Get Credentials
- Copy **Client ID** → Paste in Cognito
- Copy **Client Secret** → Paste in Cognito

---

## 🧪 Quick Test

After setup:

```bash
# 1. Restart dev server
cd nextjs_site
npm run dev

# 2. Open in INCOGNITO window
http://localhost:3000/login

# 3. Click "Continue with Google"

# 4. Expected flow:
# ✅ Google "Choose account" dialog appears
# ✅ Select your account
# ✅ Redirected to /auth/callback
# ✅ Shows "Authenticating with Google..."
# ✅ Redirected to /home
# ✅ You're logged in!
```

---

## 🐛 Troubleshooting Quick Links

| Error | Check | Fix |
|-------|-------|-----|
| Blank page after clicking | Check F12 Console | Look for 🔴 errors |
| "Redirect URI mismatch" | All 3 URIs match? | They MUST be identical |
| No "Choose account" dialog | In incognito window? | Must be private/incognito |
| Token exchange fails | Google creds in Cognito? | Copy exact Client ID & Secret |

---

## 📝 `.env.local` Content

```env
# Already created for you in nextjs_site/.env.local
NEXT_PUBLIC_COGNITO_DOMAIN=https://cpslab-google.auth.us-east-1.amazoncognito.com
NEXT_PUBLIC_COGNITO_CLIENT_ID=7ggmg2h7is565730c43am4l15s
NEXT_PUBLIC_USER_POOL_ID=us-east-1_NLhmZBt0q
NEXT_PUBLIC_USER_POOL_CLIENT_ID=7ggmg2h7is565730c43am4l15s
```

---

## 📞 Key Points

1. ⚠️ **Use INCOGNITO window** for testing (critical!)
2. ⚠️ **Restart dev server** after creating `.env.local`
3. ⚠️ **URIs must match exactly** (no trailing slashes!)
4. ⚠️ **Never commit `.env.local`** to Git
5. ✅ **All changes take effect immediately** after saving in Cognito
6. ✅ **Check console (F12)** for detailed error messages

---

## 🎯 Expected Console Output

```
🔐 [Google Login] Initiating Google OAuth flow...
🔐 [Google Login] Full URL: https://cpslab-google.auth...
🔐 [OAuth Callback] Received: { code: true, error: null }
🔐 [OAuth Callback] Exchanging code for tokens...
🔐 [OAuth Callback] Token request to: https://cpslab-google.auth...
✅ [OAuth Callback] Token exchange successful
✅ [OAuth Callback] Tokens stored, redirecting to home...
```

---

**Ready?** Start with the checklist in `SETUP_CHECKLIST.md` 🚀

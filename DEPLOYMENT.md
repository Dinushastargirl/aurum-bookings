
# Aurum Bookings: Vercel Deployment Checklist

Follow these steps to take the studio management system live.

### 1. Preparation
- [ ] Initialize git: `git init`
- [ ] Commit all files: `git add . && git commit -m "Initial production commit"`
- [ ] Push to a private GitHub repository.

### 2. Vercel Project Setup
- [ ] Create a new project on [Vercel](https://vercel.com/new).
- [ ] Import your GitHub repository.
- [ ] **Storage Tab**: Add a "Vercel Postgres" database.
- [ ] **Environment Variables**: Copy variables from `.env.example` to the Vercel Dashboard.

### 3. Database Sync
Run these commands locally (connected to your Vercel DB) or via GitHub Actions:
```bash
npx prisma db push
npx prisma generate
```

### 4. PayHere Settings
- [ ] Log in to your PayHere Merchant Portal.
- [ ] Set "App Domain" to your Vercel URL (e.g., `aurum-bookings.vercel.app`).
- [ ] Ensure the `PAYHERE_SECRET` in Vercel matches your portal exactly.

### 5. Final verification
- [ ] Verify that `postinstall` script in `package.json` successfully generates the client during build.
- [ ] Test the `admin/1234` login on the live URL.

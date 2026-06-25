# Security notes

This project is a static portfolio website. It does not need secrets in the repository.

Do not commit:

- Cloudflare API tokens
- `.env` files
- `.dev.vars`
- private keys
- passwords
- credentials

The deployed site uses static security headers from `public/_headers`.

If the site later adds forms, analytics, APIs, authentication, or third-party scripts, review the Content Security Policy before deployment.

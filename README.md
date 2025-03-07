# Browser

Browse the local machine.

## Develop

```bash
git clone https://github.com/localserve/browser.git
cd browser

## Need pnpm
corepack enable pnpm
pnpm self-update

## Terminal 1
cd server # you would be in /browser/server
pnpm install
### create certs
openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout ./src/localhost.key -out ./src/localhost.crt -subj "/CN=localhost"
### run the app
pnpm run dev
### accept the certificate, first time only
# visit: https://localhost:4420/
## accept
### done with server setup

## Terminal 2
cd client # you would be in /browser/client
pnpm install
pnpm run dev

```

## License

MIT

Copyright (c) 2025 Anubhav Saini

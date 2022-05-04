# Shopping-Cart-API

## Install all dependencies

`npm install`

## Fill your credentials as below (.env)

```
cp .env.example .env

MONGO_URI=mongodb://localhost:27017/Cart-Api
REDIS_URI=redis://localhost:6379
REDIS_TOKEN_KEY = authToken
REDIS_CART_KEY = Cart
BASE_URL=http://localhost:3000/api/v1


AUTH_TOKEN_LIFETIME = 1h
REFRESH_TOKEN_LIFETIME = 24h

AUTH_TOKEN_SECRET =bc2e6686e889dcd3aa3618a33c5f99214cffe1c0c36670c
REFRESH_TOKEN_SECRET = 0245794a9e5e4be22f3yfaca6156e8c203b31f3f092

```

### Fill the details above as per your configuration

## Run the application

```
npm run dev  (locally)
npm run start (production)
```

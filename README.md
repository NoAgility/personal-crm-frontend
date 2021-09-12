# personal-crm-frontend

Development environment url: https://friendly-babbage-c6da98.netlify.app

Production environment url: https://keen-saha-6573e4.netlify.app

# Starting up the app

To start up the app (Windows):

1. Install Node.js at https://nodejs.org/en/download/
2. Open CMD and navigate to the directory
3. Create a ".env" file in the root folder and paste this in:

  If you are running backend locally with the "local" profile:
```
REACT_APP_BACKEND_URL=http://localhost:8080
```
  If you are running backend locally with "docker-compose-local.sh":
```
REACT_APP_BACKEND_URL=http://localhost
```
4. Run the following command:
```npm start```

Your react app should be up and running

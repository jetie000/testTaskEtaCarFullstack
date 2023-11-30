# Fullstack crypto website

FrontEnd: React, React Query, SCSS

BackEnd: Express.js, tRPC

Tests: Cypress (E2E-tests), Jest(unit-tests), Storybook

## To make things work

Install whole project

Execute this

```
cd packages/client
npm i
cd ../../packages/server
npm i
```

Create postgre database with name YOUR_DBNAME

Create file with name .env in cd packages/server with info

```
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:YOUR_PORT/YOUR_DBNAME?schema=public"
```

Execute this in existing terminal

```
npx prisma db seed 
```

To launch server (in the same terminal)
```
npm start
```
To launch client (in new terminal)
```
cd packages/client
npm start
```

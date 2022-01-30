# Noodles-Express
- Noodles-Express is Multi Page App and Single Page App for the fictional Noodles-Express restaurant and their customers. The customers can place the orders , see the status and order history and the owner can manage their order and menu items.

- Project demo


https://user-images.githubusercontent.com/92115251/151718068-a01e1146-2532-4e22-a001-d5666cf97ae8.mp4



- Project ERD
!["ERD_v2"](https://github.com/Erica-jihyeon/Noodles-Express/blob/master/docs/ERD_v2.png)

- Project wireframe
!["wireframe"](https://github.com/Erica-jihyeon/Noodles-Express/blob/master/docs/wireframe_progress1.png)

- Project Planning
https://github.com/Erica-jihyeon/Noodles-Express/blob/master/docs/Noodles_Express_planning.docx

=========
## Getting Started

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information 
  - username: `labber` 
  - password: `labber` 
  - database: `midterm`
3. Install dependencies: `npm i`
4. Fix to binaries for sass: `npm rebuild node-sass`
5. Reset database: `npm run db:reset`
  - Check the db folder to see what gets created and seeded in the SDB
7. Run the server: `npm run local`
  - Note: nodemon is used, so you should not have to restart your server
8. Visit `http://localhost:8080/`

## Warnings & Tips

- Do not edit the `layout.css` file directly, it is auto-generated by `layout.scss`
- Split routes into their own resource-based file names, as demonstrated with `users.js` and `widgets.js`
- Split database schema (table definitions) and seeds (inserts) into separate files, one per table. See `db` folder for pre-populated examples. 
- Use the `npm run db:reset` command each time there is a change to the database schema or seeds. 
  - It runs through each of the files, in order, and executes them against the database. 
  - Note: you will lose all newly created (test) data each time this is run, since the schema files will tend to `DROP` the tables and recreate them.

## Dependencies

- Node 10.x or above
- NPM 5.x or above
- PG 6.x
- body-parser
- cookie-session
- dotenv
- ejs
- express
- sass
- twilio

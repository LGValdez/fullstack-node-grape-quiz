import "reflect-metadata";
import app from "./app";
import { AppDataSource } from "./config/database/db";

const PORT = 8000;

async function main() {
    await AppDataSource.initialize();
    console.log('Database connected!');

    app.listen(PORT, () => {
        console.log(`Server listening on port: ${PORT}`)
    })

}

main();

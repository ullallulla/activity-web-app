import "https://deno.land/x/dotenv/load.ts";

let config = {};

config.database = {
    user: Deno.env.get('PGUSER'),
    password: Deno.env.get('PGPASSWORD'),
    database: Deno.env.get('PGDATABASE'),
    hostname: Deno.env.get('PGHOST'),
    port: Number(Deno.env.get('PGPORT'))
};

export { config };
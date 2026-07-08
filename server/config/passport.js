import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import pg from "pg";
import dotenv from "dotenv";
dotenv.config();

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;
        const google_id = profile.id;
        const name = profile.displayName;

        // Check if DrDB exists
        let result = await pool.query(
          "SELECT * FROM DrDB WHERE google_id = $1",
          [google_id],
        );

        if (result.rows.length === 0) {
          // First time login → create DrDB record
          result = await pool.query(
            "INSERT INTO DrDB (name, email, google_id) VALUES ($1, $2, $3) RETURNING *",
            [name, email, google_id],
          );
        }

        return done(null, result.rows[0]);
      } catch (err) {
        return done(err, null);
      }
    },
  ),
);

export default passport;

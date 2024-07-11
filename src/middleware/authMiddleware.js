const jwt = require("jsonwebtoken");
const passport = require("passport");
const passportJWT = require("passport-jwt");
const { ExtractJwt, Strategy: JwtStrategy } = passportJWT;
const {User} = require("../Model/user");

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,  
};

passport.use(
  new JwtStrategy(jwtOptions, async (payload, done) => {
    try {
      const user = await User.findById(payload.sub);
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (error) {
      return done(error, false);
    }
  })
);

module.exports = {
  authenticate: passport.authenticate("jwt", { session: false }),
};

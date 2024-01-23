const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('./models/user');

const customFields = {
  usernameField: 'email',
  passwordField: 'password',
};

async function verifyCallback(username, password, done) {
  try {
    const user = await User.findOne({ email: username }).exec();
    if (!user) {
      return done(null, false, {
        message: 'You have entered an invalid username or password',
        user: username,
      });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return done(null, false, {
        message: 'You have entered an invalid username or password',
        user: username,
      });
    }

    return done(null, user);
  } catch (err) {
    return done(err);
  }
}

const strategy = new LocalStrategy(customFields, verifyCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id).exec();
    done(null, user);
  } catch (err) {
    done(err);
  }
});

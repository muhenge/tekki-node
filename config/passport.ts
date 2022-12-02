import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { User } from "../app/models/user.entity";
import dbConfig from './ormconfig';
import * as bcrypt from 'bcryptjs';

const userRepository = dbConfig.getRepository(User);

const opts = {
  usernameField: "email",
  passwordField: "password",
}

export const verifyUser = async (email: string, password: string, done: any) => {
  try {
    const user = await userRepository.findOneBy({ email: email });
    if (!user) {
      return done(null, false);
    }
    if(!await bcrypt.compare(password, user.password)) {
      return done(null, false);
    }
    return done(null, user);

  } catch (err) {
    return done(err);
  }
};

const LocalStrategyConfig = new LocalStrategy(opts, verifyUser);

passport.use(LocalStrategyConfig);

passport.serializeUser((user: any, done: any) => {
  done(null, user.id);
  return user;
});

passport.deserializeUser((id: string, done: any) => {
  const user = userRepository.findOneBy({ id: id });
  if (!user) {
    return done(null, false);
  }
  return done(null, user);
});





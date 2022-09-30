import admin from './firebaseAuth/index.js';
import { User } from '../App/models/User.model.js';
import { whiteListUrls } from './utils.js';

const verifyFireBaseToken = async (req, res, next) => {
  try {
    if (whiteListUrls.includes(req.url.split('?')[0])) {
      next();
    } else {
      const userToken = await admin.auth().verifyIdToken(req.token);
      req.userToken = userToken;
      req.uid = userToken.uid;

      const user = await User.findOne({
        uid: req.uid,
      });

      if (user) {
        req.user = user;
      }
      next();
    }
  } catch (err) {
    console.error("firebase token middleware error", err);
    return res.status(401).send(err);
  }
};

export default verifyFireBaseToken;

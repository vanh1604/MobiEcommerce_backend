import jwt from "jsonwebtoken";
import dotenv from "dotenv";

const generalAccessToken = async (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "2h",
      },
      (err, token) => {
        if (err) {
          reject(err);
        } else {
          resolve(token);
        }
      }
    );
  });
};

const generalRefreshToken = async (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "365d",
      },
      (err, token) => {
        if (err) {
          reject(err);
        } else {
          resolve(token);
        }
      }
    );
  });
};
const refreshTokenJwt = async (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(
      token,
      process.env.REFRESH_TOKEN_SECRET,
      async (err, decoded) => {
        if (err) {
          reject(err);
        } else {
          const accessToken = await generalAccessToken({
            id: decoded.id,
            isAdmin: decoded.isAdmin,
          });
          console.log("accessToken", accessToken);
          resolve({ status: 200, messasge: "Token is valid", accessToken });
        }
      }
    );
  });
};

export { generalRefreshToken, generalAccessToken, refreshTokenJwt };

import { verifyJwtToken } from "../utils/service.js";

export default async function authorization(req, res, next) {
  const token = req.header("x-authorization");
  if (!token) {
    return res
      .status(401)
      .send({ status: 401, message: "Access denied! No token provided." });
  }
  try {
    const decode = await verifyJwtToken(token);
    req.user = decode;
    next();
  } catch (err) {
    return res.status(400).send({ status: 400, message: "Invalid token" });
  }
}

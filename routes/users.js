import express from "express";

import admin from "../middleware/admin.js";
import { users } from "../controller/users";

const router = express.Router();

// get all users list api
router.get("/", users.allUsers);

// get specific user information api
router.get("/:id", users.specificUserDetails);

// update the user information
router.put("/:id", users.updateSpecificUserDetails);

// delete user
router.delete("/:id", admin, users.deleteUser);

export default router;

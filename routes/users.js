import express from "express";

import admin from "../middleware/admin.js";
import { users } from "../controller/users";

const router = express.Router();

router.get("/", users.allUsers);
router.get("/:id", users.specificUserDetails);
router.put("/:id", users.updateSpecificUserDetails);
router.delete("/:id", admin, users.deleteUser);

export default router;

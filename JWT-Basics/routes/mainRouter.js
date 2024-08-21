const { Router } = require("express");
const { dashboard, login } = require("../controllers/myController");
const authMiddleware = require("../middlewares/auth-middleware");

const router = Router();

router.route("/login").post(login);
router.route("/dashboard").get(authMiddleware, dashboard);

module.exports = router;

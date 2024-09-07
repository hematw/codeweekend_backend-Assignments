const { Router } = require("express");
const createUser = require("../controllers/user");
const passportConfig = require("../middlewares/passportConfig")

const router = Router();

router
  .route("/login")
  .get((req, res) => {
    if (req.isAuthenticated()) {
      res.redirect("/secret");
    } else {
      res.render("login");
    }
  })
  .post(
    passportConfig.authenticate("local", { failureRedirect: "/login" }),
    (req, res, next) => {
      res.redirect("/secret");
    }
  );

router
  .route("/register")
  .post(createUser)
  .get((req, res) => {
    if (req.isAuthenticated()) {
      res.redirect("/secret");
    } else {
      res.render("register");
    }
  });

router.get("/logout", (req, res) => {
  req.logOut(() => res.redirect("/login"));
});

module.exports = router;

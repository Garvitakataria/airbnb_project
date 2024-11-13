const User = require("../models/user.js");

//signup form

module.exports.signupForm = (req, res) => {
  res.render("users/signup.ejs");
};

//signup post route

module.exports.signupUserPost = async (req, res) => {
  try {
    let { username, email, password } = req.body;
    let newUser = new User({ email, username });
    let registeredUser = await User.register(newUser, password);
    req.login(registeredUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "Welcome to WanderLust");
      res.redirect("/listings");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/signup");
  }
};

//login form get

module.exports.loginForm = (req, res) => {
  res.render("users/login.ejs");
};

//login post route

module.exports.loginUserPost = async (req, res) => {
  req.flash("success", "Welcome Back!");
  let redirectUrl = res.locals.redirectUrl || "/listings";
  //agar res.locals vala hai to vo daldo varna listings pe chale jaao
  //agar create ya edit vagera se nahi kar rhe seedha listings vale page se login kr rhe hai to
  //error aa skta tha agar seedha res.locals pe redirect kar jaate kyunki tab loggedin middleware trigger nahi hua islie or karke daala
  res.redirect(redirectUrl);
};

//logout route

module.exports.LogoutUser = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "you are logged out!");
    res.redirect("/listings");
  });
};

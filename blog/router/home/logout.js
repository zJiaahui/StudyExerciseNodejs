module.exports = (req, res) => {
  req.session.destroy(function() {
    res.clearCookie("connect.sid");
    req.app.locals.userInfo1 = null;
    console.log(req.app.locals.userInfo1);

    res.redirect("/home");
  });
};

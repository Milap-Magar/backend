const logout = (req,res)=>{
    res.clearCookie("adminRegistered");
    res.redirect("/");
}
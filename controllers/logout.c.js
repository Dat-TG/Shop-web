exports.logout=async(req, res, next)=>{
    try {
        req.session.uid=null;
        res.redirect('/login');
    } catch (err) {
        next(err);
    }
}
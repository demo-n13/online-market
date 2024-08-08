


export const login = (req, res) =>{
    const {login, password } = req.body
    
    //userni topish
    const foundedUser = 0
    if(!foundedUser){
        res.render('404', {message:'user not found'})
        return
    }
    // login vaqtida userlarni ROLE orqali ajratish
    switch(foundedUser.role){
        case "seller":
            res.redirect(`/seller?id=${foundedUser.id}`)
            break;
        case "customer":
            res.redirect(`/main?id=${foundedUser.id}`)
            break;
        case "superadmin":
            res.redirect(`/superadmin`)
            break;
        case "admin":
            res.redirect(`/admin?id=${foundedUser.id}`)
        default:
            res.redirect(`404'?message=${ "User not found role"}`) 
            break;
    }
}
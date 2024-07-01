const adminMiddleware = (req: any, res:any, next: any) => {
    if (req.user === null){
        return res.status(401).json({
            'text': 'Vartotojas neprisijungęs'
        })
    }
    if (req.user.type == 0){
        next();
    } else {
        console.log(req.user);
        return res.status(401).json({
            'text': 'Vartotojas neturi teisių atlikti veiksmus'
        })
    }
}; 

export { adminMiddleware }
import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized, token missing' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

export default auth;



// export const CheckedUser = async(req, res, next) => {
//    
// //    const use1 =  userId.split()[1]

//     console.log(userId)
//     // jwt.verify(userId, process.env.JWT_SECRET, (error, decoded) =>{
//         // if(error){
//         //     return res.sendStatus(401).json({message: "Invalid Token"})
//         // }
//         // req.id = decoded;
//         // console.log(decoded)
        
//     // })
//     next();
   
// }

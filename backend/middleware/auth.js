const jwt = require("jsonwebtoken");
const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/User");
const Role=require("../models/Role")

let id_User;
exports.protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
 

  if (!token) {
    return next(new ErrorResponse("Not authorized to access this route", 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);
    id_User=decoded.id
    console.log(decoded.id)
    if (!user) {
      return next(new ErrorResponse("No user found with this id", 404));
    }

    req.user = user;

    next();
  } catch (err) {
    return next(new ErrorResponse("Not authorized to access this router", 401));
  }
};


exports.isAuthorized = async (req, res, next) => {
  try {
    const user = await User.findById(id_User);
    console.log(user)
    const roles = await Role.find({ _id: { $in: user.roles } });
console.log(roles)
    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "lider"&& user.estado==="autorizado") {
        next();
        return;
      }

      else  if (roles[i].name === "usuario"&& user.estado==="autorizado") {
        next();
        return;
      }
      else if (roles[i].name === "admin"&&user.estado==="autorizado") {
    
      
        next();
        return;
      }
    }

    return res.status(403).json({ message: "Require  Role!" });
  } catch (error) {
    console.log(error)
    return res.status(500).send({ message: error });
  }
};

exports.isAdminorLeader= async (req, res, next) => {
  try {
    const user = await User.findById(id_User);
    console.log(user)
    const roles = await Role.find({ _id: { $in: user.roles } });
console.log(roles)
    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "lider"&& user.estado==="autorizado") {
        next();
        return;
      }

      
      else if (roles[i].name === "admin"&&user.estado==="autorizado") {
    
      
        next();
        return;
      }
    }

    return res.status(403).json({ message: "Require uaer or admin Role!" });
  } catch (error) {
    console.log(error)
    return res.status(500).send({ message: error });
  }
};

exports.isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(id_User);
    const roles = await Role.find({ _id: { $in: user.roles } });

    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "admin") {
        next();
        return;
      }
    }

    return res.status(403).json({ message: "Require Admin Role!" });
  } catch (error) {
    console.log(error)
    return res.status(500).send({ message: error });
  }
};
exports.isUser = async (req, res, next) => {
  try {
    const user = await User.findById(id_User);
    const roles = await Role.find({ _id: { $in: user.roles } });

    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "usuario"&&user.estado==="autorizado") {
        next();
        return;
      }
    }

    return res.status(403).json({ message: "Require Usuario Role!" });
  } catch (error) {
    console.log(error)
    return res.status(500).send({ message: error });
  }
};

exports.isLeader = async (req, res, next) => {
  try {
    const user = await User.findById(id_User);
    const roles = await Role.find({ _id: { $in: user.roles } });

    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "lider") {
        next();
        return;
      }
    }

    return res.status(403).json({ message: "Require Lider Role!" });
  } catch (error) {
    console.log(error)
    return res.status(500).send({ message: error });
  }
};

exports.isUserorLeader= async (req, res, next) => {
  try {
    const user = await User.findById(id_User);
    console.log(user)
    const roles = await Role.find({ _id: { $in: user.roles } });
console.log(roles)
    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "usuario"&& user.estado==="autorizado") {
        next();
        return;
      }

      
      else if (roles[i].name === "lider"&&user.estado==="autorizado") {
    
      
        next();
        return;
      }
    }

    return res.status(403).json({ message: "Require user or admin Role !" });
  } catch (error) {
    console.log(error)
    return res.status(500).send({ message: error });
  }
};

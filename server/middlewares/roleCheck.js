const roleCheck = (requiredRole) => {
  return (req, res, next) => {
    if (req.user && req.user.role === requiredRole) {
      return next();
    }
    return res.status(403).json({ error: 'Access denied: insufficient permissions' });
  };
};

module.exports = roleCheck;

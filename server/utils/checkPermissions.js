const checkPermissions = (requestUser, resourceUserId) => {
  if (requestUser._id.toString() === resourceUserId._id.toString()) {
    return;
  } else {
    throw new Error('UnauthorizedAccess');
  }
};

export default checkPermissions;

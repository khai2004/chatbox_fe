export const getRecieverId = (user, users) => {
  return user._id === users[0]?._id ? users[1]?._id : users[0]?._id;
};

export const getRecieverPicture = (user, users) => {
  return user._id === users[0]?._id ? users[1]?.picture : users[0]?.picture;
};
export const getRecieverName = (user, users) => {
  return user._id === users[0]?._id ? users[1]?.name : users[0]?.name;
};

export const checkOnlineStatus = (onlineUsers, user, users) => {
  const conveId = getRecieverId(user, users);
  let check = onlineUsers.find((u) => u.userId === conveId);
  return check ? true : false;
};

export const getRecieverId = (user, users) => {
  return user._id === users[0]?._id ? users[1]?._id : users[0]?._id;
};

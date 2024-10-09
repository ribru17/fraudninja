const reducer = (users = [], action: any) => {
  switch (action.type) {
    case "FETCH_ALL":
      return action.payload;
    case "CREATE":
      return [...users, action.payload];
    default:
      return users;
  }
};

export default reducer;

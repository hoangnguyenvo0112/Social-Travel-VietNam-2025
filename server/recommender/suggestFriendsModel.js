const suggestFriendsModel = (friendData, userId) => {
  // const friendData = {
  //   user1: ["user2", "user3", "user5", "user6", "user7"],
  //   user2: ["user5", "user6", "user7"],
  //   user3: ["user1", "user7", "user6", "user5"],
  //   user4: ["user1", "user2", "user3", "user5"],
  //   user5: ["user7"],
  // };

  // Hàm gợi ý kết bạn dựa trên bạn bè chung
  function suggestFriends(userId) {
    const userFriends = friendData[userId];
    const suggestedFriends = {};

    // Duyệt qua từng người dùng đã kết bạn với người dùng cụ thể
    for (const friend of userFriends) {
      const friendFriends = friendData[friend];

      // Duyệt qua từng bạn bè của người dùng đã kết bạn
      for (const suggestedFriend of friendFriends) {
        // Bỏ qua nếu người dùng đã kết bạn với người này hoặc đã gợi ý trước đó
        if (
          userFriends.includes(suggestedFriend) ||
          suggestedFriend === userId
        ) {
          continue;
        }

        // Tăng số lượng bạn bè chung
        if (!suggestedFriends[suggestedFriend]) {
          suggestedFriends[suggestedFriend] = 0;
        }
        suggestedFriends[suggestedFriend]++;
      }
    }

    // Sắp xếp và trả về danh sách gợi ý kết bạn
    const sortedSuggestions = Object.entries(suggestedFriends)
      .sort((a, b) => b[1] - a[1])
      .map(([friend, count]) => friend);

    return sortedSuggestions;
  }

  // Sử dụng hàm gợi ý kết bạn

  const suggestedFriends = suggestFriends(userId);

  return suggestedFriends;
};

module.exports = suggestFriendsModel;

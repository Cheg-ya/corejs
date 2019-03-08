export const immutable = object => {
  return JSON.parse(JSON.stringify(object));
};

export const getTagsName = (target, tagList) => {
  let containerWithIds = [];

  target.forEach(({ stacks }) => {
    containerWithIds = containerWithIds.concat(stacks);
  });

  let containerWithName = containerWithIds.map(id => {
    const stack = tagList[id];
    return {
      id: stack.id,
      name: `#${stack.name}`
    };
  });

  target.forEach(({ stacks }, i) => {
    target[i].stacks = containerWithName.slice(0, stacks.length);
    containerWithName = containerWithName.slice(stacks.length);
  });

  return target;
};

export const getUserById = (ids, userList) => {
  const popularUserInfo = {};

  ids.forEach(id => {
    if (userList[id]) {
      popularUserInfo[id] = userList[id];
    }
  });

  return popularUserInfo;
};

export const getAuthorInfo = (target, userList) => {
  target.forEach(({ postedBy }, i) => {
    const author = userList[postedBy];

    if (author) {
      target[i].postedBy = {
        id: author.id,
        name: author.name,
        profileImage: author.profile_image
      }
    }
  });

  return target;
};

export const getReviewerInfo = (target, userList) => {
  let containerWithIds = [];
  
  target.forEach(({ reviewers }) => {
    containerWithIds = containerWithIds.concat(reviewers);
  });

  let containerWithName = containerWithIds.map(id => {
    const reviewer = userList[id];
    return {
      id: reviewer.id,
      name: reviewer.name
    };
  });

  target.forEach(({ reviewers }, i) => {
    target[i].reviewers = containerWithName.slice(0, reviewers.length);
    containerWithName = containerWithName.slice(reviewers.length);
  });

  return target;
};

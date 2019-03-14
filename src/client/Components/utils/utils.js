export const immutable = object => {
  return JSON.parse(JSON.stringify(object));
};

export const getCommentInfo = (target, commentList) => {
  if (!(target instanceof Array)) {
    return alert('Utils: getComments\nmessage: Array required!')
  }

  let containerWithIds = [];

  target.forEach(({ comments }) => {
    containerWithIds = containerWithIds.concat(comments);
  });

  let containerWithName = containerWithIds.map(id => commentList[id]);

  target.forEach(({ comments }, i) => {
    target[i].comments = containerWithName.slice(0, comments.length);
    containerWithName = containerWithName.slice(comments.length);
  });
  // debugger;
  return target;
};

export const getTagsName = (target, tagList) => {
  if (!(target instanceof Array)) {
    return alert('Utils: getTagsName\nmessage: Array required!')
  }

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
  if (!(ids instanceof Array)) {
    return alert('Utils: getUserById\nmessage: Array required!')
  }

  const popularUserInfo = {};

  ids.forEach(id => {
    if (userList[id]) {
      popularUserInfo[id] = userList[id];
    }
  });

  return popularUserInfo;
};

export const getAuthorInfo = (target, userList) => {
  if (!(target instanceof Array)) {
    return alert('Utils: getAuthorInfo\nmessage: Array required!')
  }

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
  if (!(target instanceof Array)) {
    return alert('Utils: getReviewerInfo\nmessage: Array required!')
  }

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

export const countReviewers = reviewers => {
  if (!reviewers.length) {
    return '';
  }

  switch (reviewers.length) {
    case 2:
      return `${reviewers[0].name} & ${reviewers[1].name} reviewing`;
    case 1:
      return `${reviewers[0].name} reviewing`;
    default :
      return `${reviewers[0].name} & ${reviewers.length - 1} others reviewing`;
  }
};

export const convertDateType = targetDate => {
  const date = new Date(targetDate).toString().split(' ');
  return `${date[2]} ${date[1]} ${date[3]}`;
};

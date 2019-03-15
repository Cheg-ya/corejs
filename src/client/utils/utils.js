import _ from 'lodash';

export const immutable = object => {
  if (!(object instanceof Object)) {
    return alert('Utils: immutable\nmessage: Object required!');
  }

  return JSON.parse(JSON.stringify(object));
};

export const getCommentInfo = (target, commentList, users) => {
  if (!(target instanceof Array)) {
    return alert('Utils: getComments\nmessage: Array required!');
  }

  if (!(commentList instanceof Object)) {
    return alert('Utils: getCommentInfo\nmessage: Object required!');
  }

  let containerWithIds = [];

  target.forEach(({ comments }) => {
    containerWithIds = containerWithIds.concat(comments);
  });

  let containerWithName = containerWithIds.map(id => commentList[id]);

  containerWithName.forEach((comment, i) => {
    const authorInfo = getAuthorInfo([comment], users)[0].postedBy;
    containerWithName[i].postedBy = authorInfo;
  });

  target.forEach(({ comments }, i) => {
    target[i].comments = containerWithName.slice(0, comments.length);
    containerWithName = containerWithName.slice(comments.length);
  });

  return target;
};

export const getTagsName = (target, tagList) => {
  if (!(target instanceof Array)) {
    return alert('Utils: getTagsName\nmessage: Array required!');
  }

  if (!(tagList instanceof Object)) {
    return alert('Utils: getTagsName\nmessage: Object required!');
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
    return alert('Utils: getUserById\nmessage: Array required!');
  }

  if (!(userList instanceof Object)) {
    return alert('Utils: getUserById\nmessage: Object required!');
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
    return alert('Utils: getAuthorInfo\nmessage: Array required!');
  }

  if (!(userList instanceof Object)) {
    return alert('Utils: getAuthorInfo\nmessage: Object required!');
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
    return alert('Utils: getReviewerInfo\nmessage: Array required!');
  }

  if (!(userList instanceof Object)) {
    return alert('Utils: getReviewerInfo\nmessage: Object required!');
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
  if (!(reviewers instanceof Array)) {
    return alert('Utils: countReviewers\nmessage: Array required!');
  }

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
  if (!(typeof targetDate === 'string')) {
    return alert('Utils: convertDateType\nmessage: string required!');
  }

  const date = new Date(targetDate).toString().split(' ');

  return `${date[2]} ${date[1]} ${date[3]}`;
};

export const organizeData = dataChunk => {
  let container = {};

  dataChunk.forEach(data => {
    const { _id } = data;
    delete data._id;

    let reply;

    if (data.reply && data.reply.length) {
      reply = organizeData(data.reply);
      data.reply = _.keys(reply);
    }

    if (reply) {
      container = _.assign(container, reply);
    }

    container[_id] = { id: _id, ...data };
  });

  return container;
};


export const addNewTags = (origin, tags) => {
  const newTags = immutable(tags);
  const tagIds = _.keys(newTags);

  tagIds.forEach(id => {
    if (origin[id]) {
      delete newTags[id];
    }
  });

  return addNewData(origin, newTags);
};

export const addNewData = (origin, target) => {
  return {
    ...origin,
    ...target
  };
};

export const getUserFormat = action => {
  const { id, name, stacks, profile_image, github_url, description } = action;
  return {
    [id]: {
      id,
      name,
      profile_image,
      github_url,
      description,
      stacks: _.keys(stacks)
    }
  };
};

export const getPostFormat = action => {
  const { id, title, description, created_at, stacks, postedBy, reviewers, code, comments } = action;

  return {
    [id]: {
      id,
      postedBy: _.keys(postedBy)[0],
      title,
      description,
      created_at,
      code,
      reviewers: _.keys(reviewers),
      stacks: _.keys(stacks),
      comments: _.keys(comments)
    }
  };
};

const dummy = (blogs) => {
  return (blogs = 1);
};

const totalLikes = (list) => {
  let a = 0;
  for (const i of list) {
    a += i.likes;
  }
  return a;
};

module.exports = {
  dummy,
  totalLikes,
};

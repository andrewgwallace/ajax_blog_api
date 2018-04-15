// models/blogpost.js
const uuid = require('uuid/v1');
const fs = require('fs');
const path = require('path');
const blogpostsPath = path.join(__dirname, '..', 'data', 'blogposts.json');
const blogpostsJSON = fs.readFileSync(blogpostsPath, 'utf8');
const blogposts = JSON.parse(blogpostsJSON);

const readAll = () => {
  return blogposts;
}

const readIndividual = (id) => {
  const filteredBlogposts = blogposts.filter( blogpost => blogpost.id === id);
  const blogpost = filteredBlogposts[0];
  return blogpost;
}

const create = (blogpost) => {
  blogpost.id = uuid();
  blogposts.push(blogpost);
  fs.writeFileSync(blogpostsPath, JSON.stringify(blogposts));
  return blogpost;
}

const update = (id, updates) => {
  let result;
  const updatedBlogposts = blogposts.map( blogpost => {
    if (blogpost.id === id) {
      result = { ...blogpost, ...updates }; // we have a match and we transform blogpost
      return result;
    } else {
      return blogpost;
    }
  });
  fs.writeFileSync(blogpostsPath, JSON.stringify(updatedBlogposts));
  return result;
}

const destroy = (id) => {
  let result;
  const remainingblogposts = blogposts.filter( blogpost => {
    if ( blogpost.id === id ) {
      result = blogpost;
    }
    return blogpost.id !== id;
  }) ;
  fs.writeFileSync(blogpostsPath, JSON.stringify(remainingblogposts));
  return result;
}

module.exports = {
  readAll,
  readIndividual,
  create,
  update,
  destroy
};

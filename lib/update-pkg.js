module.exports = (
  {
    name,
    description,
    username,
    email
  },
  data
) => {
  return {
    name,
    "version": "0.0.0",
    description,
    "main": "/src/export.js",
    "scripts": {
      "start": "webpack",
      "server": "webpack-dev-server --open  --hot"
    },
    "babel": {},
    repository: {
      type: 'git',
      url: `${username}/${name}`,
    },
    "keywords": [
      "megrez",
      "tool",
      "winning"
    ],
    author: `${username}<${email}>`,
    "license": "ISC"
  }
}

function getUser(client, id) {
  return client.users.cache.get(id);
}

module.exports = {
  getUser,
}
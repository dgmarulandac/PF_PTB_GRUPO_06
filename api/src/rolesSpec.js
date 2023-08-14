function initial(Role) {
  Role.create({
    id: 1,
    type: "buyer"
  });
  Role.create({
    id: 2,
    type: "seller"
  });
  Role.create({
    id: 3,
    type: "admin"
  });
}

module.exports = {initial};
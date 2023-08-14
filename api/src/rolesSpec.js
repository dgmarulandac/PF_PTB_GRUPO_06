const buyerRole = "buyer";
const sellerRole = "seller";
const adminRole = "admin";

function initial(Role) {
  Role.create({
    id: 1,
    type: buyerRole
  });
  Role.create({
    id: 2,
    type: sellerRole
  });
  Role.create({
    id: 3,
    type: adminRole
  });
}

module.exports = {initial, buyerRole, sellerRole, adminRole};
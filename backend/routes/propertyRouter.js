const express = require("express");
const {
  getAllPropertys,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
} = require("../controllers/propertyControllers");

const router = express.Router();

router.get("/", getAllPropertys);
router.post("/", createProperty);
router.get("/:propertyId", getPropertyById);
router.put("/:propertyId", updateProperty);
router.delete("/:propertyId", deleteProperty);

module.exports = router;

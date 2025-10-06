const express = require("express");
const {
    getAllPropertys,
    getPropertyById,
    createProperty,
    updateProperty,
    deleteProperty,
} = require("../controllers/propertyControllers");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

router.get("/", getAllPropertys);
router.get("/:propertyId", getPropertyById);
router.use(requireAuth);
router.post("/", createProperty);
router.put("/:propertyId", updateProperty);
router.delete("/:propertyId", deleteProperty);

module.exports = router;

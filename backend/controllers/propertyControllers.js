const Property = require("../models/propertyModel");
const mongoose = require("mongoose");

//GET / propertys;
const getAllPropertys = async (req, res) => {
  try {
    const propertys = await Property.find({}).sort({ createdAt: -1 });
    res.status(200).json(propertys);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve propertys" });
  }
};

// POST /propertys
const createProperty = async (req, res) => {
  try {
    const newProperty = await Property.create({ ...req.body });
    res.status(201).json(newProperty);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Failed to create property", error: error.message });
  }
};

// GET /propertys/:propertyId
const getPropertyById = async (req, res) => {
  const { propertyId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(propertyId)) {
    return res.status(400).json({ message: "Invalid property ID" });
  }

  try {
    const property = await Property.findById(propertyId);
    if (property) {
      res.status(200).json(property);
    } else {
      res.status(404).json({ message: "Property not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve property" });
  }
};

// PUT /propertys/:propertyId
const updateProperty = async (req, res) => {
  const { propertyId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(propertyId)) {
    return res.status(400).json({ message: "Invalid property ID" });
  }

  try {
    const updatedProperty = await Property.findOneAndUpdate(
      { _id: propertyId },
      { ...req.body },
      { new: true }
    );
    if (updatedProperty) {
      res.status(200).json(updatedProperty);
    } else {
      res.status(404).json({ message: "Property not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to update property" });
  }
};

// DELETE /propertys/:propertyId
const deleteProperty = async (req, res) => {
  const { propertyId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(propertyId)) {
    return res.status(400).json({ message: "Invalid property ID" });
  }

  try {
    const deletedProperty = await Property.findOneAndDelete({ _id: propertyId });
    if (deletedProperty) {
      res.status(204).send(); // 204 No Content
    } else {
      res.status(404).json({ message: "Property not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to delete property" });
  }
};

module.exports = {
  getAllPropertys,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
};

const Property = require("../schema/property");

exports.addProperty = async (req, res) => {
    try {
        const { name, description, address, latitude, longitude } = req.body;

        if (!name || !description || !address || !latitude || !longitude) {
            return res.status(400).json({ message: "All fields are required." });
        }

        if (!req.file) {
            return res.status(400).json({ message: "Property image is required." });
        }

        const image = req.file.path;

        const newProperty = new Property({
            name,
            description,
            address,
            latitude,
            longitude,
            image
        });

        await newProperty.save();
        
        res.status(201).json({ message: "Property added successfully." });

    } catch (error) {
        console.error("Add property error:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};



exports.showProperty = async (req, res) => {
    try {
        const properties = await Property.find();

        res.status(200).json(properties);
    } catch (error) {
        console.error("Fetch properties error:", error);
        res.status(500).json({ message: "Internal server error." });
    }
}



exports.updateProperty = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, address, latitude, longitude } = req.body;

        const property = await Property.findById(id);

        if (!property) {
            return res.status(404).json({ message: "Property not found." });
        }

        if (name) property.name = name;
        if (description) property.description = description;
        if (address) property.address = address;
        if (latitude) property.latitude = latitude;
        if (longitude) property.longitude = longitude;

        if (req.file) {
            property.image = req.file.path;
        }

        await property.save();

        res.status(200).json({ message: "Property updated successfully." });

    } catch (error) {
        console.error("Update property error:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};



exports.deleteProperty = async (req, res) => {
    try {
        const { id } = req.params;

        const property = await Property.findByIdAndDelete(id);
        
        if (!property) {
            return res.status(404).json({ message: "Property not found." });
        }

        res.status(200).json({ message: "Property deleted successfully." });

    } catch (error) {
        console.error("Delete property error:", error);
        res.status(500).json({ message: "Internal server error." });
    }
}

exports.getproparty = async (req, res) => {
    try {
        const { id } = req.params;
        const properties = await Property.findById(id);

        res.status(200).json(properties);
    } catch (error) {
        console.error("Fetch properties error:", error);
        res.status(500).json({ message: "Internal server error." });
    }
}

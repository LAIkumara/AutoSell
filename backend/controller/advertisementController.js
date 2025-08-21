import Advertisement from "../models/ads.js";
import Category from "../models/categories/category.js";
import SubCategory from "../models/categories/SubCategory.js";

export async function createAdvertisement(req, res) {
    // Generate the next adId by incrementing the last adId
    const latestAd = await Advertisement.find().sort({ createdAt: -1 }).limit(1);
    let adId = "AD000101";

    if (latestAd.length > 0) {
        const lastAdId = latestAd[0].adId;
        const lastAdIdWithoutPrefix = lastAdId.replace("AD", "");
        const lastAdIdInInteger = parseInt(lastAdIdWithoutPrefix);
        const newAdIdInInteger = lastAdIdInInteger + 1;
        const newAdIdWithoutPrefix = newAdIdInInteger
            .toString()
            .padStart(6, "0");
        adId = "AD" + newAdIdWithoutPrefix;
    }

    try {
        if (!req.user) {
            return res.status(401).json({
                message: "Please login to create an advertisement"
            });
        }

        // Validate required fields
        const requiredFields = ['title', 'description', 'category', 'price'];
        const missingFields = requiredFields.filter(field => !req.body[field]);
        
        if (missingFields.length > 0) {
            return res.status(400).json({
                message: "Missing required fields",
                missingFields
            });
        }

        // Validate category, altCategory, brand, model, and submodel existence
        const { category, altCategory, brand, model, submodel } = req.body;

        // Fetch category to check existence
        const categoryData = await Category.findById(category);
        if (!categoryData) {
            return res.status(400).json({
                message: "Invalid category selected"
            });
        }

        // Fetch altCategory to check existence
        const altCategoryData = categoryData.altCategories.find(ac => ac.name === altCategory);
        if (!altCategoryData) {
            return res.status(400).json({
                message: "Invalid sub-category selected"
            });
        }

        // Fetch brand to check existence
        const brandData = altCategoryData.brands.find(b => b.name === brand);
        if (!brandData) {
            return res.status(400).json({
                message: "Invalid brand selected"
            });
        }

        // Fetch model to check existence
        const modelData = brandData.models.find(m => m.name === model);
        if (!modelData) {
            return res.status(400).json({
                message: "Invalid model selected"
            });
        }

        // Validate submodel (optional)
        if (submodel && !modelData.submodels.find(sm => sm.name === submodel)) {
            return res.status(400).json({
                message: "Invalid submodel selected"
            });
        }

        // Prepare the advertisement data
        const advertisementData = {
            ...req.body,
            author: req.user.userID,
            adId: adId,
            status: 'pending' // Add default status
        };

        const advertisement = new Advertisement(advertisementData);
        const savedAdvertisement = await advertisement.save();
        
        res.status(201).json({
            success: true,
            message: "Advertisement created successfully",
            data: savedAdvertisement
        });

    } catch (error) {
        console.error("Advertisement creation error:", error);
        res.status(500).json({
            success: false,
            message: "Error creating advertisement",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
}

export async function getAdvertisements(req, res) {
    try {
        const advertisements = await Advertisement.find().sort({ createdAt: -1 });
        
        res.status(200).json({
            success: true,
            data: advertisements
        });
    } catch (error) {
        console.error("Error fetching advertisements:", error);
        res.status(500).json({
            success: false,
            message: "Error fetching advertisements",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
}

// Get advertisement by user ID
export async function getAdvertisementById(req, res) {
    const { userID } = req.params;
    try {
        const advertisements = await Advertisement.find({ 
            $or: [
                { 'author.authorId': userID },
                { authorId: userID },
                { author: userID }
            ]
        }).sort({ createdAt: -1 });
                
        if (advertisements.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No advertisements found for this user"
            });
        }

        res.status(200).json({
            success: true,
            data: advertisements
        });
    } catch (error) {
        console.error("Error fetching advertisement by user ID:", error);
        res.status(500).json({
            success: false,
            message: "Error fetching advertisement",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
}

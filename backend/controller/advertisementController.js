import Advertisement from "../models/ads.js";

export async function createAdvertisement(req, res) {

    // Generate the next adId by incrementing the last adId
    
    const latestAd = await Advertisement.find().sort({ createdAt: -1 }).limit(1);
    let adId = "AD000101";

    if (latestAd.length > 0) {
        // Generate the next adId by incrementing the last adId
        const lastAdId = latestAd[0].adId;
        const lastAdIdWithoutPrefix = lastAdId.replace("AD", "");
        // Convert to integer and increment
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
    
}
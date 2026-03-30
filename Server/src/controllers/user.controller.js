import { User } from "../models/user.model.js";

// Helper function for validation
const validateUser = (user) => {
    const errors = [];
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;

    if (!user.fullName || user.fullName.trim().length < 3) {
        errors.push("fullName must be at least 3 characters");
    }
    if (!user.email || !emailRegex.test(user.email)) {
        errors.push("Invalid email format");
    }
    if (!user.Phone || !phoneRegex.test(user.Phone)) {
        errors.push("Phone must be exactly 10 digits");
    }
    if (user.kycStatus && !["pending", "approved", "rejected"].includes(user.kycStatus)) {
        errors.push("Invalid kycStatus. Must be 'pending', 'approved', or 'rejected'");
    }

    return errors;
};

export const bulkCreate = async (req, res) => {
    try {
        const usersData = Array.isArray(req.body) ? req.body : [req.body];

        if (usersData.length === 0) {
            return res.status(400).json({ success: false, message: "No user data provided" });
        }

        // Validate each user and collect errors
        const validationErrors = [];
        usersData.forEach((user, index) => {
            const errors = validateUser(user);
            if (errors.length > 0) {
                validationErrors.push({ index, errors });
            }
        });

        if (validationErrors.length > 0) {
            return res.status(400).json({ success: false, message: "Validation failed for some users", errors: validationErrors });
        }

        // Use ordered: false so if one fails, others still proceed
        const result = await User.insertMany(usersData, { ordered: false });

        res.status(201).json({ success: true, count: result.length, data: result });
    } catch (error) {
        console.log("Error in bulkCreate:", error);
        res.status(500).json({ success: false, message: error.message });
    }
}



export const bulkUpdate = async (req, res) => {
    try {
        const updates = Array.isArray(req.body) ? req.body : [req.body];

        if (updates.length === 0) {
            return res.status(400).json({ success: false, message: "No update data provided" });
        }

        // Validate each update (Note: Only Phone is mandatory for update filter, others are optional)
        const validationErrors = [];
        updates.forEach((user, index) => {
            if (!user.Phone) {
                validationErrors.push({ index, errors: ["Phone is required for update"] });
            } else {
                const errors = validateUser(user); 
                if (errors.length > 0) {
                    validationErrors.push({ index, errors });
                }
            }
        });

        if (validationErrors.length > 0) {
            return res.status(400).json({ success: false, message: "Validation failed for some updates", errors: validationErrors });
        }

        const operations = updates.map(user => ({

            updateOne: {
                filter: { Phone: user.Phone },
                update: {
                    $set: {
                        fullName: user.fullName,
                        email: user.email,
                        walletBalance: user.walletBalance,
                        isBlocked: user.isBlocked,
                        kycStatus: user.kycStatus,
                        deviceInfo: user.deviceInfo
                    }
                }
            }
        }));

        const result = await User.bulkWrite(operations);

        res.status(200).json({ 
            success: true, 
            matchedCount: result.matchedCount, 
            modifiedCount: result.modifiedCount 
        });
    } catch (error) {
        console.log("Error in bulkUpdate:", error);
        res.status(500).json({ success: false, message: error.message });
    }
}
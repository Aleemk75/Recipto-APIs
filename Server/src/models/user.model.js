import mongoose from "mongoose";


const userSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true,
        minLength: 3,

    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email address"]
    },

    Phone: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        match: [/^\d{10}$/, "Please enter a valid phone number"]
    },
    walletBalance: {
        type: Number,
        default: 0,
        min: 0
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
    kycStatus: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending"
    },

    deviceInfo: {
        ipAddress: {
            type: String,
            trim: true
        },
        deviceType: {
            type: String,
            enum: ["Mobile", "Desktop", "Tablet", "Unknown"],
            default: "Unknown"
        },
        os: {
            type: String,
            enum: ["Android", "iOS", "Windows", "macOS", "Linux", "Unknown"],
            default: "Unknown"
        },
        userAgent: {
            type: String,
            trim: true
        }
    },
}, {
    timestamps: true
});

export const User = mongoose.model("User", userSchema);

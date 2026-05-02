import mongoose,{Schema} from 'mongoose';
import { sessionState } from '../../config/contants.js';

const sessionSchema = new Schema({
    sessionId: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: 'users'
    },
    sessionState: {
        type: String,
        enum: sessionState,
        default:"Logined"  
    },
    expiresAt: {
        type: Date,
        required: true,
    }
}, { timestamps: true, versionKey: false });

sessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const UserSession = mongoose.model('user-sessions', sessionSchema);

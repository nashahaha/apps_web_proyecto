import mongoose from "mongoose";

interface UserData {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
}

const userSchema = new mongoose.Schema<UserData>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

userSchema.set("toJSON", {
    transform: (
        document,
        returnedObject: {
            id?: string;
            _id?: mongoose.Types.ObjectId;
            __v?: number;
            passwordHash?: string;
        }
    ) => {
        returnedObject.id = returnedObject._id ? returnedObject._id.toString() : "";
        delete returnedObject._id;
        delete returnedObject.__v;
        delete returnedObject.passwordHash;
    },
});

export default User;

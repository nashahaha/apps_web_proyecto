import mongoose from "mongoose";

interface UserData {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  favoriteRecipes: mongoose.Types.ObjectId[];
  myRecipes: mongoose.Types.ObjectId[];
}

const userSchema = new mongoose.Schema<UserData>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  favoriteRecipes: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Recipe',
    default: []
  }],
  myRecipes: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Recipe',
    default: []
  }],
}, {
  collection: 'nomnom_users' 
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
            favoriteRecipes?: mongoose.Types.ObjectId[];
            myRecipes?: mongoose.Types.ObjectId[];
        }
    ) => {
        returnedObject.id = returnedObject._id ? returnedObject._id.toString() : "";
        delete returnedObject._id;
        delete returnedObject.__v;
        delete returnedObject.passwordHash;
        // Convertir ObjectIds a strings para el JSON
        if (returnedObject.favoriteRecipes) {
            returnedObject.favoriteRecipes = returnedObject.favoriteRecipes.map(id => id.toString()) as any;
        }
        if (returnedObject.myRecipes) {
            returnedObject.myRecipes = returnedObject.myRecipes.map(id => id.toString()) as any;
        }
    },
});

export default User;

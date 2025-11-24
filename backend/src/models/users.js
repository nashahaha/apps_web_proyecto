import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
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
});
const User = mongoose.model("User", userSchema);
userSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id ? returnedObject._id.toString() : "";
        delete returnedObject._id;
        delete returnedObject.__v;
        delete returnedObject.passwordHash;
        // Convertir ObjectIds a strings para el JSON
        if (returnedObject.favoriteRecipes) {
            returnedObject.favoriteRecipes = returnedObject.favoriteRecipes.map(id => id.toString());
        }
        if (returnedObject.myRecipes) {
            returnedObject.myRecipes = returnedObject.myRecipes.map(id => id.toString());
        }
    },
});
export default User;
//# sourceMappingURL=users.js.map
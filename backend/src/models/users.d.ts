import mongoose from "mongoose";
interface UserData {
    id: string;
    name: string;
    email: string;
    passwordHash: string;
    favoriteRecipes: mongoose.Types.ObjectId[];
    myRecipes: mongoose.Types.ObjectId[];
}
declare const User: mongoose.Model<UserData, {}, {}, {}, mongoose.Document<unknown, {}, UserData, {}, mongoose.DefaultSchemaOptions> & UserData & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<UserData, mongoose.Model<UserData, any, any, any, mongoose.Document<unknown, any, UserData, any, {}> & UserData & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, UserData, mongoose.Document<unknown, {}, mongoose.FlatRecord<UserData>, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & mongoose.FlatRecord<UserData> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default User;
//# sourceMappingURL=users.d.ts.map
import mongoose from "mongoose"

export const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://greatstack:quang20o2@cluster0.lgo6u3h.mongodb.net/FoodWeb"
    )
    .then(() => console.log("DB Connected"))
}

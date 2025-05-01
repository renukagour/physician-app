import mongoose, { Schema } from "mongoose";

const doctorSchema = new Schema(
  {
    name: String,
    specialty: String,
    experience: Number,
    qualification: String,
    city: String,
    clinic: String,
    imageUrl: String,
    onlineFee: Number,
    visitFee: Number,
    onlineTime: String,
    visitTime: String,
  },
  { timestamps: true }
);

const Doctor = mongoose.models.Doctor || mongoose.model("Doctor", doctorSchema);

export default Doctor;

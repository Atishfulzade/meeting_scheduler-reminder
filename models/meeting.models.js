import mongoose from 'mongoose';

const meetingSchema = new mongoose.Schema({
  title: String,
  description: String,
  duration: Number,
  date: Date,
  participants: [String],
});

export const Meeting = mongoose.model('Meeting', meetingSchema);

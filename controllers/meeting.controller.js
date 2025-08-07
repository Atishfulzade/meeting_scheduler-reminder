import { Meeting } from '../models/meeting.models.js';
import { sendEmail } from '../utils/sendMail.js';
import cron from 'node-cron';

export const createMeeting = async (req, res) => {
  const { title, description, duration, date, participants } = req.body;

  try {
    await Meeting.create({ title, description, duration, date, participants });

    // Send invites
    participants.forEach((email) => {
      sendEmail(
        email,
        'Meeting Invitation',
        `You are invited to a meeting on ${new Date(date)}`
      );
    });

    // Schedule reminders 10 mins before
    const reminderTime = new Date(new Date(date).getTime() - 10 * 60000);
    const cronTime = `${reminderTime.getMinutes()} ${reminderTime.getHours()} ${reminderTime.getDate()} ${
      reminderTime.getMonth() + 1
    } *`;

    cron.schedule(cronTime, () => {
      participants.forEach((email) => {
        sendEmail(
          email,
          'Meeting Reminder',
          `Reminder: Join the meeting "${title}" at ${new Date(date)}`
        );
      });
    });

    res.status(201).json({ message: 'Meeting created successfully!' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getMeetingSummary = async (req, res) => {
  try {
    const summary = await Meeting.aggregate([
      { $unwind: '$participants' }, 
      { $group: { _id: '$participants', totalMeetings: { $sum: 1 } } }, 
      { $sort: { totalMeetings: -1 } }, 
    ]);

    res.status(200).json(summary);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

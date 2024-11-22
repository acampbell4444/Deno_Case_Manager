import { createAsyncThunk } from '@reduxjs/toolkit';
import Postalmime from 'postal-mime';
import moment from 'moment';

// Define the type for a single parsed email
interface ParsedEmail {
  id: number;
  subject: string | null;
  from: string;
  to: string;
  date: string | null;
  text: string | null;
}

const fetchEmails = async (): Promise<any> => {
  const michelleEmails = await fetch("/AllEmails.txt");
  const cathyEmails = await fetch("/AllEmails2.txt");

  const michelleText = await michelleEmails.text();
  const cathyText = await cathyEmails.text();
  return {
    michelleText,
    cathyText,
  }

  // return response.text();
};

export const fetchAndParseEmails = createAsyncThunk<
  any,
  void, // No argument passed in the thunk
  { rejectValue: string } // Type for the rejectWithValue
>(
  'emails/fetchAndParseEmails',
  async (_, { rejectWithValue }) => {
      // const text = await fetchEmails();
      const { michelleText, cathyText } = await fetchEmails();
      const michelleEmails = parseEmailsByMessageID(michelleText);
      const cathyEmails = parseEmailsByMessageID(cathyText);

      // const emails = parseEmailsByMessageID(text);

      // const parsedEmails = await Promise.all(
      //   emails.map(async (email) => await Postalmime.parse(email))
      // );

      const parsedMichelleEmails = await Promise.all(
        michelleEmails.map(async (email) => await Postalmime.parse(email))
      );

      const parsedCathyEmails = await Promise.all(
        cathyEmails.map(async (email) => await Postalmime.parse(email))
      );

      const filteredSortedMichelleEmails = parsedMichelleEmails
        .filter((email) => Boolean(email.date && email.text))
        .sort((a, b) => moment(a.date).unix() - moment(b.date).unix())
        .map((email, index) => {
          const emailTo = email?.to ? email.to[0].address : null;
          return {
            id: index,
            subject: email?.subject ?? null,
            from: email?.from?.address || "N/A",
            to: emailTo || "N/A",
            date: email.date ?? null,
            text: email?.text ?? null,
          };
        });

      const filteredSortedCathyEmails = parsedCathyEmails
        .filter((email) => Boolean(email.date && email.text))
        .sort((a, b) => moment(a.date).unix() - moment(b.date).unix())
        .map((email, index) => {
          const emailTo = email?.to ? email.to[0].address : null;
          return {
            id: index,
            subject: email?.subject ?? null,
            from: email?.from?.address || "N/A",
            to: emailTo || "N/A",
            date: email.date ?? null,
            text: email?.text ?? null,
          };
        });

      return {
        michelleParsedEmails: filteredSortedMichelleEmails,
        cathyParsedEmails: filteredSortedCathyEmails,
      }
    } 
);

// Define the return type for `parseEmailsByMessageID`
const parseEmailsByMessageID = (text: string): string[] => {
  const lines = text.split("\n");
  const parsedEmails: string[] = [];
  let currentEmail: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes("Message-ID")) {
      const startIndex = Math.max(0, i - 8);
      currentEmail = lines.slice(startIndex, i + 1);

      i++;
      while (i < lines.length && !lines[i].includes("Message-ID")) {
        currentEmail.push(lines[i]);
        i++;
      }

      parsedEmails.push(currentEmail.join("\n"));
      i--; // Move back to avoid skipping
    }
  }
  return parsedEmails;
};

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

const fetchEmails = async (): Promise<string> => {
  const response = await fetch("/AllEmails.txt");
  return response.text();
};

export const fetchAndParseEmails = createAsyncThunk<
  ParsedEmail[], // Return type of the thunk
  void, // No argument passed in the thunk
  { rejectValue: string } // Type for the rejectWithValue
>(
  'emails/fetchAndParseEmails',
  async (_, { rejectWithValue }) => {
    try {
      const text = await fetchEmails();
      const emails = parseEmailsByMessageID(text);

      const parsedEmails = await Promise.all(
        emails.map(async (email) => await Postalmime.parse(email))
      );

      return parsedEmails
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
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
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

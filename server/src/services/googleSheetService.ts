import dotenv from "dotenv";
dotenv.config();
import { google } from "googleapis";

const auth = new google.auth.GoogleAuth({
  credentials: {
    type: "service_account",

    client_email: process.env.GOOGLE_CLIENT_EMAIL,

    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  },

  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const sheets = google.sheets({
  version: "v4",
  auth,
});

export const addVisaToSheet = async (data: any) => {
  try {
    const spreadsheetId = process.env.SPREADSHEET_ID;
    const header = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: "Sheet1!A1:L1",
    });
    const headers = (header.data.values?.[0] ?? []).map((value) =>
      String(value).trim().toLowerCase(),
    );

    if (headers[11] === "work status" && headers[5] !== "work status") {
      const spreadsheet = await sheets.spreadsheets.get({
        spreadsheetId,
        fields: "sheets.properties(sheetId,title)",
      });
      const sheetId = spreadsheet.data.sheets?.find(
        (sheet) => sheet.properties?.title === "Sheet1",
      )?.properties?.sheetId;

      if (sheetId === undefined) {
        throw new Error('Google Sheets tab "Sheet1" was not found.');
      }

      await sheets.spreadsheets.batchUpdate({
        spreadsheetId,
        requestBody: {
          requests: [
            {
              moveDimension: {
                source: {
                  sheetId,
                  dimension: "COLUMNS",
                  startIndex: 11,
                  endIndex: 12,
                },
                destinationIndex: 5,
              },
            },
          ],
        },
      });
    }

    await sheets.spreadsheets.values.append({
      spreadsheetId,

      range: "Sheet1!A:L",

      valueInputOption: "USER_ENTERED",

      requestBody: {
        values: [
          [
            data.foreignerName,
            data.passportNo,
            data.source,
            data.visaCategory,
            data.duration,
            data.workStatus,
            data.receiveDate,
            data.visaExpiryDate,
            data.fileSubmitDate,
            data.deliveryDate,
            data.paymentStatus,
            data.remark,
          ],
        ],
      },
    });
  } catch (error) {
    console.log("Google Sheet Error:", error);

    throw error;
  }
};

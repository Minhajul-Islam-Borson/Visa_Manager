import dotenv from "dotenv";
dotenv.config();
import { google } from "googleapis";

const auth = new google.auth.GoogleAuth({

  credentials: {
    type: "service_account",

    client_email: process.env.GOOGLE_CLIENT_EMAIL,

    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),

  },

  scopes: [
    "https://www.googleapis.com/auth/spreadsheets",
  ],

});


const sheets = google.sheets({
  version: "v4",
  auth,
});



export const addVisaToSheet = async (data:any)=>{

  try {

    await sheets.spreadsheets.values.append({

      spreadsheetId: process.env.SPREADSHEET_ID,


      range: "Sheet1!A:K",


      valueInputOption: "USER_ENTERED",


      requestBody: {

        values: [

          [
            data.foreignerName,
            data.passportNo,
            data.source,
            data.visaCategory,
            data.duration,
            data.receiveDate,
            data.visaExpiryDate,
            data.fileSubmitDate,
            data.deliveryDate,
            data.paymentStatus,
            data.remark,
          ]

        ]

      }

    });

  } catch(error){

    console.log("Google Sheet Error:", error);

    throw error;

  }

};
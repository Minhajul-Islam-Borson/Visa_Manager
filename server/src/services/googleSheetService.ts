import { google } from "googleapis";


const auth = new google.auth.GoogleAuth({

  keyFile: "credentials.json",

  scopes:[
    "https://www.googleapis.com/auth/spreadsheets"
  ],

});


const sheets = google.sheets({
  version:"v4",
  auth
});



export const addVisaToSheet = async(data:any)=>{


  await sheets.spreadsheets.values.append({

    spreadsheetId:
      "1rg64gJRnH3OQq2wWa3pPHl-qW09ahnIB1qhlQiK0vxk",


    range:
      "Sheet1!A:K",


    valueInputOption:
      "USER_ENTERED",


    requestBody:{

      values:[

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
          data.remark
        ]

      ]

    }

  });


};
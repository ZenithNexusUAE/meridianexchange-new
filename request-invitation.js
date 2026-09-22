const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwvqitdAXm8_ClWzgL--7cBnBrWAzcHDO5x6bNrjSvWHQ0wODBTQ7ABtzpJhcEZRgZv/exec";


// ============================================================
// Generate a unique submission ID
// ============================================================

function generateSubmissionId() {
  return (
    "ME-" +
    Date.now() +
    "-" +
    Math.random().toString(36).substring(2, 8).toUpperCase()
  );
}


// ============================================================
// Get form payload
// ============================================================

function getPartnerFormPayload(form) {
  const data = new FormData(form);

  return {
    enquiryType: data.get("Enquiry Type") || "",
    firstName: data.get("First Name") || "",
    lastName: data.get("Last Name") || "",
    businessEmail: data.get("Business Email") || "",
    mobileNumber: data.get("Mobile Number") || "",
    jobTitle: data.get("Job Title") || "",
    company: data.get("Company") || "",
    country: data.get("Country") || "",
    organisationType: data.get("Organisation Type") || "",
    partnershipInterest: data.get("Partnership Interest") || "",
    message: data.get("Message") || "",
    consent: data.get("Consent") ? "Yes" : "No",
    pageUrl: window.location.href
  };
}


// ============================================================
// Client-side logging
// ============================================================

function logInfo(message, data = null) {
  console.log(
    `%c[Meridian Exchange] ${message}`,
    "color: #198754; font-weight: bold;",
    data || ""
  );
}


function logError(message, error = null) {
  console.error(
    `%c[Meridian Exchange ERROR] ${message}`,
    "color: #dc3545; font-weight: bold;",
    error || ""
  );
}


// ============================================================
// DOM Ready
// ============================================================

document.addEventListener("DOMContentLoaded", function () {

  logInfo("JavaScript loaded successfully.");
  logInfo("Google Apps Script URL:", GOOGLE_SCRIPT_URL);


  const form =
    document.getElementById("mxInviteForm");


  if (!form) {
    logError(
      "Partner form #mxPartnerForm was not found."
    );

    return;
  }


  logInfo(
    "Partner form found successfully."
  );


  // ==========================================================
  // Submit
  // ==========================================================

  form.addEventListener(
    "submit",
    async function (event) {

      event.preventDefault();


      logInfo(
        "Form submission started."
      );


      // --------------------------------------------------------
      // Browser validation
      // --------------------------------------------------------

      if (!form.reportValidity()) {

        logError(
          "Form validation failed."
        );

        return;
      }


      logInfo(
        "Form validation passed."
      );


      // --------------------------------------------------------
      // Submit button
      // --------------------------------------------------------

      const submitButton =
        form.querySelector(
          ".mx-invite-submit"
        );


      if (!submitButton) {

        logError(
          "Submit button not found."
        );

        return;
      }


      const submitLabel =
        submitButton.querySelector(
          "span"
        );


      if (!submitLabel) {

        logError(
          "Submit button text element not found."
        );

        return;
      }


      const originalText =
        submitLabel.textContent;


      // --------------------------------------------------------
      // Create submission ID
      // --------------------------------------------------------

      const submissionId =
        generateSubmissionId();


      logInfo(
        "Submission ID generated:",
        submissionId
      );


      // --------------------------------------------------------
      // Build payload
      // --------------------------------------------------------

      const payload =
        getPartnerFormPayload(form);


      payload.submissionId =
        submissionId;


      logInfo(
        "Payload prepared:",
        payload
      );


      // --------------------------------------------------------
      // Save attempt locally
      // --------------------------------------------------------

      const submissionLog = {
        submissionId: submissionId,
        timestamp: new Date().toISOString(),
        status: "sending",
        payload: payload
      };


      try {

        localStorage.setItem(
          "meridian_last_submission",
          JSON.stringify(submissionLog)
        );

      } catch (storageError) {

        logError(
          "Could not write submission log to localStorage.",
          storageError
        );
      }


      // --------------------------------------------------------
      // Disable submit button
      // --------------------------------------------------------

      submitButton.disabled = true;

      submitLabel.textContent =
        "Submitting...";


      // ========================================================
      // SEND REQUEST
      // ========================================================

      try {

        logInfo(
          "Sending request to Google Apps Script..."
        );

        logInfo(
          "Request timestamp:",
          new Date().toISOString()
        );


        const response =
          await fetch(
            GOOGLE_SCRIPT_URL,
            {
              method: "POST",

              mode: "no-cors",

              headers: {
                "Content-Type":
                  "text/plain;charset=utf-8"
              },

              body:
                JSON.stringify(payload)
            }
          );


        // ------------------------------------------------------
        // Fetch completed
        // ------------------------------------------------------

        logInfo(
          "Fetch request completed."
        );


        logInfo(
          "Response type:",
          response.type
        );


        logInfo(
          "Response status:",
          response.status
        );


        logInfo(
          "Response URL:",
          response.url
        );


        // ------------------------------------------------------
        // no-cors limitation
        // ------------------------------------------------------

        if (response.type === "opaque") {

          logInfo(
            "Google Apps Script returned an opaque response because no-cors is being used."
          );

          logInfo(
            "The request was sent successfully from the browser, but JavaScript cannot inspect the server response."
          );
        }


        // ------------------------------------------------------
        // Update local log
        // ------------------------------------------------------

        const successLog = {
          submissionId: submissionId,
          timestamp: new Date().toISOString(),
          status: "request_sent",
          note:
            "Request was successfully handed to fetch(). Google Apps Script response cannot be inspected because no-cors is being used.",
          payload: payload
        };


        try {

          localStorage.setItem(
            "meridian_last_submission",
            JSON.stringify(successLog)
          );

        } catch (storageError) {

          logError(
            "Could not update local submission log.",
            storageError
          );
        }


        // ------------------------------------------------------
        // Console success
        // ------------------------------------------------------

        console.log(
          `%c[Meridian Exchange] Submission ${submissionId} sent.`,
          "color: #198754; font-weight: bold; font-size: 14px;"
        );


        // ------------------------------------------------------
        // UI success
        // ------------------------------------------------------

        submitLabel.textContent =
          "Submitted Successfully";


        setTimeout(
          function () {

            form.reset();

            submitButton.disabled =
              false;

            submitLabel.textContent =
              originalText;


            alert(
              "Thank you for your interest in partnering with Meridian Exchange. Your request has been received by the Meridian Exchange Secretariat. A member of our team will contact you shortly."
            );

          },
          700
        );

      } catch (error) {

        // ======================================================
        // FETCH ERROR
        // ======================================================

        logError(
          "Google Apps Script request failed.",
          error
        );


        const errorLog = {
          submissionId: submissionId,
          timestamp: new Date().toISOString(),
          status: "error",
          error: {
            name: error.name,
            message: error.message,
            stack: error.stack
          },
          payload: payload
        };


        try {

          localStorage.setItem(
            "meridian_last_submission",
            JSON.stringify(errorLog)
          );

        } catch (storageError) {

          logError(
            "Could not save error log to localStorage.",
            storageError
          );
        }


        submitButton.disabled =
          false;

        submitLabel.textContent =
          originalText;


        alert(
          "Something went wrong while submitting your request. Please try again."
        );
      }

    }
  );
});

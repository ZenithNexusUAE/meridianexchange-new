const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwvqitdAXm8_ClWzgL--7cBnBrWAzcHDO5x6bNrjSvWHQ0wODBTQ7ABtzpJhcEZRgZv/exec";

function getInviteFormPayload(form) {
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
    sponsorshipInterest: data.get("Sponsorship Interest") || "",
    estimatedBudgetRange: data.get("Estimated Budget Range") || "",
    message: data.get("Message") || "",
    consent: data.get("Consent") ? "Yes" : "No",
    pageUrl: window.location.href,
  };
}

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("mxInviteForm");

  if (!form) return;

  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    if (!form.reportValidity()) return;

    const submitButton = form.querySelector(".mx-invite-submit");
    const submitLabel = submitButton.querySelector("span");
    const originalText = submitLabel.textContent;

    submitButton.disabled = true;
    submitLabel.textContent = "Submitting...";

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(getInviteFormPayload(form)),
      });

      submitLabel.textContent = "Submitted Successfully";

      setTimeout(function () {
        form.reset();
        submitButton.disabled = false;
        submitLabel.textContent = originalText;
        alert("Thank you for your interest in Meridian Exchange. Your request has been received by the Meridian Exchange Secretariat. A member of our team will contact you shortly.");
      }, 700);
    } catch (error) {
      console.error("Invitation form submission error:", error);
      submitButton.disabled = false;
      submitLabel.textContent = originalText;
      alert("Something went wrong. Please try again.");
    }
  });
});
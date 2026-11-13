/* Love & Legend site settings.
   This is the only file that needs editing after upload. Open it in any text editor.

   ENQUIRY FORM: pick ONE of the two options below.

   Option A (simplest): put the inbox that should receive enquiries in enquiryEmail.
     The visitor's own email app opens with the enquiry already written, ready to send.
     Example: enquiryEmail: "hello@yourdomain.com"

   Option B (enquiries send from the page itself): create a form at a form service
     and paste its address into formEndpoint.
     Formspree: formEndpoint: "https://formspree.io/f/XXXXXXXX"
     Web3Forms: formEndpoint: "https://api.web3forms.com/submit", formAccessKey: "your-access-key"

   If both are left empty the form shows "Enquiries open shortly" and sends nothing.
*/
window.LL_CONFIG = {
  enquiryEmail: "",
  formEndpoint: "",
  formAccessKey: ""
};

/*==============================================================*/
// Contact Form  JS
/*==============================================================*/
(function ($) {
  "use strict"; // Start of use strict
  $(document).ready(function () {
    $("#contactForm")
      .validator()
      .on("submit", function (event) {
        if (event.isDefaultPrevented()) {
          formError();
          submitMSG(false, "آیا فرم را به درستی پر کردید؟");
        } else {
          event.preventDefault();
          submitForm();
        }
      });
  });

  function submitForm() {
    // Initiate Variables With Form Content
    var name = $("#name").val();
    var email = $("#email").val();
    var msg_subject = $("#msg_subject").val();
    var phone_number = $("#phone_number").val();
    var message = $("#message").val();
    var gridCheck = $("#gridCheck").val();

    $.ajax({
      type: "POST",
      url: "assets/php/form-process.php",
      data:
        "name=" +
        name +
        "&email=" +
        email +
        "&msg_subject=" +
        msg_subject +
        "&phone_number=" +
        phone_number +
        "&message=" +
        message +
        "&gridCheck=" +
        gridCheck,
      success: function (text) {
        if (text == "success") {
          formSuccess();
        } else {
          formError();
          submitMSG(false, text);
        }
      },
    });
  }
  function formSuccess() {
    $("#contactForm")[0].reset();
    submitMSG(true, "پیام ارسال شد!");
  }
  function formError() {
    $("#contactForm")
      .removeClass()
      .addClass("shake animated")
      .one(
        "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",
        function () {
          $(this).removeClass();
        }
      );
  }
  function submitMSG(valid, msg) {
    if (valid) {
      var msgClasses = "h4 tada animated text-success";
    } else {
      var msgClasses = "h4 text-danger";
    }
    $("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
  }
})(jQuery); // End of use strict
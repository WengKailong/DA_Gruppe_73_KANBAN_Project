function setDatePicker() {
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  if (month < 10) {
    month = "0" + month;
  }
  let day = date.getDate();
  if (day < 10) {
    day = "0" + day;
  }

  let today = year + "-" + month + "-" + day;
  console.log(today);

  // set-up datetimepicker
  $("#date-picker").datetimepicker({
    timepicker: false,
    datepicker: true,
    format: "Y-m-d", // date format
    value: today, //defalt date
    weeks: true,
    yearStart: year - 1,
    yearEnd: 2150,
  });

  // toggle function btn onclick
  $("#date-toggle").on("click", function () {
    $("#date-picker").datetimepicker("toggle");
  });

  // $(document).ready(function () {
  //   $("#picker").datetimepicker({
  //     timepicker: false,
  //     datepicker: true,
  //     format: "y-m-d", // date format
  //     value: "2021-4-27", //defalt date
  //     weeks: true,
  //   });
  // });
}

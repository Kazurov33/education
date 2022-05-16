module.exports = function (that, color, message, error) {
  if (color == "negative") {
    return that.$q.notify({
      color: color,
      message: message || "Ошибка",
      caption:
        (error.response &&
          error.response.data &&
          error.response.data.description) ||
        error.message ||
        error.toString() ||
        "",
      icon: "report_problem",
      position: "top",
    });
  } else {
    return that.$q.notify({
      color: color || "positive",
      message: message || "Успешно",
      icon: "done",
      position: "top",
    });
  }
};

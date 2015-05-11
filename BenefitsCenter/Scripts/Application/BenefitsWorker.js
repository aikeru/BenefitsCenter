var Benefits = window.Benefits || {};
Benefits.Worker = Benefits.Worker || {};

Benefits.Worker.doWork = function doWork(amountOfWork) {
  var workDone = 0;
  for (var i = 0; i < amountOfWork; i++) {
    workDone++;
  }
  return workDone;
}
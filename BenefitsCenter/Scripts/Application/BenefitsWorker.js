var Benefits = window.Benefits || {};
Benefits.Worker = Benefits.Worker || {};

Benefits.Worker.doWork = function doWork(amountOfWork) {
  ///<summary>Does some work</summary>
  ///<param name="amountOfWork" type="number">How much work to do</param>
  ///<returns type="number"></returns>
  var workDone = 0;
  for(var i = 0; i < amountOfWork; i++) {
    workDone++;
  }
  return workDone;
};

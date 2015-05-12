///<reference path="../../BenefitsCenter/Scripts/Application/BenefitsWorker.js" />

test("When 5 work to do, Benefits Worker does 5 work", function () {
  var workToDo = 5;
  var result = Benefits.Worker.doWork(workToDo);
  equal(result, workToDo, "Amount of work done was unexpected.");
});
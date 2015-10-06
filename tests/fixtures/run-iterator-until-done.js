function runIteratorUntilDone(iterator, delayBetweenIterations, runDone) {
  function runNext() {
    if (iterator().done) {
      setTimeout(runDone, delayBetweenIterations);
    }
    else {
      setTimeout(runNext, delayBetweenIterations);
    }
  }
  runNext();
}

module.exports = runIteratorUntilDone;

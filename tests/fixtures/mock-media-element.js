function MockMediaElement() {
  function mockAddEventListener() {

  }

  function emitTimeUpdate() {

  }

  return {
    currentTime: 0,
    addEventListener: mockAddEventListener,
    emitTimeUpdate: emitTimeUpdate
  };
}

module.exports = MockMediaElement;

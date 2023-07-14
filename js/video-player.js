const video = document.querySelectorAll('#videoPlayer');

video.forEach((el) => {
  videojs(el, {
    controls: true,
    fluid: true,
    muted: true,
    playbackRates: [1, 1.5, 2],
    plugins: {
      hotkeys: {
        enableModifiersForNumbers: false,
        seekStep: 20,
      },
    },
  });
});

import React, {useEffect} from "react";
import {VideoView, useVideoPlayer} from "expo-video";

export default function ExpoVideoPlayer({
  source,
  style,
  shouldPlay = true,
  isLooping = false,
  nativeControls = true,
  contentFit = "contain",
  onEnd,
  onFirstFrameRender,
}) {
  const player = useVideoPlayer(source, (videoPlayer) => {
    videoPlayer.loop = isLooping;

    if (shouldPlay) {
      videoPlayer.play();
    }
  });

  useEffect(() => {
    player.loop = isLooping;
  }, [isLooping, player]);

  useEffect(() => {
    if (shouldPlay) {
      player.play();
    } else {
      player.pause();
    }
  }, [player, shouldPlay]);

  useEffect(() => {
    if (!onEnd) {
      return undefined;
    }

    const subscription = player.addListener("playToEnd", onEnd);

    return () => {
      subscription.remove();
    };
  }, [onEnd, player]);

  return (
    <VideoView
      style={style}
      player={player}
      nativeControls={nativeControls}
      contentFit={contentFit}
      onFirstFrameRender={onFirstFrameRender}
    />
  );
}

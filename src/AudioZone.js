import React, { useState } from "react";
import { Stack } from "@mui/material";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";

const AudioZone = () => {
  const [link, setLink] = useState("happy");
  const Data = {
    incredible:
      "https://ia801206.us.archive.org/0/items/IncrediblesMovieSoundtrack-ChildrensMusic/09%20Kronos%20Unveiled.mp3",
    happy : "https://docs.google.com/uc?export=open&id=1Ji1Top5Nn71PWdlKfgahMPFzwjs69Uey"
    };
  const changeSong = () => {
    if (link === "incredible") setLink("happy");
    if (link === "happy") setLink("incredible");
  };
  return (
    <div>
      <audio controls src={Data[link]} autoPlay="autoPlay" loop="loop" />

      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <SkipPreviousIcon onClick={changeSong} />{" "}
        <SkipNextIcon onClick={changeSong} />
      </Stack>
    </div>
  );
};

export default AudioZone;

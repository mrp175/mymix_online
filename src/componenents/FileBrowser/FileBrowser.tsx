import { Wrapper, Browser, Title, Button, text } from "./FileBrowser.styles";
import { useState } from "react";

export function FileBrowser() {
  const [open, setOpen] = useState(true);

  function toggleOpen() {
    if (open) setOpen(false);
    if (!open) setOpen(true);
  }

  return (
    <Wrapper theme={{ width: open ? 30 : 2 }}>
      <Title
        theme={{
          background: open ? "var(--light-main)" : "inherit",
        }}
      >
        <Button rotation={open ? 45 : 0} onClick={toggleOpen} />
        {text(open)}
      </Title>
      <Browser></Browser>
    </Wrapper>
  );
}

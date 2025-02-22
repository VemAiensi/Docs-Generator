import React, { useRef, useState } from "react";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import ImageIcon from "@mui/icons-material/Image";
import { TextField, Button } from "@mui/material";
import "./config.css";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";

const actions = [
  { icon: <TextFieldsIcon />, name: "Text" },
  { icon: <FormatListBulletedIcon />, name: "List" },
  { icon: <ImageIcon />, name: "Image" },
];

export default function ControlledOpenSpeedDial(props) {
  const { contents, updateContents } = props;

  //Speed Dial Controls
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //Input Control
  const [inputDisplay, setInputDisplay] = useState("false");
  function toggleInputDisplay() {
    setInputDisplay(!inputDisplay);
  }

  //Input Fields
  const [input, setInputs] = React.useState(null);
  function updateInputs(inputType) {
    setInputs(inputType);
    updateContentType(inputType);
    handleClose();
    toggleInputDisplay();
  }

  const [newContentTitle, setContentTitle] = useState("");
  function updateContentTitle(e) {
    setContentTitle(e.target.value);
  }

  const [newContentType, setContentType] = useState("");
  function updateContentType(newVal) {
    switch (newVal) {
      case "Text":
        return setContentType("text");
      case "List":
        return setContentType("list");
      case "Image":
        return setContentType("img");
    }
  }

  //Input fields by type
  const [newContentDesc, setContentDesc] = useState("");
  function addTextDesc(e) {
    setContentDesc(e.target.value);
  }

  const [list, setList] = useState([]);
  function appendList() {
    setList([...list, listItem]);
    setContentDesc([...list, listItem]);
    setListItem("");
  }

  const [listItem, setListItem] = useState("");
  function updateListItem(e) {
    setListItem(e.target.value);
  }

  function deleteItem(index) {
    const updatedArray = list.filter((_, i) => i !== index);
    console.log(index, updatedArray);
    setList(updatedArray);
    setContentDesc(updatedArray);
  }

  const buttonRef = useRef(null);
  function handleKeyDown(event) {
    if (event.key === "Enter") {
      buttonRef.current.click();
    }
  }

  //Append function
  function appendContent() {
    console.log("Previous Contents:", contents);
    updateContents([
      ...contents,
      {
        title: newContentTitle,
        type: newContentType,
        desc: newContentDesc,
      },
    ]);
    toggleInputDisplay();

    //reset all
    setContentTitle("");
    setContentType("");
    setContentDesc("");

    setList([]);
    setListItem("");
  }

  function renderInput(type) {
    switch (type) {
      case "Text":
        return (
          <TextField
            fullWidth
            label="Text"
            onChange={addTextDesc}
            value={newContentDesc}
          />
        );
      case "List":
        return (
          <>
            {list[0] && (
              <ul>
                {list.map((item, index) => (
                  <li key={index}>
                    <span>{item}</span>
                    <Button color="error" onClick={() => deleteItem(index)}>
                      <DeleteForeverIcon />
                    </Button>
                  </li>
                ))}
              </ul>
            )}
            <div className="listControl">
              <TextField
                fullWidth
                label="List"
                onChange={updateListItem}
                value={listItem}
                onKeyDown={handleKeyDown}
              />
              <Button variant="contained" ref={buttonRef} onClick={appendList}>
                <KeyboardReturnIcon />
              </Button>
            </div>
          </>
        );
      case "Image":
        return (
          <TextField fullWidth label="Image Source" value={newContentDesc} />
        );
    }
  }

  return (
    <Box sx={{ height: 320, transform: "translateZ(0px)", flexGrow: 1 }}>
      {inputDisplay ? (
        <SpeedDial
          ariaLabel="SpeedDial controlled open example"
          icon={<SpeedDialIcon />}
          direction="right"
          onClose={handleClose}
          onOpen={handleOpen}
          open={open}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={() => updateInputs(action.name)}
            />
          ))}
        </SpeedDial>
      ) : (
        <div className="contentControl">
          <TextField
            fullWidth
            label="Content Title"
            onChange={updateContentTitle}
            value={newContentTitle}
          ></TextField>
          {renderInput(input)}
          <Button color="success" variant="contained" onClick={appendContent}>
            Add content
          </Button>
        </div>
      )}
    </Box>
  );
}

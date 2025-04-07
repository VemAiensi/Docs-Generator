import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Radio,
} from "@mui/material";
import "./config.css";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import FileInput from "./FileInput";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ContentControl from "./ContentControl";

function Config(props) {
  //Destructuring form functions
  const [mainTitle, mainSubtitle, mainUrl, mainContents, mainSrc, mainSrcLang] =
    props.formFncs;

  const [url, setUrl] = useState("");
  function updateUrl(event) {
    setUrl(event.target.value);
    mainUrl(event.target.value);
  }

  const [title, setTitle] = useState("");
  function updateTitle(event) {
    setTitle(event.target.value);
    mainTitle(event.target.value);
  }

  const [subtitle, setSubtitle] = useState("");
  function updateSubtitle(event) {
    setSubtitle(event.target.value);
  }

  const courses1 = ["Introduction to Computing", "Fundamentals of Programming"];
  const courses2 = [
    "Intermediate Programming",
    "Data Structures and Algorithms",
    "Numerical Methods",
  ];

  const [ay, setAY] = useState("2021-2022");
  function updateAY(e) {
    setAY(e.target.value);
  }

  const [sem, setSem] = useState("1st");
  function updateSem(e) {
    setSem(e.target.value);
  }

  const [course, setCourse] = useState("");
  function updateCourse(e) {
    setCourse(e.target.value);
  }
  const [courses, setCourses] = useState(courses1);

  useEffect(() => {
    setSubtitle(course + " - " + sem + " " + ay);
    mainSubtitle(course + " - " + sem + " " + ay);
  }, [ay, sem, course]);

  useEffect(() => {
    const semay = sem + ay;
    switch (semay) {
      case "1st Sem2021-2022":
        setCourses(courses1);
        break;
      case "2nd Sem2021-2022":
        setCourses(courses2);
        break;
    }
  }, [sem, ay]);

  const [src, setSrc] = useState("");
  function updateSrc(event) {
    setSrc(event.target.value);
    mainSrc(event.target.value);
  }
  function updateSrcFromFile(newValue) {
    setSrc(newValue);
    mainSrc(newValue);
  }

  function deleteContent(index) {
    const updatedArray = props.contents.filter((_, i) => i !== index);
    console.log(index, updatedArray);
    mainContents(updatedArray);
  }

  async function generatePDF() {
    const divRef = props.pageRefs;

    const pdf = new jsPDF("p", "mm", "letter"); // Portrait, millimeters, A4
    const width = pdf.internal.pageSize.getWidth();
    const height = pdf.internal.pageSize.getHeight();

    //Acquiring all div references and adding it to the pdf
    for (let index = 0; index < 10; index++) {
      //Setting limit to 10 for compliance to page limit
      const divref = divRef[index];
      if (divref.current) {
        const scale = 2; // Adjust scale for higher resolution

        try {
          const canvas = await html2canvas(divref.current, { scale: scale });
          const imgData = canvas.toDataURL("image/png");

          // Get canvas dimensions AFTER scaling
          const canvasWidth = canvas.width; // From html2canvas output
          const canvasHeight = canvas.height;

          // Calculate the available space on the PDF page (with margins)
          const availableWidth = width;
          const availableHeight = height;

          // Calculate the scaling factor to fit within the available space
          const scaleFactor = Math.min(
            availableWidth / canvasWidth, // Scale to fit width
            availableHeight / canvasHeight // Scale to fit height
          );

          // Calculate the image dimensions to maintain aspect ratio
          const imgWidth = canvasWidth * scaleFactor;
          const imgHeight = canvasHeight * scaleFactor;

          // Center the image
          const xPos = (width - imgWidth) / 2;
          const yPos = (height - imgHeight) / 2;

          pdf.addImage(imgData, "PNG", xPos, yPos, imgWidth, imgHeight);

          // Add a new page if it's not the last div
          if (index < 9) {
            pdf.addPage("letter", "p");
          }
        } catch (error) {
          console.error("Error generating PDF:", error);
        }
      }
    }

    pdf.save("my-document.pdf");
  }

  return (
    <div className="config">
      <h1>PAGE CONTENTS</h1>
      <TextField label="Title" onChange={updateTitle} value={title} />

      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Course Name</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={course}
          onChange={updateCourse}
          label="Academic Year"
        >
          {courses.map((courseName, index) => (
            <MenuItem key={index + "courseName"} value={courseName}>
              {courseName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <div className="subtitle-selection">
        <FormControl>
          <FormLabel id="academic-year-label">A.Y.</FormLabel>
          <RadioGroup
            aria-labelledby="academic-year-label"
            defaultValue={ay}
            name="radio-buttons-group"
            onChange={updateAY}
          >
            <FormControlLabel
              value="2021-2022"
              control={<Radio />}
              label="2021-2022"
            />
            <FormControlLabel
              value="2022-2023"
              control={<Radio />}
              label="2022-2023"
            />
            <FormControlLabel
              value="2023-2024"
              control={<Radio />}
              label="2023-2024"
            />
            <FormControlLabel
              value="2024-2025"
              control={<Radio />}
              label="2024-2025"
            />
          </RadioGroup>
        </FormControl>

        <FormControl>
          <FormLabel id="Sem-label">Semester</FormLabel>
          <RadioGroup
            aria-labelledby="Sem-label"
            defaultValue={sem}
            name="sem-radio"
            onChange={updateSem}
          >
            <FormControlLabel value="1st Sem" control={<Radio />} label="1st" />
            <FormControlLabel value="2nd Sem" control={<Radio />} label="2nd" />
            <FormControlLabel
              value="Summer"
              control={<Radio />}
              label="Summer"
            />
          </RadioGroup>
        </FormControl>
      </div>

      <TextField label="URL" onChange={updateUrl} value={url} />

      <div>
        Existing Contents
        {props.contents.map((content, index) => {
          return (
            <div className="existingContents" key={index}>
              <Button color="error" onClick={() => deleteContent(index)}>
                <DeleteForeverIcon />
              </Button>
              <span>{content.title}</span>
            </div>
          );
        })}
      </div>

      <ContentControl
        contents={props.contents}
        updateContents={mainContents}
      ></ContentControl>

      <FileInput
        fnc={updateSrcFromFile}
        langChange={mainSrcLang}
        label="Source Code"
      ></FileInput>
      <span>File Content</span>
      <textarea onChange={updateSrc} value={src} />

      <Button variant="contained" onClick={generatePDF}>
        Export PDF
      </Button>
    </div>
  );
}
export default Config;

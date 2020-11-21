<<<<<<< HEAD
import React, { useState, useContext } from "react";
=======
import React, {useState, useContext } from "react";
>>>>>>> b70b4b7f733e1fedaea5886674646c610e6db0b3
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";
import axios from "axios";
import { getConfig } from "../../authConfig";
import WebRoundedIcon from "@material-ui/icons/WebRounded";
import { DataContext } from "../../contexts/dataContext";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import WarningIcon from "@material-ui/icons/Warning";
import EditIcon from "@material-ui/icons/Edit";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  FormGroup,
  FormControlLabel,
  FormControl,
  Checkbox,
} from "@material-ui/core";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();

const useStyles = makeStyles((theme) => ({
  verticalElementTitle: {
    margin: 0,
  },
  verticalElementSubtitle: {
    margin: 0,
  },
  column: {
    flexBasis: "33.33%",
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(2, 2),
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  delete: {
    color: "black",
    "&:hover, &.Mui-focusVisible": {
      transition: "0.3s",
      color: "#FFFFFF",
      backgroundColor: "#C8102E",
    },
  },
  dialogDelete: {
    display: "flex",
    justifyContent: "center",
  },
  edit: {
    color: "#C8102E",
  },
<<<<<<< HEAD
  skillsContainer: {
    display: "flex",
    "& > *": {
      marginRight: theme.spacing(1),
    },
  },
=======
>>>>>>> b70b4b7f733e1fedaea5886674646c610e6db0b3
}));

//Skills denotes to all the skills in the database
function StudentProject({ projects, setProjects, skills }) {
  const options = skills.map((skill) => {
    return {
      label: skill.skill_name,
      value: skill.id,
    };
  });

  const { data } = useContext(DataContext);
  const { profile } = data;
<<<<<<< HEAD

=======
  
>>>>>>> b70b4b7f733e1fedaea5886674646c610e6db0b3
  const classes = useStyles();

  const [openEdit, setOpenEdit] = useState(false);
  const handleClickOpenEdit = (project) => {
    setOpenEdit(true);
    setCurrentProject(project);
    setCurrentProjectSkills(
      project.project_tech.split(",").map((skill, index) => {
        return {
          label: skill,
          value: index,
        };
      })
    );
  };
  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  // function handleProjectSkillChange(e){setCurrentProjectSkills}

  const [openDelete, setOpenDelete] = useState(false);
<<<<<<< HEAD

=======
 
>>>>>>> b70b4b7f733e1fedaea5886674646c610e6db0b3
  const [currentProject, setCurrentProject] = useState({
    student_id: profile.student_id,
    project_description: "",
    project_end_date: "",
    project_id: null,
    project_link: "",
    project_name: "",
    project_role: "",
    project_start_date: "",
    project_tech: "",
    project_in_progress: false,
  });
<<<<<<< HEAD
  const [currentProjectSkills, setCurrentProjectSkills] = useState([]);

  // const checkProjectInProgress = () => {
  //   if (currentProject.project_in_progress === true) {
  //     setCurrentProject({
  //       ...currentProject,
  //       project_in_progress: false,
  //     });
  //     setDisable(!disable);
  //   } else {
  //     setCurrentProject({
  //       ...currentProject,
  //       project_in_progress: true,
  //     })
  //     setDisable(!disable);
  //   }
  // }; PAIR THIS CODE WITH LINES 424 & 425. UNCOMMENT THIS WTH 424 & 425

  // function checkProjectInProgress(e) {
  //   setInProgress(e.target.checked);
  // } PAIR THIS CODE WITH LINES 426 & 427. UNCOMMENT THIS WITH 426 & 427.
=======
  const [currentProjectSkills, setCurrentProjectSkills] = useState([    
  ]);
>>>>>>> b70b4b7f733e1fedaea5886674646c610e6db0b3

  const handleClickOpenDelete = (project) => {
    setOpenDelete(true);
  };

  const handleCurrentProjectChange = (e) => {
    setCurrentProject({
      ...currentProject,
      [e.target.name]: e.target.value,
    });
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleDelete = (id) => {
    axios
      .delete(
        "http://18.213.74.196:8000/api/student_project/" + id + "/delete",
<<<<<<< HEAD

        getConfig()
      )
      .then((res) => {
        const studentProjectsCurrent = projects.filter(
          (project) => id !== project.project_id
        );
        setProjects(studentProjectsCurrent);
      })
      .catch((err) => console.log(err.response.message));
    setOpenDelete(false);
  };

  const handleSave = (id) => {
    var project_id = id;
    axios
      .put(
        `http://18.213.74.196:8000/api/student_project/${project_id}/update`,
        {
          student_id: profile.student_id,
          project_name: currentProject.project_name,
          project_description: currentProject.project_description,
          project_link: currentProject.project_link,
          project_tech: currentProject.project_tech,
          project_start_date: currentProject.project_start_date,
          project_end_date: currentProject.project_end_date,
          project_in_progress: currentProject.project_in_progress,
          project_role: currentProject.project_role,
        },
        getConfig()
      )
      .then((res) => {
        let updated_projects = projects.map((item) => {
          let updatedItem = { ...item };
          if (project_id === item.project_id) {
            updatedItem.project_id = item.project_id;
            updatedItem.project_name = res.data.project_name;
            updatedItem.project_description = res.data.project_description;
            updatedItem.project_link = res.data.project_link;
            updatedItem.project_tech = res.data.project_tech;
            updatedItem.project_start_date = res.data.project_start_date;
            updatedItem.project_end_date = res.data.project_end_date;
            updatedItem.project_in_progress = res.data.project_in_progress;
            updatedItem.project_role = res.data.project_role;
          }
          return updatedItem;
        });
        setProjects(updated_projects);
        handleCloseEdit();
      })
      .catch((err) => {
        console.log(err);
      });
=======

        getConfig()
      )
      .then((res) => {
        const studentProjectsCurrent = projects.filter(
          (project) => id !== project.project_id
        );
        setProjects(studentProjectsCurrent);
      })
      .catch((err) => console.log(err.response.message));
    setOpenDelete(false);
  };

  const validate = () =>{
    if(currentProject.project_name==="")
    {
      alert("Please enter a name for the project");
      return false;
    }
    else if(currentProject.project_role===""){
      alert("Please enter a role for the project");
      return false;
    }
    else if(currentProject.project_description===""){
      alert("Please enter a description for the project");
      return false;
    }
    else if(currentProject.project_start_date===""){
      alert("Please enter a start date for the project");
      return false;
    }
    else if(currentProject.project_end_date===""){
      alert("Please enter a end date for the project");
      return false;
    }
    else if(currentProject.project_start_date>currentProject.project_end_date){
      alert("Project end date cannot be before project start date");
    }
    return true;
  }

  const handleSave = (id) => {
    if(validate()){
      var project_id = id;
      axios
        .put(
          `http://18.213.74.196:8000/api/student_project/${project_id}/update`,
          {
            student_id: profile.student_id,
            project_name: currentProject.project_name,
            project_description: currentProject.project_description,
            project_link: currentProject.project_link,
            project_tech: currentProject.project_tech,
            project_start_date: currentProject.project_start_date,
            project_end_date: currentProject.project_end_date,
            project_in_progress: currentProject.project_in_progress,
            project_role: currentProject.project_role,
          },
          getConfig()
        )
        .then((res) => {
          let updated_projects = projects.map((item) => {
            let updatedItem = { ...item };
            if (project_id === item.project_id) {
              updatedItem.project_id = item.project_id;
              updatedItem.project_name = res.data.project_name;
              updatedItem.project_description = res.data.project_description;
              updatedItem.project_link = res.data.project_link;
              updatedItem.project_tech = res.data.project_tech;
              updatedItem.project_start_date = res.data.project_start_date;
              updatedItem.project_end_date = res.data.project_end_date;
              updatedItem.project_in_progress = res.data.project_in_progress;
              updatedItem.project_role = res.data.project_role;
            }
            return updatedItem;
          });
          setProjects(updated_projects);
          handleCloseEdit();
        })
        .catch((err) => {
          console.log(err);
        });
      }
>>>>>>> b70b4b7f733e1fedaea5886674646c610e6db0b3
  };

  return (
    <div>
      <VerticalTimeline layout={"1-column-left"}>
        {projects.map((project, index) => (
          <VerticalTimelineElement
            className={classes.IconStyle}
            iconStyle={{ background: "#C8102E", color: "#fff" }}
            contentArrowStyle={{ borderRight: "7px solid #C8102E" }}
            // date={project.project_start_date}
            key={index}
            icon={<WebRoundedIcon />}>
            <h3 className={classes.verticalElementTitle}>
              {project.project_name}{" "}
            </h3>
            <h4 className={classes.verticalElementSubtitle}>
              {project.project_role}
            </h4>
<<<<<<< HEAD
            <div className={classes.skillsContainer}>
              {project.project_tech.split(",").map((skill, index) => (
                <Chip label={skill} className={classes.chips} key={index} />
              ))}
            </div>

            <p>
              {project.project_description} {project.student_id}
            </p>
=======
            {project.project_tech.split(",").map((skill, index) => (
              <Chip label={skill} className={classes.chips} key={index} />
            ))}

            <p>{project.project_description} {project.student_id}</p>
>>>>>>> b70b4b7f733e1fedaea5886674646c610e6db0b3
            <div className={clsx(classes.column, classes.helper)}>
              <Typography variant="caption">
                View source link
                <br />
                <a href={`${project.project_link}`} className={classes.link}>
                  {project.project_link}
                </a>
              </Typography>
            </div>
            <div>
              <Typography>
                <h5>
                  Date: {project.project_start_date} -{" "}
                  {project.project_end_date}
                </h5>
                {/* <h5>End: {project.project_end_date}</h5> */}
              </Typography>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}>
              <IconButton
                onClick={() => {
                  handleClickOpenEdit(project);
                }}
                fontSize="small"
                className={classes.edit}>
                <EditIcon />
              </IconButton>

              {/* EDIT PROJECT MODAL BELOW */}

              <Dialog
                open={openEdit}
                onClose={handleCloseEdit}
                aria-labelledby="form-dialog-title">
                <DialogTitle
                  classes={classes.addNewTitle}
                  id="form-dialog-title">
                  EDIT {currentProject.project_name}
                </DialogTitle>
                <DialogContent>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="project_name"
                    label="Project Name"
                    name="project_name"
                    type="string"
<<<<<<< HEAD
=======
                    inputProps={{ maxLength: 200 }}
>>>>>>> b70b4b7f733e1fedaea5886674646c610e6db0b3
                    fullWidth
                    variant="outlined"
                    value={currentProject.project_name}
                    onChange={handleCurrentProjectChange}
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    id="project_role"
                    label="Project Role"
                    type="string"
                    name="project_role"
                    fullWidth
                    variant="outlined"
<<<<<<< HEAD
=======
                    inputProps={{ maxLength: 50 }}
>>>>>>> b70b4b7f733e1fedaea5886674646c610e6db0b3
                    value={currentProject.project_role}
                    onChange={handleCurrentProjectChange}
                  />
                  <Select
                    AutoSize={true}
                    closeMenuOnSelect={true}
                    components={animatedComponents}
                    name="project_skills"
                    defaultValue={currentProjectSkills}
                    isMulti
                    isSearchable
                    onChange={(e) => {
<<<<<<< HEAD
                      if (e !== null) {
                        var skillsSeparatedByCommas = Array.prototype.map
                          .call(e, (s) => s.label)
                          .toString(); // "A,B,C"
                        if (skillsSeparatedByCommas.length > 0)
                          skillsSeparatedByCommas = skillsSeparatedByCommas.substring(
                            0,
                            skillsSeparatedByCommas.length
                          );
=======
                      if(e!==null){
                        var skillsSeparatedByCommas = Array.prototype.map
                        .call(e, (s) => s.label)
                        .toString(); // "A,B,C"
                        if(skillsSeparatedByCommas.length>0)
                          skillsSeparatedByCommas = skillsSeparatedByCommas.substring(0,skillsSeparatedByCommas.length);
>>>>>>> b70b4b7f733e1fedaea5886674646c610e6db0b3
                      }
                      setCurrentProject({
                        ...currentProject,
                        project_tech: skillsSeparatedByCommas,
                      });
                    }}
                    options={options}
                  />

                  <TextField
                    margin="dense"
                    id="outlined-multiline-static"
                    multiline
                    rows={4}
                    variant="outlined"
                    value={currentProject.project_description}
                    fullWidth
                    name="project_description"
<<<<<<< HEAD
                    type="string"
                    inputProps={{ maxLength: 350 }}
=======
                    type= "string"
                    inputProps={{ maxLength: 500 }}
>>>>>>> b70b4b7f733e1fedaea5886674646c610e6db0b3
                    onChange={handleCurrentProjectChange}
                  />
                  <TextField
                    margin="dense"
                    id="outlined-static"
                    helperText="Source Link"
                    value={currentProject.project_link}
                    name="project_link"
                    type="string"
                    fullWidth
                    variant="outlined"
<<<<<<< HEAD
=======
                    inputProps={{ maxLength: 200 }}
>>>>>>> b70b4b7f733e1fedaea5886674646c610e6db0b3
                    onChange={handleCurrentProjectChange}
                  />
                  <TextField
                    margin="dense"
                    id="start_date"
                    type="date"
                    name="project_start_date"
                    value={currentProject.project_start_date}
                    className={classes.projectDate}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="outlined"
                    helperText="Start Date"
                    onChange={handleCurrentProjectChange}
                  />
                  <TextField
                    margin="dense"
                    id="end_date"
                    type="date"
                    name="project_end_date"
                    value={currentProject.project_end_date}
                    className={classes.projectDate}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="outlined"
                    helperText="End Date"
                    onChange={handleCurrentProjectChange}
                  />
                  <FormControl component="fieldset">
                    <FormGroup aria-label="position" row>
<<<<<<< HEAD
                      <FormControlLabel
                        value="end"
                        control={
                          <Checkbox
                            style={{ color: "#C8102E" }}
                            onChange={(e) => {
                              setCurrentProject({
                                ...currentProject,
                                project_in_progress: e.target.checked,
                              });
                            }}
                          />
                        }
                        label={
                          <Typography style={{ fontSize: 15 }}>
                            Check if project "In Progress"
                          </Typography>
                        }
                      />
=======
                    <FormControlLabel
                    value="end"
                    control={
                      <Checkbox
                        style={{ color: "#C8102E" }}
                        onChange={(e) => {
                          setCurrentProject({
                            ...currentProject,
                            project_in_progress: e.target.checked,
                          });
                        }}
                      />
                    }
                    label={
                      <Typography style={{ fontSize: 15 }}>
                        Check if project "In Progress"
                      </Typography>
                    }
                  />
>>>>>>> b70b4b7f733e1fedaea5886674646c610e6db0b3
                    </FormGroup>
                  </FormControl>
                </DialogContent>

                <DialogActions>
                  <Button
                    onClick={handleCloseEdit}
                    style={{ backgroundColor: "#f0f0f0", color: "#C8102E" }}>
                    Cancel
                  </Button>
                  <Button
                    onClick={() => {
                      handleSave(project.project_id);
                    }}
                    style={{ backgroundColor: "#C8102E", color: "#FFFFFF" }}
                    className={classes.projectAdd}>
                    SAVE
                  </Button>
                </DialogActions>
              </Dialog>

              {/* END OF EDIT PROJECT MODAL */}

              {/* ----------------
          THIS IS DELETE BUTTON BELOW
          ---------------- */}
              <IconButton
                onClick={handleClickOpenDelete}
                aria-label="delete"
                fontSize="small"
                className={classes.delete}>
                <DeleteIcon />
              </IconButton>
              <Dialog
                open={openDelete}
                onClose={handleCloseDelete}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle
                  id="alert-dialog-title"
                  className={classes.dialogDelete}>
                  <WarningIcon />
                  {"WARNING!"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    You are about to delete a project. Project will be removed
                    permanently and action cannot be undone. Do you wish to
                    continue?
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={handleCloseDelete}
                    style={{ backgroundColor: "#f0f0f0", color: "#C8102E" }}>
                    Cancel
                  </Button>
                  <Button
                    onClick={() => {
                      handleDelete(project.project_id);
                    }}
                    style={{ backgroundColor: "#C8102E", color: "#FFFFFF" }}
                    className={classes.projectAdd}>
                    DELETE
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>
    </div>
  );
}

export default StudentProject;
import React, { useState, useEffect, useContext } from "react";
import ProfileLogo from "../../assets/ProfilePage.jpg";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  List,
  ListItem,
  Divider,
  ListItemText,
  ListItemIcon,
  IconButton,
  Input,
  Select,
  MenuItem,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  TextField,
  DialogActions,
  DialogContent,
  RadioGroup,
  Radio,
  FormControlLabel,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import Tooltip from "@material-ui/core/Tooltip";
import PersonRoundedIcon from "@material-ui/icons/PersonRounded";
import BusinessRoundedIcon from "@material-ui/icons/BusinessRounded";
import WorkRoundedIcon from "@material-ui/icons/WorkRounded";
import ShortTextRoundedIcon from "@material-ui/icons/ShortTextRounded";
import PeopleRoundedIcon from "@material-ui/icons/PeopleRounded";
import LanguageRoundedIcon from "@material-ui/icons/LanguageRounded";
import PhoneRoundedIcon from "@material-ui/icons/PhoneRounded";
import LocationOnRoundedIcon from "@material-ui/icons/LocationOnRounded";
import EditTwoToneIcon from "@material-ui/icons/EditTwoTone";

import { DataContext } from "../../contexts/dataContext";
import { getConfig } from "../../authConfig";
import axios from "axios";

const industryTypes = [
  "Agriculture Services",
  "Architecture/Design",
  "Arts/Education",
  "Business/Finance/Consulting",
  "Construction/RealEstate",
  "Engineering/Manufacturing",
  "Education Services",
  "Food Service",
  "Hospitality",
  "Tourism",
  "GOvernment/Non-Profites",
  "Healthcare/Life-Science",
  "Information Technology",
  "Legal",
  "Marketing",
  "Media/Communications",
  "Religious Organizations",
  "Retail/Trade/Fashion",
  "Sports/Recreation",
  "Utilities/Energy/Environment",
  "UH Faculty/Staff",
  "Transportation/Logistics",
];

const useStyles = makeStyles((theme) => ({
  profileLogo: {
    objectFit: "contain",
    // display: "flex",
    position: "relative",
    maxHeight: "300px",
  },
  inline: {
    display: "inline",
  },
  profileHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  icon: {
    objectFit: "contain",
    position: "relative",
    color: "#f50057",
  },
  skills: {
    textAlign: "center",
    borderRadius: 200,
    backgroundColor: "#FFFFFF",
  },
  halfWidth: {
    width: "50%",
  },
  fullWidth: {
    width: "100%",
  },
  quarterWidth: {
    width: "25%",
  },
  formInput: {
    width: "100%",
  },
  formInput2: {
    width: "20%",
    marginRight: "30px",
  },
  dialogInput: {
    paddingBottom: theme.spacing(2),
  },
  loginAlert: {
    marginBottom: theme.spacing(2),
  },
  dialogConfirm: {
    marginBottom: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  inputLabel: {
    fontSize: "1rem",
    lineHeight: "1.5",
  },
  flex: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
}));
export default function CompanyProfile() {
  const classes = useStyles();
  const states = [
    "AL",
    "AK",
    "AZ",
    "AR",
    "CA",
    "CO",
    "CT",
    "DE",
    "DC",
    "FL",
    "GA",
    "HI",
    "ID",
    "IL",
    "IN",
    "IA",
    "KS",
    "KY",
    "LA",
    "ME",
    "MD",
    "MA",
    "MI",
    "MN",
    "MS",
    "MO",
    "MT",
    "NE",
    "NV",
    "NH",
    "NJ",
    "NM",
    "NY",
    "NC",
    "ND",
    "OH",
    "OK",
    "OR",
    "PA",
    "RI",
    "SC",
    "SD",
    "TN",
    "TX",
    "UT",
    "VT",
    "VA",
    "WA",
    "WV",
    "WI",
    "WY",
  ];

  //initially get the data from DataContext

  const { data, dispatch } = useContext(DataContext);
  const { profile } = data;

  const [profileInfo, setProfileInfo] = useState({
    //This is the data you get from api.
    name: null,
    companyMission: null,
    companyDescription: null,
    companyType: null,
    companyWebsite: null,
    companyRep: null,
    industryType: null,
    phoneNumber: null,
    streetAddress: null,
    city: null,
    state: null,
    streetAddress2: null,
    city2: null,
    state2: null,
    isSolo: null,
  });

  const getStreetAddress = (address) => {
    if (address !== "") {
      const res = address.split("|");
      return res[0];
    }
    return null;
  };

  const getCity = (address) => {
    if (address !== "") {
      const res = address.split("|");
      return res[1];
    }
    return null;
  };

  const getState = (address) => {
    if (address !== "") {
      const res = address.split("|");
      return res[2];
    }
    return null;
  };

  const getCompanyAddress = () => {
    if (profileInfo.streetAddress && profileInfo.city && profileInfo.state) {
      return `${profileInfo.streetAddress}|${profileInfo.city}|${profileInfo.state}`;
    }
    return "";
  };

  const getMailingAddress = () => {
    if (profileInfo.streetAddress2 && profileInfo.city2 && profileInfo.state2) {
      return `${profileInfo.streetAddress2}|${profileInfo.city2}|${profileInfo.state2}`;
    }
    return "";
  };

  useEffect(() => {
    if (Object.entries(profile).length !== 0) {
      //continue only if after you fetch the data.
      setProfileInfo({
        name: profile.company_name,
        companyMission: profile.company_mission,
        companyDescription: profile.company_description,
        companyType: profile.company_type,
        companyWebsite: profile.company_website,
        companyRep: profile.representative_name,
        industryType: profile.industry_type,
        phoneNumber: profile.company_phone_no,
        streetAddress: getStreetAddress(profile.company_address),
        city: getCity(profile.company_address),
        state: getState(profile.company_address),
        streetAddress2: getStreetAddress(profile.mailing_address),
        city2: getCity(profile.mailing_address),
        state2: getState(profile.mailing_address),
        isSolo: profile.company_representative_type,
      });
    }
  }, [profile]);

  const [showEditFields, setShowEditFields] = useState(false);

  const handleOpenEdit = () => {
    setShowEditFields(!showEditFields);
  };

  const handleChange = (e) => {
    setProfileInfo({
      ...profileInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleCancel = () => {
    setProfileInfo({
      name: profile.company_name,
      companyMission: profile.company_mission,
      companyDescription: profile.company_description,
      companyType: profile.company_type,
      companyWebsite: profile.company_website,
      companyRep: profile.representative_name,
      industryType: profile.industry_type,
      phoneNumber: profile.company_phone_no,
      streetAddress: getStreetAddress(profile.company_address),
      city: getCity(profile.company_address),
      state: getState(profile.company_address),
      streetAddress2: getStreetAddress(profile.mailing_address),
      city2: getCity(profile.mailing_address),
      state2: getState(profile.mailing_address),
      isSolo: profile.company_representative_type,
    });
    setShowEditFields(!showEditFields);
  };

  const handleSave = () => {
    setDialogOpen(true);
  };

  const [dialogOpen, setDialogOpen] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleDialogClose = () => {
    setEmail("");
    setPassword("");
    setDialogOpen(false);
  };

  const [authError, setAuthError] = useState("");
  const [updateErrors, setUpdateErrors] = useState({
    comapny_name: "",
    company_phone_no: "",
    company_name: "",
    industry_type: "",
    representative_name: "",
    company_representative_type: "",
    company_type: "",
    company_address: "",
    mailing_address: "",
    company_website: "",
    company_mission: "",
    company_description: "",
  });

  const handleConfirm = () => {
    axios
      .post("http://18.213.74.196:8000/api/token/", {
        email: email,
        password: password,
      })
      .then((res) => {
        //first remove local storage
        console.log("login successful");
        localStorage.setItem("token", res.data.access);
        localStorage.setItem("role_id", res.data.role_id);
        localStorage.setItem("email_id", res.data.email_id);
        localStorage.setItem("slug", res.data.slug);
        let slug = res.data.slug;
        axios
          .put(
            `http://18.213.74.196:8000/api/company_profile/${slug}/update`,
            {
              username: localStorage.getItem("email_id"),
              company_name: profileInfo.name,
              company_phone_no: profileInfo.phoneNumber,
              industry_type: profileInfo.industryType,
              representative_name: profileInfo.companyRep,
              company_representative_type: profileInfo.isSolo,
              company_type: profileInfo.companyType,
              company_address: getCompanyAddress(),
              mailing_address: getMailingAddress(),
              company_website: profileInfo.companyWebsite,
              company_mission: profileInfo.companyMission,
              company_description: profileInfo.companyDescription,
            },
            getConfig()
          )
          .then((res) => {
            console.log("update successful");
            axios
              .post("http://18.213.74.196:8000/api/token/", {
                email: email,
                password: password,
              })
              .then((res) => {
                console.log("login again sucessful");
                localStorage.setItem("token", res.data.access);
                localStorage.setItem("role_id", res.data.role_id);
                localStorage.setItem("email_id", res.data.email_id);
                localStorage.setItem("slug", res.data.slug);
                setEmail(null);
                setPassword(null);
              });
            dispatch({ type: "UPDATE_PROFILE", payload: res.data });
            setDialogOpen(false);
            setShowEditFields(false);
          })
          .catch((err) => {
            setUpdateErrors({ ...updateErrors, ...err.response.data });
            setDialogOpen(false);
          });
      })
      .catch((err) => {
        setAuthError(
          err.response.data.detail +
            ". Make sure your email and password is correct."
        );
      });
  };

  return (
    <div>
      <div className={classes.profileHeader}>
        <img
          alt="profile logo"
          className={classes.profileLogo}
          src={ProfileLogo}></img>
        <ListItem>
          <Tooltip title="Edit Profile" placement="top">
            <IconButton className={classes.icon} onClick={handleOpenEdit}>
              <EditTwoToneIcon />
            </IconButton>
          </Tooltip>
        </ListItem>
      </div>
      <form>
        <List>
          <ListItem alignItems="flex-start">
            <ListItemIcon>
              <BusinessRoundedIcon fontSize="large" />
            </ListItemIcon>
            {showEditFields === false ? (
              <ListItemText
                primary="Company Name"
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.inline}
                      color="textPrimary">
                      {profileInfo.name}
                    </Typography>
                  </React.Fragment>
                }
              />
            ) : (
              <div className={classes.halfWidth}>
                <Typography>Company Name</Typography>
                <Input
                  className={classes.formInput}
                  value={profileInfo.name}
                  onChange={handleChange}
                  placeholder={profileInfo.name}
                  name="name"
                  error={updateErrors.company_name !== ""}></Input>
                {updateErrors.company_name ? (
                  <Typography color="error">
                    {updateErrors.company_name}
                  </Typography>
                ) : null}
              </div>
            )}
          </ListItem>
          {!showEditFields ? <Divider variant="inset" component="li" /> : null}
          <ListItem alignItems="flex-start">
            <ListItemIcon>
              <ShortTextRoundedIcon fontSize="large" />
            </ListItemIcon>
            {showEditFields === false ? (
              <ListItemText
                primary="Company Mission"
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.inline}
                      color="textPrimary">
                      {profileInfo.companyMission}
                    </Typography>
                  </React.Fragment>
                }
              />
            ) : (
              <div className={classes.halfWidth}>
                <Typography>Company Mission</Typography>
                <Input
                  className={classes.formInput}
                  value={profileInfo.companyMission}
                  onChange={handleChange}
                  placeholder={profileInfo.companyMission}
                  name="companyMission"
                  error={updateErrors.company_mission !== ""}></Input>
                {updateErrors.company_mission ? (
                  <Typography>{updateErrors.company_mission}</Typography>
                ) : null}
              </div>
            )}
          </ListItem>
          {!showEditFields ? <Divider variant="inset" component="li" /> : null}
          <ListItem alignItems="flex-start">
            <ListItemIcon>
              <ShortTextRoundedIcon fontSize="large" />
            </ListItemIcon>
            {showEditFields === false ? (
              <ListItemText
                primary="Company Description"
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.inline}
                      color="textPrimary">
                      {profileInfo.companyDescription}
                    </Typography>
                  </React.Fragment>
                }
              />
            ) : (
              <div className={classes.halfWidth}>
                <Typography>Company Description</Typography>
                <Input
                  className={classes.formInput}
                  value={profileInfo.companyDescription}
                  onChange={handleChange}
                  name="companyDescription"
                  error={updateErrors.company_description !== ""}></Input>
                {updateErrors.company_description ? (
                  <Typography color="error">
                    {updateErrors.company_description}
                  </Typography>
                ) : null}
              </div>
            )}
          </ListItem>
          {!showEditFields ? <Divider variant="inset" component="li" /> : null}
          <ListItem alignItems="flex-start">
            <ListItemIcon>
              <PersonRoundedIcon />
            </ListItemIcon>
            {showEditFields === false ? (
              <ListItemText
                primary="Company Represntative"
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.inline}
                      color="textPrimary">
                      {profileInfo.companyRep}
                    </Typography>
                  </React.Fragment>
                }
              />
            ) : (
              <div className={classes.halfWidth}>
                <Typography>Company Representative</Typography>
                <Input
                  className={classes.formInput}
                  value={profileInfo.companyRep}
                  onChange={handleChange}
                  name="companyRep"
                  error={updateErrors.representative_name !== ""}></Input>
                {updateErrors.representative_name ? (
                  <Typography color="error">
                    {updateErrors.representative_name}
                  </Typography>
                ) : null}
              </div>
            )}
          </ListItem>
          {!showEditFields ? <Divider variant="inset" component="li" /> : null}
          <ListItem alignItems="flex-start">
            <ListItemIcon>
              <LanguageRoundedIcon />
            </ListItemIcon>
            {showEditFields === false ? (
              <ListItemText
                primary="Website"
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.inline}
                      color="textPrimary">
                      {profileInfo.companyWebsite}
                    </Typography>
                  </React.Fragment>
                }
              />
            ) : (
              <div className={classes.halfWidth}>
                <Typography>Company Website</Typography>
                <Input
                  className={classes.formInput}
                  value={profileInfo.companyWebsite}
                  onChange={handleChange}
                  name="companyWebsite"
                  error={updateErrors.company_website !== ""}></Input>
                {updateErrors.company_website ? (
                  <Typography color="error">
                    {updateErrors.company_website}
                  </Typography>
                ) : null}
              </div>
            )}
          </ListItem>
          {!showEditFields ? <Divider variant="inset" component="li" /> : null}
          <ListItem alignItems="flex-start">
            <ListItemIcon>
              <BusinessRoundedIcon />
            </ListItemIcon>
            {showEditFields === false ? (
              <ListItemText
                primary="Company Type"
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.inline}
                      color="textPrimary">
                      {profileInfo.companyType === 0
                        ? "Social Business"
                        : profileInfo.companyType === 1
                        ? "Private"
                        : "Non-Profit"}
                    </Typography>
                  </React.Fragment>
                }
              />
            ) : (
              <div className={classes.halfWidth}>
                <Typography>Company Type</Typography>
                <Select
                  value={profileInfo.companyType}
                  name="companyType"
                  className={classes.formInput}
                  onChange={handleChange}>
                  <MenuItem value="1">Private</MenuItem>
                  <MenuItem value="2">Non-Profit</MenuItem>
                  <MenuItem value="0">Social Business</MenuItem>
                </Select>
              </div>
            )}
          </ListItem>
          {!showEditFields ? <Divider variant="inset" component="li" /> : null}
          <ListItem alignItems="flex-start">
            <ListItemIcon>
              <WorkRoundedIcon />
            </ListItemIcon>
            {showEditFields === false ? (
              <ListItemText
                primary="Industry Type"
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.inline}
                      color="textPrimary">
                      {profileInfo.industryType}
                    </Typography>
                  </React.Fragment>
                }
              />
            ) : (
              <div className={classes.halfWidth}>
                <Typography>Industry Type</Typography>
                <Select
                  className={classes.formInput}
                  value={profileInfo.industryType}
                  onChange={handleChange}
                  name="industryType"
                  component="span">
                  {industryTypes.map((industryType) => (
                    <MenuItem key={industryType} value={industryType}>
                      {industryType}
                    </MenuItem>
                  ))}
                </Select>
              </div>
            )}
          </ListItem>
          {!showEditFields ? <Divider variant="inset" component="li" /> : null}
          <ListItem alignItems="flex-start">
            <ListItemIcon>
              <PhoneRoundedIcon />
            </ListItemIcon>
            {showEditFields === false ? (
              <ListItemText
                primary="Phone Number"
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.inline}
                      color="textPrimary">
                      {profileInfo.phoneNumber}
                    </Typography>
                  </React.Fragment>
                }
              />
            ) : (
              <div className={classes.halfWidth}>
                <Typography>Phone Number</Typography>
                <Input
                  className={classes.formInput}
                  value={profileInfo.phoneNumber}
                  onChange={handleChange}
                  name="phoneNumber"
                  error={updateErrors.company_phone_no !== ""}></Input>
                {updateErrors.company_phone_no ? (
                  <Typography color="error">
                    {updateErrors.company_phone_no}
                  </Typography>
                ) : null}
              </div>
            )}
          </ListItem>
          {!showEditFields ? <Divider variant="inset" component="li" /> : null}
          <ListItem alignItems="flex-start">
            <ListItemIcon>
              <PeopleRoundedIcon />
            </ListItemIcon>
            {showEditFields === false ? (
              <ListItemText
                primary="One Person Company"
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.inline}
                      color="textPrimary">
                      {profileInfo.isSolo === 1 ? "Yes" : "No"}
                    </Typography>
                  </React.Fragment>
                }
              />
            ) : (
              <div className={classes.halfWidth}>
                <Typography>Are you a single member company</Typography>
                <RadioGroup
                  aria-label="Are you one person company"
                  name="isSolo"
                  value={profileInfo.isSolo}
                  onChange={handleChange}>
                  <FormControlLabel
                    value="1"
                    control={<Radio />}
                    label="Yes (1)"
                  />
                  <FormControlLabel
                    value="0"
                    control={<Radio />}
                    label="No (>=2)"
                  />
                </RadioGroup>
              </div>
            )}
          </ListItem>
          {!showEditFields ? <Divider variant="inset" component="li" /> : null}
          <ListItem alignItems="flex-start">
            <ListItemIcon>
              <LocationOnRoundedIcon />
            </ListItemIcon>
            {showEditFields === false ? (
              <ListItemText
                primary="Company Address"
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.inline}
                      color="textPrimary">
                      {`${profileInfo.streetAddress},  ${profileInfo.city}, ${profileInfo.state}`}
                    </Typography>
                  </React.Fragment>
                }
              />
            ) : (
              <>
                <Grid container spacing={2}>
                  <Grid item xs={2}>
                    <Typography>Company Address</Typography>
                    <Input
                      className={classes.fullWidth}
                      value={profileInfo.streetAddress}
                      onChange={handleChange}
                      name="streetAddress"
                      placeholder="Street Address"></Input>
                    {profileInfo.streetAddress === "" ? (
                      <Typography color="error">
                        {updateErrors.company_address}
                      </Typography>
                    ) : null}
                  </Grid>
                  <Grid item xs={2}>
                    <Typography>City</Typography>
                    <Input
                      className={classes.fullWidth}
                      value={profileInfo.city}
                      onChange={handleChange}
                      name="city"></Input>
                    {profileInfo.city === "" ? (
                      <Typography color="error">
                        {updateErrors.company_address}
                      </Typography>
                    ) : null}
                  </Grid>
                  <Grid item xs={2}>
                    <Typography>State</Typography>
                    <Select
                      className={classes.fullWidth}
                      label="State"
                      value={profileInfo.state}
                      onChange={handleChange}
                      name="state"
                      placeholder="state">
                      {states.map((state) => (
                        <MenuItem key={state} value={state}>
                          {state}
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>
                </Grid>
              </>
            )}
          </ListItem>
          {!showEditFields ? <Divider variant="inset" component="li" /> : null}
          <ListItem alignItems="flex-start">
            <ListItemIcon>
              <LocationOnRoundedIcon />
            </ListItemIcon>
            {showEditFields === false ? (
              <ListItemText
                primary="Mailing Address"
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.inline}
                      color="textPrimary">
                      {`${profileInfo.streetAddress2},  ${profileInfo.city2}, ${profileInfo.state2}`}
                    </Typography>
                  </React.Fragment>
                }
              />
            ) : (
              <>
                <Grid container spacing={2}>
                  <Grid item xs={2}>
                    <Typography>Mailing Address</Typography>
                    <Input
                      className={classes.fullWidth}
                      value={profileInfo.streetAddress2}
                      onChange={handleChange}
                      name="streetAddress2"
                      placeholder="Street Address"></Input>
                    {profileInfo.streetAddress2 === "" ? (
                      <Typography color="error">
                        {updateErrors.mailing_address}
                      </Typography>
                    ) : null}
                  </Grid>
                  <Grid item xs={2}>
                    <Typography>City</Typography>
                    <Input
                      className={classes.fullWidth}
                      value={profileInfo.city2}
                      onChange={handleChange}
                      name="city2"></Input>
                    {profileInfo.city2 === "" ? (
                      <Typography color="error">
                        {updateErrors.mailing_address}
                      </Typography>
                    ) : null}
                  </Grid>
                  <Grid item xs={2}>
                    <Typography>State</Typography>
                    <Select
                      className={classes.fullWidth}
                      label="State"
                      value={profileInfo.state2}
                      onChange={handleChange}
                      name="state2">
                      {states.map((state) => (
                        <MenuItem key={state} value={state}>
                          {state}
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>
                </Grid>
              </>
            )}
          </ListItem>
          {showEditFields ? (
            <ListItem>
              <Grid
                container
                id="buttons-container"
                justify="flex-end"
                spacing={4}>
                <Grid item>
                  <Button
                    variant="outlined"
                    color="secondary"
                    size="large"
                    onClick={handleCancel}>
                    Cancel
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    onClick={handleSave}>
                    Save
                  </Button>
                </Grid>
              </Grid>
            </ListItem>
          ) : null}
        </List>
      </form>
      <Dialog
        onClose={handleDialogClose}
        open={dialogOpen}
        className={classes.dialog}>
        <DialogTitle>Enter Email and Password to Confirm</DialogTitle>
        {authError ? (
          <Alert
            className={classes.loginAlert}
            variant="filled"
            severity="error">
            {authError}
          </Alert>
        ) : null}
        <DialogContent>
          <TextField
            variant="outlined"
            fullWidth
            id="email"
            label="Email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
            className={classes.dialogInput}
          />
          <TextField
            variant="outlined"
            fullWidth
            id="password"
            label="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
            type="password"
            className={classes.dialogInput}
          />
        </DialogContent>
        <DialogActions className={classes.dialogConfirm}>
          <Button
            onClick={handleConfirm}
            color="secondary"
            variant="outlined"
            className={classes.dialogConfirm}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

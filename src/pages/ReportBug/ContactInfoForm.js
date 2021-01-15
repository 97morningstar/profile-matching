import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

export default function ContactInfoForm({ reportDetails, setReportDetails }) {
  const { first_name, last_name, contact_email, contact_phone } = reportDetails

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Enter your contact info below
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="FirstName"
            name="FirstName"
            label="First Name"
            fullWidth
            autoComplete="First Name"
            handleChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="LastName"
            name="LastNmae"
            label="Last Name"
            fullWidth
            autoComplete="LastName"
            handleChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="email"
            name="email"
            label="Email"
            fullWidth
            autoComplete="email"
            handleChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="phoneNumber"
            name="phoneNumber"
            label="Phone Number"
            fullWidth
            autoComplete="phoneNumber"
            handleChange={handleChange}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

import { Formik, Form, FormikHelpers } from "formik";
import { Button, Grid2, Typography } from "@mui/material";
import TextField from "../components/forms/TextField";
import { Credentials } from "@shared_types";
import { signup } from "../actions/session";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

function SignupPage() {
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const handleOnSubmit = async (
    values: Credentials,
    { setSubmitting }: FormikHelpers<Credentials>
  ) => {
    try {
      await signup(values);

      enqueueSnackbar("Account created with success !", {
        variant: "success",
      });
      navigate("/login");
    } catch (error) {
      console.error("Error when trying to create the account", error);
      enqueueSnackbar("Error when trying to create the account", {
        variant: "error",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Grid2 container justifyContent="center">
      <Grid2 size={{ xs: 12, sm: 8, md: 6, lg: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Create an account
        </Typography>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={handleOnSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <TextField
                name="email"
                label="Email"
                variant="outlined"
                margin="normal"
                fullWidth
                autoFocus
              />
              <TextField
                type="password"
                name="password"
                label="Password"
                variant="outlined"
                margin="normal"
                fullWidth
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={isSubmitting}
              >
                Sign up
              </Button>
            </Form>
          )}
        </Formik>
      </Grid2>
    </Grid2>
  );
}

export default SignupPage;

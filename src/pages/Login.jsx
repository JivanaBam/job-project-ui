import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  LinearProgress,
  TextField,
  Typography,
} from "@mui/material";
import { Formik } from "formik";
import React from "react";
import { loginUserValidationSchema } from "../validationSchema/login.validation.schema";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import $axios from "../../axios/axios.instance";

const Login = () => {
  const navigate = useNavigate();

  const { isPending, mutate } = useMutation({
    mutationKey: ["user-login"],
    mutationFn: async (values) => {
      console.log(values);
      return await $axios.post("/user/login", values);
    },

    onSuccess: (res) => {
      navigate("/viewerTable");
      console.log(res?.data?.message);

      console.log(data);
      const accessToken = res?.data?.Token;
      const role = res?.data?.userDetails?.role;
      const firstName = res?.data?.userDetails?.firstName;

      // set these values to local storage
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("role", role);
      localStorage.setItem("firstName", firstName);
    },

    onError: (error) => {
      console.log(error?.response?.data?.message);
    },
  });
  return (
    <Box>
      <>
        {isPending && <LinearProgress color="primary" />}
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={loginUserValidationSchema}
          onSubmit={(values) => {
            mutate(values);
            console.log(values);
          }}
        >
          {(formik) => {
            return (
              <form
                onSubmit={formik.handleSubmit}
                style={{
                  boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-around",
                  padding: "1rem",
                  gap: "1rem",
                  width: "350px",
                }}
              >
                <Typography variant="h4">Sign in</Typography>
                <FormControl>
                  <TextField
                    label="Email"
                    {...formik.getFieldProps("email")}
                    required
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <FormHelperText error>{formik.errors.email}</FormHelperText>
                  ) : null}
                </FormControl>

                <FormControl>
                  <TextField
                    label="Password"
                    {...formik.getFieldProps("password")}
                    required
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <FormHelperText error>
                      {formik.errors.password}
                    </FormHelperText>
                  ) : null}
                </FormControl>

                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={isPending}
                >
                  Login
                </Button>

                <Link to="/register">New here? Register</Link>
              </form>
            );
          }}
        </Formik>
      </>
    </Box>
  );
};

export default Login;

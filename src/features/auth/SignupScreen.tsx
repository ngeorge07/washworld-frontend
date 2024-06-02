import {
  AlertCircleIcon,
  Button,
  ButtonText,
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlHelper,
  FormControlHelperText,
  FormControlLabel,
  FormControlLabelText,
  Input,
  InputField,
  ScrollView,
  View,
} from "@gluestack-ui/themed";
import { Formik } from "formik";
import React, { FC } from "react";

type FormData = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export const SignupScreen: FC = () => {
  const initialValues: FormData = {
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validate = (values: FormData) => {
    const errors: Partial<FormData> = {};

    // Full Name validation
    if (!values.fullName) {
      errors.fullName = "Please enter your full name.";
    }

    // Email validation
    if (!values.email) {
      errors.email = "Please enter your email address.";
    } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
      errors.email = "Invalid email address";
    }

    // Password validation
    if (!values.password) {
      errors.password = "Please enter a password.";
    } else if (!/^(?=.*[A-Z])(?=.*\d).{6,}$/.test(values.password)) {
      errors.password =
        "Password must be at least 6 characters, include one uppercase letter and one number.";
    }

    // Confirm Password validation
    if (!values.confirmPassword) {
      errors.confirmPassword = "Please confirm your password.";
    } else if (values.password !== values.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    return errors;
  };

  return (
    <ScrollView>
      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={(values) => console.log(values)}
        validateOnBlur={false}
        validateOnChange={false}
      >
        {({ errors, handleChange, handleBlur, handleSubmit, values }) => (
          <View>
            {/* Full Name Field */}
            <FormControl
              size="md"
              isInvalid={errors.fullName ? true : false}
              isRequired={true}
            >
              <FormControlLabel mb="$1">
                <FormControlLabelText>Full Name</FormControlLabelText>
              </FormControlLabel>
              <Input>
                <InputField
                  type="text"
                  placeholder="Full Name"
                  onChangeText={(text) => {
                    handleChange("fullName")(text); // Handle text change
                    if (errors.fullName) {
                      // Clear the error if it exists
                      errors.fullName = undefined;
                    }
                  }}
                  onBlur={handleBlur("fullName")}
                  value={values.fullName}
                />
              </Input>
              <FormControlError>
                <FormControlErrorIcon as={AlertCircleIcon} />
                <FormControlErrorText>{errors.fullName}</FormControlErrorText>
              </FormControlError>
            </FormControl>

            {/* Email Field */}
            <FormControl
              size="md"
              isInvalid={errors.email ? true : false}
              isRequired={true}
            >
              <FormControlLabel mb="$1">
                <FormControlLabelText>Email</FormControlLabelText>
              </FormControlLabel>
              <Input>
                <InputField
                  type="text"
                  placeholder="Email"
                  onChangeText={(text) => {
                    handleChange("email")(text);
                    if (errors.email) {
                      errors.email = undefined;
                    }
                  }}
                  onBlur={handleBlur("email")}
                  value={values.email}
                />
              </Input>
              <FormControlError>
                <FormControlErrorIcon as={AlertCircleIcon} />
                <FormControlErrorText>{errors.email}</FormControlErrorText>
              </FormControlError>
            </FormControl>

            {/* Password Field */}
            <FormControl
              size="md"
              isInvalid={errors.password ? true : false}
              isRequired={true}
            >
              <FormControlLabel mb="$1">
                <FormControlLabelText>Password</FormControlLabelText>
              </FormControlLabel>
              <Input>
                <InputField
                  type="password"
                  placeholder="Password"
                  onChangeText={(text) => {
                    handleChange("password")(text);
                    if (errors.password) {
                      errors.password = undefined;
                    }
                  }}
                  onBlur={handleBlur("password")}
                  value={values.password}
                />
              </Input>
              <FormControlError>
                <FormControlErrorIcon as={AlertCircleIcon} />
                <FormControlErrorText>{errors.password}</FormControlErrorText>
              </FormControlError>
              {!errors.password && (
                <FormControlHelper>
                  <FormControlHelperText>
                    Must be at least 6 characters, include one uppercase letter
                    and one number.
                  </FormControlHelperText>
                </FormControlHelper>
              )}
            </FormControl>

            {/* Confirm Password Field */}
            <FormControl
              size="md"
              isInvalid={errors.confirmPassword ? true : false}
              isRequired={true}
            >
              <FormControlLabel mb="$1">
                <FormControlLabelText>Confirm Password</FormControlLabelText>
              </FormControlLabel>
              <Input>
                <InputField
                  type="password"
                  placeholder="Confirm Password"
                  onChangeText={(text) => {
                    handleChange("confirmPassword")(text); // Handle text change
                    if (errors.confirmPassword) {
                      // Clear the error if it exists
                      errors.confirmPassword = undefined;
                    }
                  }}
                  onBlur={handleBlur("confirmPassword")}
                  value={values.confirmPassword}
                />
              </Input>
              <FormControlError>
                <FormControlErrorIcon as={AlertCircleIcon} />
                <FormControlErrorText>
                  {errors.confirmPassword}
                </FormControlErrorText>
              </FormControlError>
            </FormControl>

            {/* Submit Button */}
            <Button onPress={() => handleSubmit()}>
              <ButtonText>Submit</ButtonText>
            </Button>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};

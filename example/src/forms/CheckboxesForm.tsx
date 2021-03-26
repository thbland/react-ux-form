import { Button } from "@chakra-ui/button";
import { Checkbox } from "@chakra-ui/checkbox";
import { Box, HStack } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import * as React from "react";
import { useForm } from "../../../src";
import { Page } from "../components/Page";

export const CheckboxesForm = () => {
  const { Field, resetForm, submitForm } = useForm({
    termsAndConditions: {
      strategy: "onSubmit",
      initialValue: false,
      validate: (value) => {
        // console.log({ value });

        if (!value) {
          return "You must accept terms and conditions";
        }
      },
    },
    emailsFromPartners: {
      strategy: "onSubmit",
      initialValue: false,
      validate: (value) => {
        // console.log({ value });

        if (!value) {
          return "You must accept to receive email from partners";
        }
      },
    },
  });

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    submitForm(
      (values) => {
        console.log("values", values);

        toast({
          title: "Submission succeeded",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      },
      (errors) => {
        console.log("errors", errors);

        toast({
          title: "Submission failed",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      },
    );
  };

  const toast = useToast();

  return (
    <Page title="Checkboxes">
      <form onSubmit={onSubmit}>
        <Field name="termsAndConditions">
          {({ onChange, value, error }) => (
            <Checkbox
              display="flex"
              isInvalid={error != null}
              isChecked={value}
              onChange={(e) => onChange(e.target.checked)}
            >
              Accept terms and conditions
            </Checkbox>
          )}
        </Field>

        <Box height={1} />

        <Field name="emailsFromPartners">
          {({ onChange, value, error }) => (
            <Checkbox
              display="flex"
              isInvalid={error != null}
              isChecked={value}
              onChange={(e) => onChange(e.target.checked)}
            >
              Receive emails from partners
            </Checkbox>
          )}
        </Field>

        <Box height={4} />

        <HStack display="flex" align="initial" spacing={3}>
          <Button alignSelf="flex-end" onClick={resetForm}>
            Reset
          </Button>

          <Button colorScheme="green" onClick={onSubmit} type="submit">
            Submit
          </Button>
        </HStack>
      </form>
    </Page>
  );
};

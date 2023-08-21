import {
  Box,
  Button,
  Flex,
  Input,
  Select,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import React, { FC } from "react";
import useSWRMutation from "swr/mutation";
import { v4 as uuidv4 } from "uuid";

import { OPTIONS, URL, gptValidationSchema } from "../../../../config";

import Props from "../../../../types";
import { fetcher } from "lib/get-data";

const GptTab: FC<Props> = ({ items, setItems }) => {
  const formik = useFormik({
    initialValues: {
      questionTitle: "",
      questionType: "",
      description: "",
    },
    validationSchema: gptValidationSchema,
    onSubmit: () => {
      trigger(formik.values.description);
    },
  });

  const { trigger, data, isMutating, error } = useSWRMutation(URL, fetcher);

  React.useEffect(() => {
    if (data) {
      const previousQuestions = JSON.parse(
        localStorage.getItem("questions") || "[]",
      );
      const newQuestion = {
        ...formik.values,
        id: uuidv4(),
      };

      localStorage.setItem(
        "questions",
        JSON.stringify([...previousQuestions, newQuestion]),
      );
      setItems([...items, newQuestion]);
    }
  }, [data]);

  return (
    <Flex width="100%">
      <Box width="100%">
        <form onSubmit={formik.handleSubmit}>
          <Flex gap={2} direction="column">
            <Stack direction={["column", "row"]}>
              <Box flex="1">
                <Input
                  name="questionTitle"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.questionTitle}
                  placeholder="عنوان سوال"
                  variant="outline"
                  borderColor={
                    formik.errors.questionTitle ? "red.300" : "gray.200"
                  }
                  focusBorderColor={
                    formik.errors.questionTitle ? "red.300" : "blue.300"
                  }
                />
                <Text fontSize="xs" color="red.300">
                  {formik.errors.questionTitle}
                </Text>
              </Box>
              <Box flex="1">
                <Select
                  name="questionType"
                  onChange={formik.handleChange}
                  value={formik.values.questionType}
                  placeholder="مسئله"
                  variant="outline"
                  borderColor={
                    formik.errors.questionType ? "red.300" : "gray.200"
                  }
                  focusBorderColor={
                    formik.errors.questionType ? "red.300" : "blue.300"
                  }
                >
                  {OPTIONS.map((option) => (
                    <option value={option.title} key={option.key}>
                      {option.title}
                    </option>
                  ))}
                </Select>
                <Text fontSize="xs" color="red.300">
                  {formik.errors.questionType}
                </Text>
              </Box>
            </Stack>

            <Stack direction={["column", "row"]}>
              <Box
                flex="1"
                height={100}
                border="1px"
                borderColor="gray.200"
                rounded="base"
                px={3}
                py={2}
              >
                {isMutating ? (
                  <Text>در حال نوشتن...</Text>
                ) : data ? (
                  <Text>{data[0].generated_text}</Text>
                ) : (
                  error && <Text>خطا! دوباره تلاش کنید</Text>
                )}
              </Box>
            </Stack>

            <Stack direction={["column", "row"]}>
              <Box flex="1">
                <Textarea
                  name="description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  borderColor={
                    formik.errors.description ? "red.300" : "gray.200"
                  }
                  focusBorderColor={
                    formik.errors.description ? "red.300" : "blue.300"
                  }
                  placeholder="سوال خودتون رو اینجا بنویسید"
                  size="sm"
                />
                <Text fontSize="xs" color="red.300">
                  {formik.errors.description}
                </Text>
              </Box>
            </Stack>
            <Flex marginTop="auto" marginBottom="1rem" justifyContent="right">
              <Button
                type="submit"
                colorScheme="twitter"
                width="40%"
                isDisabled={!(formik.isValid && formik.dirty)}
              >
                ارسال
              </Button>
            </Flex>
          </Flex>
        </form>
      </Box>
    </Flex>
  );
};

export default GptTab;

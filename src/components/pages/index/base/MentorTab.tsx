import {
  AspectRatio,
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Input,
  Select,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import Image from "next/image";
import React, { FC } from "react";
import { v4 as uuidv4 } from "uuid";

import {
  OPTIONS,
  initialValues,
  mentorValidationSchema,
} from "../../../../config";
import Props from "../../../../types";

const MentorTab: FC<Props> = ({ items, setItems }) => {
  const [preview, setPreview] = React.useState<string | ArrayBuffer>();

  const formik = useFormik({
    initialValues,
    validationSchema: mentorValidationSchema,
    onSubmit: (values) => {
      const previousQuestions = JSON.parse(
        localStorage.getItem("questions") || "[]",
      );
      const newQuestion = {
        ...values,
        id: uuidv4(),
      };

      localStorage.setItem(
        "questions",
        JSON.stringify([...previousQuestions, newQuestion]),
      );
      setItems([...items, newQuestion]);
    },
  });

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
                  placeholder="لطفا مشکلی که باهاش مواجه شدید رو اینجا توضیح بدید. همچنین بخش‌های اصلی کدتون رو هم شرح بدید."
                  size="sm"
                />
                <Text fontSize="xs" color="red.300">
                  {formik.errors.description}
                </Text>
              </Box>
            </Stack>
            <Stack direction={["column", "row"]}>
              <Box flex="1">
                <Box
                  borderColor="gray.300"
                  borderStyle="dashed"
                  borderWidth="2px"
                  rounded="md"
                  shadow="sm"
                  role="group"
                  transition="all 150ms ease-in-out"
                  _hover={{
                    shadow: "md",
                  }}
                >
                  <Box
                    position="relative"
                    height="100%"
                    width="100%"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Box display="flex" flexDirection="column">
                      <Stack
                        height="100%"
                        width="100%"
                        display="flex"
                        alignItems="center"
                        justify="center"
                        spacing="4"
                      >
                        <Stack p="8" textAlign="center" spacing="1">
                          <Heading
                            fontSize="lg"
                            color="gray.700"
                            fontWeight="bold"
                          >
                            Drop images here
                          </Heading>
                          <Text fontWeight="light">or click to upload</Text>
                        </Stack>
                      </Stack>
                    </Box>
                    <Input
                      type="file"
                      onChange={(event) => {
                        if (event.currentTarget.files?.[0]) {
                          const reader = new FileReader();
                          const size = event.currentTarget.files[0].size;

                          reader.readAsDataURL(event.currentTarget.files[0]);

                          reader.onload = () => {
                            if (reader.result) {
                              setPreview(reader.result);
                            }

                            formik.setFieldValue("image", {
                              size: size,
                              name: reader.result,
                            });
                          };
                        }
                      }}
                      borderColor={formik.errors.image ? "red.300" : ""}
                      name="image"
                      height="100%"
                      width="100%"
                      opacity={0}
                      aria-hidden="true"
                      position="absolute"
                      accept="image/*"
                    />
                    {formik.values.image && preview && (
                      <Image
                        src={preview as string}
                        height={100}
                        width={100}
                        alt="uploaded image"
                      />
                    )}
                  </Box>
                </Box>
                <Text fontSize="xs" color="red.300">
                  {formik.errors.image && formik.errors.image.toString()}
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

export default MentorTab;

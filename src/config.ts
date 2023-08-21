import * as Yup from "yup";

const siteConfig = {
  details: {
    title: "QGPT",
    tagLine: "Ai Assistant",
  },
};

export default siteConfig;

export const gptValidationSchema = Yup.object().shape({
  questionTitle: Yup.string().required("این فیلد اجباری است."),
  questionType: Yup.string().required("این فیلد اجباری است."),
  description: Yup.string().required("این فیلد اجباری است."),
});

const FILE_SIZE = 2000000;

export const mentorValidationSchema = Yup.object().shape({
  questionTitle: Yup.string().required("این فیلد اجباری است."),
  questionType: Yup.string().required("این فیلد اجباری است."),
  description: Yup.string().required("این فیلد اجباری است."),
  image: Yup.object().test(
    "is-valid-size",
    "تصویر بارگذاری شده بیشتر از ۲ مگابایت است",
    (value: File) => (value.size ? value?.size <= FILE_SIZE : true),
  ),
});

export const initialValues = {
  questionTitle: "",
  questionType: "",
  description: "",
  image: {
    name: "",
    size: "",
  },
};

export const OPTIONS = [
  { key: "1", title: "بمب بازی" },
  { key: "2", title: "مقدمه" },
  { key: "3", title: "بتا تایپ" },
  { key: "4", title: "لغت نامه" },
];

export const API_KEY = "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";

export const URL = "https://api-inference.huggingface.co/models/gpt2";

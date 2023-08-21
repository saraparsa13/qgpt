export default interface Question {
  id: string;
  questionTitle: string;
  questionType: string;
  description: string;
  image: {
    size: number;
    name: string;
  };
}

export default interface Props {
  items: Question[];
  setItems: (input: {}) => void
}
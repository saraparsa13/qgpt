import { Box, Button, Flex, Stack, Text } from "@chakra-ui/react";
import React, { FC } from "react";
import Question from "../../../../types";

const ITEMS_PER_PAGE = 3;

type SideBarProps = {
  items: Question[];
};
const SideBar: FC<SideBarProps> = ({ items }) => {
  const [currentPage, setCurrentPage] = React.useState<number>(1);

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <Box
      border="1px"
      borderColor="gray.200"
      rounded="base"
      width={{ base: "full", md: "sm" }}
      height="min"
    >
      <Box bg="gray.100" py={3} px={3}>
        <Text>سوالات من</Text>
      </Box>

      <Box p={4}>
        <Stack spacing={4}>
          {currentItems.length ? (
            currentItems.map((item) => (
              <Box key={item.id} p={4} borderWidth="1px" rounded="md">
                <Text fontSize="md">{item.questionTitle}</Text>
                <Text
                  mt={2}
                  px={2}
                  py={1}
                  rounded="full"
                  width="fit-content"
                  fontSize="xs"
                  color="twitter.500"
                  bg="twitter.100"
                >
                  {item.questionType}
                </Text>
              </Box>
            ))
          ) : (
            <Text color="gray.400">هنوز سوالی نپرسیدی!</Text>
          )}
        </Stack>

        {currentItems.length ? (
          <Flex wrap="wrap" gap={2} mt={4}>
            {Array.from({ length: totalPages }, (_, index) => (
              <Button
                key={index}
                size="sm"
                onClick={() => handlePageChange(index + 1)}
                variant={currentPage === index + 1 ? "solid" : "outline"}
                height={10}
                width={10}
              >
                {index + 1}
              </Button>
            ))}
          </Flex>
        ) : null}
      </Box>
    </Box>
  );
};

export default SideBar;

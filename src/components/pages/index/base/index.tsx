"use client";

import {
  Box,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import React from "react";

import MentorTab from "components/pages/index/base/MentorTab";

import Question from "../../../../types";
import GptTab from "./GptTab";
import SideBar from "./Sidebar";

const Page = () => {
  const questions = JSON.parse(localStorage?.getItem("questions") || "[]");
  const [items, setItems] = React.useState<Question[]>(questions);

  return (
    <Box
      mx={5}
      as="main"
      bg="white"
      display="flex"
      flexDirection={{ md: "row", base: "column" }}
      flex="1"
      my={10}
    >
      <SideBar items={items} />

      <Box
        mr={{ md: 5 }}
        mt={{md: 0, base: 5}}
        border="1px"
        borderColor="gray.200"
        rounded="base"
        width={{ md: "2xl", base: "full" }}
      >
        <Box bg="gray.100" py={3} px={3}>
          <Text>درخواست پشتیبانی</Text>
        </Box>
        <Text fontSize={{ md: "initial", base: "sm" }} py={6} px={3}>
          بررسی کدی که نوشتید و رفع خطا توسط خودتون یکی از مفیدترین کارها برای
          پیشرفت مهارت برنامه‌نویسیه! اگر به اندازه کافی تلاش کردید و وقت خوبی
          برای رفع خطا گذاشتید و به نتیجه نرسیدید، ما اینجاییم که در فرایند
          دیباگ کردن بهتون کمک کنیم.
        </Text>
        <Tabs colorScheme="twitter" isFitted>
          <TabList mb="1em">
            <Tab fontSize={{ md: "initial", base: "xs" }}>
              سوال از ربات QGPT
            </Tab>
            <Tab fontSize={{ md: "initial", base: "xs" }}>
              سوال از مربی‌های دوره
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <GptTab items={items} setItems={setItems} />
            </TabPanel>
            <TabPanel>
              <MentorTab items={items} setItems={setItems} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
};

export default Page;

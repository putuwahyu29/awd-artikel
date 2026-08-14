import Accordion from "./Accordion";
import Button from "./Button";
import Code from "./Code";
import Notice from "./Notice";
import Tab from "./Tab";
import Tabs from "./Tabs";
import Video from "./Video";
import Youtube from "./Youtube";
import { CodeBlockPre } from "@layouts/components/CodeBlockWrapper";
import { MdxImage } from "@layouts/components/MdxImage";

const shortcodes = {
  Button,
  Accordion,
  Video,
  Tab,
  Tabs,
  Notice,
  Code,
  Youtube,
  pre: CodeBlockPre,
  img: MdxImage,
};

export default shortcodes;

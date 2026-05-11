import { postType } from "./post";
import { caseStudyType } from "./caseStudy";
import { commentType } from "./comment";
import { quizLeadType } from "./quizLead";
import { productType } from "./product";
import { orderType } from "./order";
import { productReviewType } from "./productReview";
import { testimonialType, brandType, timelineType, settingsType } from "./others";

export const schemaTypes = [
  settingsType,
  postType,
  caseStudyType,
  commentType,
  quizLeadType,
  productType,
  productReviewType,
  orderType,
  testimonialType,
  brandType,
  timelineType,
];

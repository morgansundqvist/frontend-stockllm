import { gql } from "@apollo/client";

export const GET_STOCK_LEVELS = gql`
  query GetStockLevels {
    stockLevels {
      id
      itemName
      quantity
    }
  }
`;

export const GET_DAY_SCHEDULES = gql`
  query GetDaySchedules {
    daySchedules {
      id
      day
      hourRange
      maxCapacity
      currentUsage
    }
  }
`;

export const ASK_QUESTION = gql`
  mutation AskQuestion($input: QuestionInput!) {
    askQuestion(input: $input) {
      question
      answer
    }
  }
`;

export const GET_ORDERS = gql`
  query GetOrders {
    orders {
      id
      itemName
      quantity
    }
  }
`;

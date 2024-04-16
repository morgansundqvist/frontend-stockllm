/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type DaySchedule = {
  __typename?: 'DaySchedule';
  currentUsage: Scalars['Int']['output'];
  day: Scalars['String']['output'];
  hourRange: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  maxCapacity: Scalars['Int']['output'];
};

export type DayScheduleInput = {
  currentUsage: Scalars['Int']['input'];
  day: Scalars['String']['input'];
  hourRange: Scalars['String']['input'];
  maxCapacity: Scalars['Int']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addDaySchedule: DaySchedule;
  addStockLevel: StockLevel;
  askQuestion: QuestionResponse;
  clearOrders: Scalars['Boolean']['output'];
  updateDaySchedule: DaySchedule;
  updateStockLevel: StockLevel;
};


export type MutationAddDayScheduleArgs = {
  input: DayScheduleInput;
};


export type MutationAddStockLevelArgs = {
  input: StockLevelInput;
};


export type MutationAskQuestionArgs = {
  input: QuestionInput;
};


export type MutationUpdateDayScheduleArgs = {
  CurrentCapacity: Scalars['Int']['input'];
  Day: Scalars['String']['input'];
};


export type MutationUpdateStockLevelArgs = {
  id: Scalars['ID']['input'];
  quantity: Scalars['Int']['input'];
};

export type Order = {
  __typename?: 'Order';
  id: Scalars['ID']['output'];
  itemName: Scalars['String']['output'];
  quantity: Scalars['Int']['output'];
};

export type Query = {
  __typename?: 'Query';
  daySchedules: Array<DaySchedule>;
  orders: Array<Order>;
  stockLevels: Array<StockLevel>;
};

export type QuestionInput = {
  question: Scalars['String']['input'];
};

export type QuestionResponse = {
  __typename?: 'QuestionResponse';
  answer: Scalars['String']['output'];
  question: Scalars['String']['output'];
};

export type StockLevel = {
  __typename?: 'StockLevel';
  id: Scalars['ID']['output'];
  itemName: Scalars['String']['output'];
  quantity: Scalars['Int']['output'];
};

export type StockLevelInput = {
  itemName: Scalars['String']['input'];
  quantity: Scalars['Int']['input'];
};

export type GetStockLevelsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetStockLevelsQuery = { __typename?: 'Query', stockLevels: Array<{ __typename?: 'StockLevel', id: string, itemName: string, quantity: number }> };

export type GetDaySchedulesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetDaySchedulesQuery = { __typename?: 'Query', daySchedules: Array<{ __typename?: 'DaySchedule', id: string, day: string, hourRange: string, maxCapacity: number, currentUsage: number }> };

export type AskQuestionMutationVariables = Exact<{
  input: QuestionInput;
}>;


export type AskQuestionMutation = { __typename?: 'Mutation', askQuestion: { __typename?: 'QuestionResponse', question: string, answer: string } };

export type GetOrdersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetOrdersQuery = { __typename?: 'Query', orders: Array<{ __typename?: 'Order', id: string, itemName: string, quantity: number }> };


export const GetStockLevelsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetStockLevels"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"stockLevels"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"itemName"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}}]}}]}}]} as unknown as DocumentNode<GetStockLevelsQuery, GetStockLevelsQueryVariables>;
export const GetDaySchedulesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetDaySchedules"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"daySchedules"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"day"}},{"kind":"Field","name":{"kind":"Name","value":"hourRange"}},{"kind":"Field","name":{"kind":"Name","value":"maxCapacity"}},{"kind":"Field","name":{"kind":"Name","value":"currentUsage"}}]}}]}}]} as unknown as DocumentNode<GetDaySchedulesQuery, GetDaySchedulesQueryVariables>;
export const AskQuestionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AskQuestion"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"QuestionInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"askQuestion"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"question"}},{"kind":"Field","name":{"kind":"Name","value":"answer"}}]}}]}}]} as unknown as DocumentNode<AskQuestionMutation, AskQuestionMutationVariables>;
export const GetOrdersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetOrders"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"orders"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"itemName"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}}]}}]}}]} as unknown as DocumentNode<GetOrdersQuery, GetOrdersQueryVariables>;
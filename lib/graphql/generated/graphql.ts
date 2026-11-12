/* eslint-disable */
import type { DocumentTypeDecoration } from '@graphql-typed-document-node/core';
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

export type AboutMe = {
  __typename?: 'AboutMe';
  availability?: Maybe<Scalars['String']['output']>;
  avatar?: Maybe<Scalars['String']['output']>;
  bio?: Maybe<Scalars['String']['output']>;
  displayName?: Maybe<Scalars['String']['output']>;
  handle?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  intro: Scalars['String']['output'];
  location?: Maybe<Scalars['String']['output']>;
  mission?: Maybe<Scalars['String']['output']>;
  resumeUrl?: Maybe<Scalars['String']['output']>;
  role?: Maybe<Scalars['String']['output']>;
};

export type AiUsage = {
  __typename?: 'AiUsage';
  clients: Array<AiUsageClient>;
  daily: Array<AiUsageDay>;
  models: Array<AiUsageModel>;
  range: AiUsageRange;
  totals: AiUsageTotals;
  unpricedModels: Array<Scalars['String']['output']>;
};

export type AiUsageClient = {
  __typename?: 'AiUsageClient';
  client: Scalars['String']['output'];
  percent: Scalars['Float']['output'];
  requests: Scalars['Int']['output'];
  tokens: Scalars['Float']['output'];
};

export type AiUsageDay = {
  __typename?: 'AiUsageDay';
  date: Scalars['String']['output'];
  /** Priced models only. */
  estimatedCostUsd: Scalars['Float']['output'];
  /** True when a model used this day has no price, so the cost is a lower bound. */
  hasUnpricedModels: Scalars['Boolean']['output'];
  requests: Scalars['Int']['output'];
  tokens: Scalars['Float']['output'];
};

export type AiUsageModel = {
  __typename?: 'AiUsageModel';
  cacheReadTokens: Scalars['Float']['output'];
  cacheWriteTokens: Scalars['Float']['output'];
  /** Null when the model has no row in AiModelPrice. */
  estimatedCostUsd?: Maybe<Scalars['Float']['output']>;
  inputTokens: Scalars['Float']['output'];
  model: Scalars['String']['output'];
  outputTokens: Scalars['Float']['output'];
  requests: Scalars['Int']['output'];
  tokens: Scalars['Float']['output'];
};

export type AiUsageRange = {
  __typename?: 'AiUsageRange';
  from?: Maybe<Scalars['String']['output']>;
  to?: Maybe<Scalars['String']['output']>;
};

export type AiUsageTotals = {
  __typename?: 'AiUsageTotals';
  cacheReadTokens: Scalars['Float']['output'];
  cacheWriteTokens: Scalars['Float']['output'];
  estimatedCostUsd: Scalars['Float']['output'];
  inputTokens: Scalars['Float']['output'];
  outputTokens: Scalars['Float']['output'];
  requests: Scalars['Int']['output'];
  tokens: Scalars['Float']['output'];
};

export type Contact = {
  __typename?: 'Contact';
  id: Scalars['ID']['output'];
  title: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type Contribution = {
  __typename?: 'Contribution';
  date: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  totalSeconds: Scalars['Int']['output'];
};

export type Education = {
  __typename?: 'Education';
  descriptions: Array<EducationDescription>;
  endDate?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  startDate: Scalars['Int']['output'];
  title: Scalars['String']['output'];
};

export type EducationDescription = {
  __typename?: 'EducationDescription';
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
};

export type Experience = {
  __typename?: 'Experience';
  company: Scalars['String']['output'];
  endDate?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  responsibilities: Array<ExperienceResponsibility>;
  role: Scalars['String']['output'];
  startDate: Scalars['Int']['output'];
};

export type ExperienceResponsibility = {
  __typename?: 'ExperienceResponsibility';
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
};

export type FrontendVersion = {
  __typename?: 'FrontendVersion';
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  key: Scalars['String']['output'];
  order: Scalars['Int']['output'];
  thumbnail?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  url: Scalars['String']['output'];
  views: Scalars['Int']['output'];
};

export type FrontendVersionList = {
  __typename?: 'FrontendVersionList';
  totalViews: Scalars['Int']['output'];
  versions: Array<FrontendVersion>;
};

export type Project = {
  __typename?: 'Project';
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  logo?: Maybe<Scalars['String']['output']>;
  order: Scalars['Int']['output'];
  preview?: Maybe<Scalars['String']['output']>;
  sources: Array<ProjectSource>;
  status: ProjectStatus;
  tags: Array<ProjectTag>;
  title: Scalars['String']['output'];
};

export type ProjectSource = {
  __typename?: 'ProjectSource';
  id: Scalars['ID']['output'];
  title: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type ProjectStatus =
  | 'ACTIVE'
  | 'HOLD'
  | 'IN_PROGRESS'
  | 'PLANNING';

export type ProjectTag = {
  __typename?: 'ProjectTag';
  id: Scalars['ID']['output'];
  tag: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  aboutMe?: Maybe<AboutMe>;
  aiUsage?: Maybe<AiUsage>;
  contact?: Maybe<Contact>;
  contacts?: Maybe<Array<Contact>>;
  education?: Maybe<Education>;
  educations?: Maybe<Array<Education>>;
  experience?: Maybe<Experience>;
  experiences?: Maybe<Array<Experience>>;
  frontendVersions?: Maybe<FrontendVersionList>;
  graphqlStatus: Scalars['Boolean']['output'];
  project?: Maybe<Project>;
  projects?: Maybe<Array<Project>>;
  statistic?: Maybe<Statistic>;
};


export type QueryAiUsageArgs = {
  from?: InputMaybe<Scalars['String']['input']>;
  to?: InputMaybe<Scalars['String']['input']>;
};


export type QueryContactArgs = {
  id: Scalars['ID']['input'];
};


export type QueryEducationArgs = {
  id: Scalars['ID']['input'];
};


export type QueryExperienceArgs = {
  id: Scalars['ID']['input'];
};


export type QueryProjectArgs = {
  id: Scalars['ID']['input'];
};


export type QueryStatisticArgs = {
  exclude?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type Statistic = {
  __typename?: 'Statistic';
  bestDay?: Maybe<StatisticBestDay>;
  categories: Array<StatisticCategory>;
  contributions: Array<Contribution>;
  /** Seconds per coding day */
  dailyAverage?: Maybe<Scalars['Int']['output']>;
  dailyAverageHumanReadable?: Maybe<Scalars['String']['output']>;
  editors: Array<StatisticEditor>;
  endDate: Scalars['Int']['output'];
  excluded: Array<Scalars['String']['output']>;
  humanReadable: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  languages: Array<StatisticLanguage>;
  languagesTotalSeconds: Scalars['Int']['output'];
  operatingSystems: Array<StatisticOs>;
  startDate: Scalars['Int']['output'];
  totalSeconds: Scalars['Int']['output'];
};

export type StatisticBestDay = {
  __typename?: 'StatisticBestDay';
  /** Unix seconds (day) */
  date: Scalars['Int']['output'];
  humanReadable: Scalars['String']['output'];
  totalSeconds: Scalars['Int']['output'];
};

export type StatisticCategory = {
  __typename?: 'StatisticCategory';
  category: Scalars['String']['output'];
  humanReadable: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  percent: Scalars['Float']['output'];
  totalSeconds: Scalars['Int']['output'];
};

export type StatisticEditor = {
  __typename?: 'StatisticEditor';
  editor: Scalars['String']['output'];
  humanReadable: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  percent: Scalars['Float']['output'];
  totalSeconds: Scalars['Int']['output'];
};

export type StatisticLanguage = {
  __typename?: 'StatisticLanguage';
  humanReadable: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  language: Scalars['String']['output'];
  percent: Scalars['Float']['output'];
  totalSeconds: Scalars['Int']['output'];
};

export type StatisticOs = {
  __typename?: 'StatisticOs';
  humanReadable: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  os: Scalars['String']['output'];
  percent: Scalars['Float']['output'];
  totalSeconds: Scalars['Int']['output'];
};

export type AboutMeFieldsFragment = { __typename?: 'AboutMe', id: string, intro: string, bio?: string | null, mission?: string | null, displayName?: string | null, handle?: string | null, role?: string | null, location?: string | null, avatar?: string | null, resumeUrl?: string | null, availability?: string | null };

export type AboutMeQueryVariables = Exact<{ [key: string]: never; }>;


export type AboutMeQuery = { __typename?: 'Query', aboutMe?: { __typename?: 'AboutMe', id: string, intro: string, bio?: string | null, mission?: string | null, displayName?: string | null, handle?: string | null, role?: string | null, location?: string | null, avatar?: string | null, resumeUrl?: string | null, availability?: string | null } | null };

export type AiUsageFieldsFragment = { __typename?: 'AiUsage', unpricedModels: Array<string>, range: { __typename?: 'AiUsageRange', from?: string | null, to?: string | null }, totals: { __typename?: 'AiUsageTotals', requests: number, inputTokens: number, outputTokens: number, cacheWriteTokens: number, cacheReadTokens: number, tokens: number, estimatedCostUsd: number }, models: Array<{ __typename?: 'AiUsageModel', model: string, requests: number, inputTokens: number, outputTokens: number, cacheWriteTokens: number, cacheReadTokens: number, tokens: number, estimatedCostUsd?: number | null }>, clients: Array<{ __typename?: 'AiUsageClient', client: string, requests: number, tokens: number, percent: number }>, daily: Array<{ __typename?: 'AiUsageDay', date: string, requests: number, tokens: number, estimatedCostUsd: number, hasUnpricedModels: boolean }> };

export type AiUsageQueryVariables = Exact<{
  from?: InputMaybe<Scalars['String']['input']>;
  to?: InputMaybe<Scalars['String']['input']>;
}>;


export type AiUsageQuery = { __typename?: 'Query', aiUsage?: { __typename?: 'AiUsage', unpricedModels: Array<string>, range: { __typename?: 'AiUsageRange', from?: string | null, to?: string | null }, totals: { __typename?: 'AiUsageTotals', requests: number, inputTokens: number, outputTokens: number, cacheWriteTokens: number, cacheReadTokens: number, tokens: number, estimatedCostUsd: number }, models: Array<{ __typename?: 'AiUsageModel', model: string, requests: number, inputTokens: number, outputTokens: number, cacheWriteTokens: number, cacheReadTokens: number, tokens: number, estimatedCostUsd?: number | null }>, clients: Array<{ __typename?: 'AiUsageClient', client: string, requests: number, tokens: number, percent: number }>, daily: Array<{ __typename?: 'AiUsageDay', date: string, requests: number, tokens: number, estimatedCostUsd: number, hasUnpricedModels: boolean }> } | null };

export type BootQueryVariables = Exact<{ [key: string]: never; }>;


export type BootQuery = { __typename?: 'Query', aboutMe?: { __typename?: 'AboutMe', id: string, intro: string, bio?: string | null, mission?: string | null, displayName?: string | null, handle?: string | null, role?: string | null, location?: string | null, avatar?: string | null, resumeUrl?: string | null, availability?: string | null } | null, educations?: Array<{ __typename?: 'Education', id: string, title: string, startDate: number, endDate?: number | null, descriptions: Array<{ __typename?: 'EducationDescription', id: string, description: string }> }> | null, experiences?: Array<{ __typename?: 'Experience', id: string, company: string, role: string, startDate: number, endDate?: number | null, responsibilities: Array<{ __typename?: 'ExperienceResponsibility', id: string, description: string }> }> | null, projects?: Array<{ __typename?: 'Project', id: string, title: string, description: string, preview?: string | null, logo?: string | null, status: ProjectStatus, order: number, tags: Array<{ __typename?: 'ProjectTag', id: string, tag: string }>, sources: Array<{ __typename?: 'ProjectSource', id: string, title: string, url: string }> }> | null, contacts?: Array<{ __typename?: 'Contact', id: string, title: string, url: string }> | null, statistic?: { __typename?: 'Statistic', id: string, startDate: number, endDate: number, totalSeconds: number, humanReadable: string, languages: Array<{ __typename?: 'StatisticLanguage', id: string, language: string, totalSeconds: number, humanReadable: string, percent: number }>, operatingSystems: Array<{ __typename?: 'StatisticOs', id: string, os: string, totalSeconds: number, humanReadable: string, percent: number }>, contributions: Array<{ __typename?: 'Contribution', id: string, date: number, totalSeconds: number }> } | null, frontendVersions?: { __typename?: 'FrontendVersionList', totalViews: number, versions: Array<{ __typename?: 'FrontendVersion', id: string, key: string, url: string, title: string, description?: string | null, thumbnail?: string | null, order: number, views: number }> } | null, aiUsage?: { __typename?: 'AiUsage', unpricedModels: Array<string>, range: { __typename?: 'AiUsageRange', from?: string | null, to?: string | null }, totals: { __typename?: 'AiUsageTotals', requests: number, inputTokens: number, outputTokens: number, cacheWriteTokens: number, cacheReadTokens: number, tokens: number, estimatedCostUsd: number }, models: Array<{ __typename?: 'AiUsageModel', model: string, requests: number, inputTokens: number, outputTokens: number, cacheWriteTokens: number, cacheReadTokens: number, tokens: number, estimatedCostUsd?: number | null }>, clients: Array<{ __typename?: 'AiUsageClient', client: string, requests: number, tokens: number, percent: number }>, daily: Array<{ __typename?: 'AiUsageDay', date: string, requests: number, tokens: number, estimatedCostUsd: number, hasUnpricedModels: boolean }> } | null };

export type ContactFieldsFragment = { __typename?: 'Contact', id: string, title: string, url: string };

export type ContactsQueryVariables = Exact<{ [key: string]: never; }>;


export type ContactsQuery = { __typename?: 'Query', contacts?: Array<{ __typename?: 'Contact', id: string, title: string, url: string }> | null };

export type EducationFieldsFragment = { __typename?: 'Education', id: string, title: string, startDate: number, endDate?: number | null, descriptions: Array<{ __typename?: 'EducationDescription', id: string, description: string }> };

export type EducationsQueryVariables = Exact<{ [key: string]: never; }>;


export type EducationsQuery = { __typename?: 'Query', educations?: Array<{ __typename?: 'Education', id: string, title: string, startDate: number, endDate?: number | null, descriptions: Array<{ __typename?: 'EducationDescription', id: string, description: string }> }> | null };

export type ExperienceFieldsFragment = { __typename?: 'Experience', id: string, company: string, role: string, startDate: number, endDate?: number | null, responsibilities: Array<{ __typename?: 'ExperienceResponsibility', id: string, description: string }> };

export type ExperiencesQueryVariables = Exact<{ [key: string]: never; }>;


export type ExperiencesQuery = { __typename?: 'Query', experiences?: Array<{ __typename?: 'Experience', id: string, company: string, role: string, startDate: number, endDate?: number | null, responsibilities: Array<{ __typename?: 'ExperienceResponsibility', id: string, description: string }> }> | null };

export type FrontendVersionsFieldsFragment = { __typename?: 'FrontendVersionList', totalViews: number, versions: Array<{ __typename?: 'FrontendVersion', id: string, key: string, url: string, title: string, description?: string | null, thumbnail?: string | null, order: number, views: number }> };

export type FrontendVersionsQueryVariables = Exact<{ [key: string]: never; }>;


export type FrontendVersionsQuery = { __typename?: 'Query', frontendVersions?: { __typename?: 'FrontendVersionList', totalViews: number, versions: Array<{ __typename?: 'FrontendVersion', id: string, key: string, url: string, title: string, description?: string | null, thumbnail?: string | null, order: number, views: number }> } | null };

export type ProjectFieldsFragment = { __typename?: 'Project', id: string, title: string, description: string, preview?: string | null, logo?: string | null, status: ProjectStatus, order: number, tags: Array<{ __typename?: 'ProjectTag', id: string, tag: string }>, sources: Array<{ __typename?: 'ProjectSource', id: string, title: string, url: string }> };

export type ProjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type ProjectsQuery = { __typename?: 'Query', projects?: Array<{ __typename?: 'Project', id: string, title: string, description: string, preview?: string | null, logo?: string | null, status: ProjectStatus, order: number, tags: Array<{ __typename?: 'ProjectTag', id: string, tag: string }>, sources: Array<{ __typename?: 'ProjectSource', id: string, title: string, url: string }> }> | null };

export type StatisticFieldsFragment = { __typename?: 'Statistic', id: string, startDate: number, endDate: number, totalSeconds: number, humanReadable: string, languages: Array<{ __typename?: 'StatisticLanguage', id: string, language: string, totalSeconds: number, humanReadable: string, percent: number }>, operatingSystems: Array<{ __typename?: 'StatisticOs', id: string, os: string, totalSeconds: number, humanReadable: string, percent: number }>, contributions: Array<{ __typename?: 'Contribution', id: string, date: number, totalSeconds: number }> };

export type StatisticQueryVariables = Exact<{ [key: string]: never; }>;


export type StatisticQuery = { __typename?: 'Query', statistic?: { __typename?: 'Statistic', id: string, startDate: number, endDate: number, totalSeconds: number, humanReadable: string, languages: Array<{ __typename?: 'StatisticLanguage', id: string, language: string, totalSeconds: number, humanReadable: string, percent: number }>, operatingSystems: Array<{ __typename?: 'StatisticOs', id: string, os: string, totalSeconds: number, humanReadable: string, percent: number }>, contributions: Array<{ __typename?: 'Contribution', id: string, date: number, totalSeconds: number }> } | null };

export class TypedDocumentString<TResult, TVariables>
  extends String
  implements DocumentTypeDecoration<TResult, TVariables>
{
  __apiType?: NonNullable<DocumentTypeDecoration<TResult, TVariables>['__apiType']>;
  private value: string;
  public __meta__?: Record<string, any> | undefined;

  constructor(value: string, __meta__?: Record<string, any> | undefined) {
    super(value);
    this.value = value;
    this.__meta__ = __meta__;
  }

  override toString(): string & DocumentTypeDecoration<TResult, TVariables> {
    return this.value;
  }
}
export const AboutMeFieldsFragmentDoc = new TypedDocumentString(`
    fragment AboutMeFields on AboutMe {
  id
  intro
  bio
  mission
  displayName
  handle
  role
  location
  avatar
  resumeUrl
  availability
}
    `, {"fragmentName":"AboutMeFields"}) as unknown as TypedDocumentString<AboutMeFieldsFragment, unknown>;
export const AiUsageFieldsFragmentDoc = new TypedDocumentString(`
    fragment AiUsageFields on AiUsage {
  range {
    from
    to
  }
  totals {
    requests
    inputTokens
    outputTokens
    cacheWriteTokens
    cacheReadTokens
    tokens
    estimatedCostUsd
  }
  models {
    model
    requests
    inputTokens
    outputTokens
    cacheWriteTokens
    cacheReadTokens
    tokens
    estimatedCostUsd
  }
  clients {
    client
    requests
    tokens
    percent
  }
  daily {
    date
    requests
    tokens
    estimatedCostUsd
    hasUnpricedModels
  }
  unpricedModels
}
    `, {"fragmentName":"AiUsageFields"}) as unknown as TypedDocumentString<AiUsageFieldsFragment, unknown>;
export const ContactFieldsFragmentDoc = new TypedDocumentString(`
    fragment ContactFields on Contact {
  id
  title
  url
}
    `, {"fragmentName":"ContactFields"}) as unknown as TypedDocumentString<ContactFieldsFragment, unknown>;
export const EducationFieldsFragmentDoc = new TypedDocumentString(`
    fragment EducationFields on Education {
  id
  title
  startDate
  endDate
  descriptions {
    id
    description
  }
}
    `, {"fragmentName":"EducationFields"}) as unknown as TypedDocumentString<EducationFieldsFragment, unknown>;
export const ExperienceFieldsFragmentDoc = new TypedDocumentString(`
    fragment ExperienceFields on Experience {
  id
  company
  role
  startDate
  endDate
  responsibilities {
    id
    description
  }
}
    `, {"fragmentName":"ExperienceFields"}) as unknown as TypedDocumentString<ExperienceFieldsFragment, unknown>;
export const FrontendVersionsFieldsFragmentDoc = new TypedDocumentString(`
    fragment FrontendVersionsFields on FrontendVersionList {
  totalViews
  versions {
    id
    key
    url
    title
    description
    thumbnail
    order
    views
  }
}
    `, {"fragmentName":"FrontendVersionsFields"}) as unknown as TypedDocumentString<FrontendVersionsFieldsFragment, unknown>;
export const ProjectFieldsFragmentDoc = new TypedDocumentString(`
    fragment ProjectFields on Project {
  id
  title
  description
  preview
  logo
  status
  order
  tags {
    id
    tag
  }
  sources {
    id
    title
    url
  }
}
    `, {"fragmentName":"ProjectFields"}) as unknown as TypedDocumentString<ProjectFieldsFragment, unknown>;
export const StatisticFieldsFragmentDoc = new TypedDocumentString(`
    fragment StatisticFields on Statistic {
  id
  startDate
  endDate
  totalSeconds
  humanReadable
  languages {
    id
    language
    totalSeconds
    humanReadable
    percent
  }
  operatingSystems {
    id
    os
    totalSeconds
    humanReadable
    percent
  }
  contributions {
    id
    date
    totalSeconds
  }
}
    `, {"fragmentName":"StatisticFields"}) as unknown as TypedDocumentString<StatisticFieldsFragment, unknown>;
export const AboutMeDocument = new TypedDocumentString(`
    query AboutMe {
  aboutMe {
    ...AboutMeFields
  }
}
    fragment AboutMeFields on AboutMe {
  id
  intro
  bio
  mission
  displayName
  handle
  role
  location
  avatar
  resumeUrl
  availability
}`, {"hash":"a5ad5a48a3e1f0b7093767d893ffee73415fbbd8"}) as unknown as TypedDocumentString<AboutMeQuery, AboutMeQueryVariables>;
export const AiUsageDocument = new TypedDocumentString(`
    query AiUsage($from: String, $to: String) {
  aiUsage(from: $from, to: $to) {
    ...AiUsageFields
  }
}
    fragment AiUsageFields on AiUsage {
  range {
    from
    to
  }
  totals {
    requests
    inputTokens
    outputTokens
    cacheWriteTokens
    cacheReadTokens
    tokens
    estimatedCostUsd
  }
  models {
    model
    requests
    inputTokens
    outputTokens
    cacheWriteTokens
    cacheReadTokens
    tokens
    estimatedCostUsd
  }
  clients {
    client
    requests
    tokens
    percent
  }
  daily {
    date
    requests
    tokens
    estimatedCostUsd
    hasUnpricedModels
  }
  unpricedModels
}`, {"hash":"45c4f69766f03decd2e02c43590c6088c4cdfb16"}) as unknown as TypedDocumentString<AiUsageQuery, AiUsageQueryVariables>;
export const BootDocument = new TypedDocumentString(`
    query Boot {
  aboutMe {
    ...AboutMeFields
  }
  educations {
    ...EducationFields
  }
  experiences {
    ...ExperienceFields
  }
  projects {
    ...ProjectFields
  }
  contacts {
    ...ContactFields
  }
  statistic {
    ...StatisticFields
  }
  frontendVersions {
    ...FrontendVersionsFields
  }
  aiUsage {
    ...AiUsageFields
  }
}
    fragment AboutMeFields on AboutMe {
  id
  intro
  bio
  mission
  displayName
  handle
  role
  location
  avatar
  resumeUrl
  availability
}
fragment AiUsageFields on AiUsage {
  range {
    from
    to
  }
  totals {
    requests
    inputTokens
    outputTokens
    cacheWriteTokens
    cacheReadTokens
    tokens
    estimatedCostUsd
  }
  models {
    model
    requests
    inputTokens
    outputTokens
    cacheWriteTokens
    cacheReadTokens
    tokens
    estimatedCostUsd
  }
  clients {
    client
    requests
    tokens
    percent
  }
  daily {
    date
    requests
    tokens
    estimatedCostUsd
    hasUnpricedModels
  }
  unpricedModels
}
fragment ContactFields on Contact {
  id
  title
  url
}
fragment EducationFields on Education {
  id
  title
  startDate
  endDate
  descriptions {
    id
    description
  }
}
fragment ExperienceFields on Experience {
  id
  company
  role
  startDate
  endDate
  responsibilities {
    id
    description
  }
}
fragment FrontendVersionsFields on FrontendVersionList {
  totalViews
  versions {
    id
    key
    url
    title
    description
    thumbnail
    order
    views
  }
}
fragment ProjectFields on Project {
  id
  title
  description
  preview
  logo
  status
  order
  tags {
    id
    tag
  }
  sources {
    id
    title
    url
  }
}
fragment StatisticFields on Statistic {
  id
  startDate
  endDate
  totalSeconds
  humanReadable
  languages {
    id
    language
    totalSeconds
    humanReadable
    percent
  }
  operatingSystems {
    id
    os
    totalSeconds
    humanReadable
    percent
  }
  contributions {
    id
    date
    totalSeconds
  }
}`, {"hash":"59d741da0c7ea06a224842dae89db2917d2d6d98"}) as unknown as TypedDocumentString<BootQuery, BootQueryVariables>;
export const ContactsDocument = new TypedDocumentString(`
    query Contacts {
  contacts {
    ...ContactFields
  }
}
    fragment ContactFields on Contact {
  id
  title
  url
}`, {"hash":"a9df88fc41fb0b8dd56589f68232709fbd117197"}) as unknown as TypedDocumentString<ContactsQuery, ContactsQueryVariables>;
export const EducationsDocument = new TypedDocumentString(`
    query Educations {
  educations {
    ...EducationFields
  }
}
    fragment EducationFields on Education {
  id
  title
  startDate
  endDate
  descriptions {
    id
    description
  }
}`, {"hash":"d1f090fad8552143955e675d3ed16a7f2af043e4"}) as unknown as TypedDocumentString<EducationsQuery, EducationsQueryVariables>;
export const ExperiencesDocument = new TypedDocumentString(`
    query Experiences {
  experiences {
    ...ExperienceFields
  }
}
    fragment ExperienceFields on Experience {
  id
  company
  role
  startDate
  endDate
  responsibilities {
    id
    description
  }
}`, {"hash":"dac32f32e535c14e2a5f28de567f2fa875f9e7d1"}) as unknown as TypedDocumentString<ExperiencesQuery, ExperiencesQueryVariables>;
export const FrontendVersionsDocument = new TypedDocumentString(`
    query FrontendVersions {
  frontendVersions {
    ...FrontendVersionsFields
  }
}
    fragment FrontendVersionsFields on FrontendVersionList {
  totalViews
  versions {
    id
    key
    url
    title
    description
    thumbnail
    order
    views
  }
}`, {"hash":"ed4b964bdd2adc5214a379d37e9bf05f34ce4deb"}) as unknown as TypedDocumentString<FrontendVersionsQuery, FrontendVersionsQueryVariables>;
export const ProjectsDocument = new TypedDocumentString(`
    query Projects {
  projects {
    ...ProjectFields
  }
}
    fragment ProjectFields on Project {
  id
  title
  description
  preview
  logo
  status
  order
  tags {
    id
    tag
  }
  sources {
    id
    title
    url
  }
}`, {"hash":"1844fe36ed9e37881aad7f4f540fee98510cd63f"}) as unknown as TypedDocumentString<ProjectsQuery, ProjectsQueryVariables>;
export const StatisticDocument = new TypedDocumentString(`
    query Statistic {
  statistic {
    ...StatisticFields
  }
}
    fragment StatisticFields on Statistic {
  id
  startDate
  endDate
  totalSeconds
  humanReadable
  languages {
    id
    language
    totalSeconds
    humanReadable
    percent
  }
  operatingSystems {
    id
    os
    totalSeconds
    humanReadable
    percent
  }
  contributions {
    id
    date
    totalSeconds
  }
}`, {"hash":"ede89e37360f22b994d92ee3cb6b16651baaefc1"}) as unknown as TypedDocumentString<StatisticQuery, StatisticQueryVariables>;
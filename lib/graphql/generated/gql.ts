/* eslint-disable */
import * as types from './graphql';



/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  fragment AboutMeFields on AboutMe {\n    id\n    intro\n    bio\n    mission\n    displayName\n    handle\n    role\n    location\n    avatar\n    resumeUrl\n    availability\n  }\n": typeof types.AboutMeFieldsFragmentDoc,
    "\n  query AboutMe {\n    aboutMe {\n      ...AboutMeFields\n    }\n  }\n": typeof types.AboutMeDocument,
    "\n  fragment AiUsageFields on AiUsage {\n    range {\n      from\n      to\n    }\n    totals {\n      requests\n      inputTokens\n      outputTokens\n      cacheWriteTokens\n      cacheReadTokens\n      tokens\n      estimatedCostUsd\n    }\n    models {\n      model\n      requests\n      inputTokens\n      outputTokens\n      cacheWriteTokens\n      cacheReadTokens\n      tokens\n      estimatedCostUsd\n    }\n    clients {\n      client\n      requests\n      tokens\n      percent\n    }\n    daily {\n      date\n      requests\n      tokens\n      estimatedCostUsd\n      hasUnpricedModels\n    }\n    unpricedModels\n  }\n": typeof types.AiUsageFieldsFragmentDoc,
    "\n  query AiUsage($from: String, $to: String) {\n    aiUsage(from: $from, to: $to) {\n      ...AiUsageFields\n    }\n  }\n": typeof types.AiUsageDocument,
    "\n  query Boot {\n    aboutMe {\n      ...AboutMeFields\n    }\n    educations {\n      ...EducationFields\n    }\n    experiences {\n      ...ExperienceFields\n    }\n    projects {\n      ...ProjectFields\n    }\n    contacts {\n      ...ContactFields\n    }\n    statistic {\n      ...StatisticFields\n    }\n    frontendVersions {\n      ...FrontendVersionsFields\n    }\n    aiUsage {\n      ...AiUsageFields\n    }\n  }\n": typeof types.BootDocument,
    "\n  fragment ContactFields on Contact {\n    id\n    title\n    url\n  }\n": typeof types.ContactFieldsFragmentDoc,
    "\n  query Contacts {\n    contacts {\n      ...ContactFields\n    }\n  }\n": typeof types.ContactsDocument,
    "\n  fragment EducationFields on Education {\n    id\n    title\n    startDate\n    endDate\n    descriptions {\n      id\n      description\n    }\n  }\n": typeof types.EducationFieldsFragmentDoc,
    "\n  query Educations {\n    educations {\n      ...EducationFields\n    }\n  }\n": typeof types.EducationsDocument,
    "\n  fragment ExperienceFields on Experience {\n    id\n    company\n    role\n    startDate\n    endDate\n    responsibilities {\n      id\n      description\n    }\n  }\n": typeof types.ExperienceFieldsFragmentDoc,
    "\n  query Experiences {\n    experiences {\n      ...ExperienceFields\n    }\n  }\n": typeof types.ExperiencesDocument,
    "\n  fragment FrontendVersionsFields on FrontendVersionList {\n    totalViews\n    versions {\n      id\n      key\n      url\n      title\n      description\n      thumbnail\n      order\n      views\n    }\n  }\n": typeof types.FrontendVersionsFieldsFragmentDoc,
    "\n  query FrontendVersions {\n    frontendVersions {\n      ...FrontendVersionsFields\n    }\n  }\n": typeof types.FrontendVersionsDocument,
    "\n  fragment ProjectFields on Project {\n    id\n    title\n    description\n    preview\n    logo\n    status\n    order\n    tags {\n      id\n      tag\n    }\n    sources {\n      id\n      title\n      url\n    }\n  }\n": typeof types.ProjectFieldsFragmentDoc,
    "\n  query Projects {\n    projects {\n      ...ProjectFields\n    }\n  }\n": typeof types.ProjectsDocument,
    "\n  fragment StatisticFields on Statistic {\n    id\n    startDate\n    endDate\n    totalSeconds\n    humanReadable\n    languages {\n      id\n      language\n      totalSeconds\n      humanReadable\n      percent\n    }\n    operatingSystems {\n      id\n      os\n      totalSeconds\n      humanReadable\n      percent\n    }\n    contributions {\n      id\n      date\n      totalSeconds\n    }\n  }\n": typeof types.StatisticFieldsFragmentDoc,
    "\n  query Statistic {\n    statistic {\n      ...StatisticFields\n    }\n  }\n": typeof types.StatisticDocument,
};
const documents: Documents = {
    "\n  fragment AboutMeFields on AboutMe {\n    id\n    intro\n    bio\n    mission\n    displayName\n    handle\n    role\n    location\n    avatar\n    resumeUrl\n    availability\n  }\n": types.AboutMeFieldsFragmentDoc,
    "\n  query AboutMe {\n    aboutMe {\n      ...AboutMeFields\n    }\n  }\n": types.AboutMeDocument,
    "\n  fragment AiUsageFields on AiUsage {\n    range {\n      from\n      to\n    }\n    totals {\n      requests\n      inputTokens\n      outputTokens\n      cacheWriteTokens\n      cacheReadTokens\n      tokens\n      estimatedCostUsd\n    }\n    models {\n      model\n      requests\n      inputTokens\n      outputTokens\n      cacheWriteTokens\n      cacheReadTokens\n      tokens\n      estimatedCostUsd\n    }\n    clients {\n      client\n      requests\n      tokens\n      percent\n    }\n    daily {\n      date\n      requests\n      tokens\n      estimatedCostUsd\n      hasUnpricedModels\n    }\n    unpricedModels\n  }\n": types.AiUsageFieldsFragmentDoc,
    "\n  query AiUsage($from: String, $to: String) {\n    aiUsage(from: $from, to: $to) {\n      ...AiUsageFields\n    }\n  }\n": types.AiUsageDocument,
    "\n  query Boot {\n    aboutMe {\n      ...AboutMeFields\n    }\n    educations {\n      ...EducationFields\n    }\n    experiences {\n      ...ExperienceFields\n    }\n    projects {\n      ...ProjectFields\n    }\n    contacts {\n      ...ContactFields\n    }\n    statistic {\n      ...StatisticFields\n    }\n    frontendVersions {\n      ...FrontendVersionsFields\n    }\n    aiUsage {\n      ...AiUsageFields\n    }\n  }\n": types.BootDocument,
    "\n  fragment ContactFields on Contact {\n    id\n    title\n    url\n  }\n": types.ContactFieldsFragmentDoc,
    "\n  query Contacts {\n    contacts {\n      ...ContactFields\n    }\n  }\n": types.ContactsDocument,
    "\n  fragment EducationFields on Education {\n    id\n    title\n    startDate\n    endDate\n    descriptions {\n      id\n      description\n    }\n  }\n": types.EducationFieldsFragmentDoc,
    "\n  query Educations {\n    educations {\n      ...EducationFields\n    }\n  }\n": types.EducationsDocument,
    "\n  fragment ExperienceFields on Experience {\n    id\n    company\n    role\n    startDate\n    endDate\n    responsibilities {\n      id\n      description\n    }\n  }\n": types.ExperienceFieldsFragmentDoc,
    "\n  query Experiences {\n    experiences {\n      ...ExperienceFields\n    }\n  }\n": types.ExperiencesDocument,
    "\n  fragment FrontendVersionsFields on FrontendVersionList {\n    totalViews\n    versions {\n      id\n      key\n      url\n      title\n      description\n      thumbnail\n      order\n      views\n    }\n  }\n": types.FrontendVersionsFieldsFragmentDoc,
    "\n  query FrontendVersions {\n    frontendVersions {\n      ...FrontendVersionsFields\n    }\n  }\n": types.FrontendVersionsDocument,
    "\n  fragment ProjectFields on Project {\n    id\n    title\n    description\n    preview\n    logo\n    status\n    order\n    tags {\n      id\n      tag\n    }\n    sources {\n      id\n      title\n      url\n    }\n  }\n": types.ProjectFieldsFragmentDoc,
    "\n  query Projects {\n    projects {\n      ...ProjectFields\n    }\n  }\n": types.ProjectsDocument,
    "\n  fragment StatisticFields on Statistic {\n    id\n    startDate\n    endDate\n    totalSeconds\n    humanReadable\n    languages {\n      id\n      language\n      totalSeconds\n      humanReadable\n      percent\n    }\n    operatingSystems {\n      id\n      os\n      totalSeconds\n      humanReadable\n      percent\n    }\n    contributions {\n      id\n      date\n      totalSeconds\n    }\n  }\n": types.StatisticFieldsFragmentDoc,
    "\n  query Statistic {\n    statistic {\n      ...StatisticFields\n    }\n  }\n": types.StatisticDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment AboutMeFields on AboutMe {\n    id\n    intro\n    bio\n    mission\n    displayName\n    handle\n    role\n    location\n    avatar\n    resumeUrl\n    availability\n  }\n"): typeof import('./graphql').AboutMeFieldsFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query AboutMe {\n    aboutMe {\n      ...AboutMeFields\n    }\n  }\n"): typeof import('./graphql').AboutMeDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment AiUsageFields on AiUsage {\n    range {\n      from\n      to\n    }\n    totals {\n      requests\n      inputTokens\n      outputTokens\n      cacheWriteTokens\n      cacheReadTokens\n      tokens\n      estimatedCostUsd\n    }\n    models {\n      model\n      requests\n      inputTokens\n      outputTokens\n      cacheWriteTokens\n      cacheReadTokens\n      tokens\n      estimatedCostUsd\n    }\n    clients {\n      client\n      requests\n      tokens\n      percent\n    }\n    daily {\n      date\n      requests\n      tokens\n      estimatedCostUsd\n      hasUnpricedModels\n    }\n    unpricedModels\n  }\n"): typeof import('./graphql').AiUsageFieldsFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query AiUsage($from: String, $to: String) {\n    aiUsage(from: $from, to: $to) {\n      ...AiUsageFields\n    }\n  }\n"): typeof import('./graphql').AiUsageDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Boot {\n    aboutMe {\n      ...AboutMeFields\n    }\n    educations {\n      ...EducationFields\n    }\n    experiences {\n      ...ExperienceFields\n    }\n    projects {\n      ...ProjectFields\n    }\n    contacts {\n      ...ContactFields\n    }\n    statistic {\n      ...StatisticFields\n    }\n    frontendVersions {\n      ...FrontendVersionsFields\n    }\n    aiUsage {\n      ...AiUsageFields\n    }\n  }\n"): typeof import('./graphql').BootDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment ContactFields on Contact {\n    id\n    title\n    url\n  }\n"): typeof import('./graphql').ContactFieldsFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Contacts {\n    contacts {\n      ...ContactFields\n    }\n  }\n"): typeof import('./graphql').ContactsDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment EducationFields on Education {\n    id\n    title\n    startDate\n    endDate\n    descriptions {\n      id\n      description\n    }\n  }\n"): typeof import('./graphql').EducationFieldsFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Educations {\n    educations {\n      ...EducationFields\n    }\n  }\n"): typeof import('./graphql').EducationsDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment ExperienceFields on Experience {\n    id\n    company\n    role\n    startDate\n    endDate\n    responsibilities {\n      id\n      description\n    }\n  }\n"): typeof import('./graphql').ExperienceFieldsFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Experiences {\n    experiences {\n      ...ExperienceFields\n    }\n  }\n"): typeof import('./graphql').ExperiencesDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment FrontendVersionsFields on FrontendVersionList {\n    totalViews\n    versions {\n      id\n      key\n      url\n      title\n      description\n      thumbnail\n      order\n      views\n    }\n  }\n"): typeof import('./graphql').FrontendVersionsFieldsFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query FrontendVersions {\n    frontendVersions {\n      ...FrontendVersionsFields\n    }\n  }\n"): typeof import('./graphql').FrontendVersionsDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment ProjectFields on Project {\n    id\n    title\n    description\n    preview\n    logo\n    status\n    order\n    tags {\n      id\n      tag\n    }\n    sources {\n      id\n      title\n      url\n    }\n  }\n"): typeof import('./graphql').ProjectFieldsFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Projects {\n    projects {\n      ...ProjectFields\n    }\n  }\n"): typeof import('./graphql').ProjectsDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment StatisticFields on Statistic {\n    id\n    startDate\n    endDate\n    totalSeconds\n    humanReadable\n    languages {\n      id\n      language\n      totalSeconds\n      humanReadable\n      percent\n    }\n    operatingSystems {\n      id\n      os\n      totalSeconds\n      humanReadable\n      percent\n    }\n    contributions {\n      id\n      date\n      totalSeconds\n    }\n  }\n"): typeof import('./graphql').StatisticFieldsFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Statistic {\n    statistic {\n      ...StatisticFields\n    }\n  }\n"): typeof import('./graphql').StatisticDocument;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

import { graphql } from "@/lib/graphql/generated";

export const StatisticFields = graphql(`
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
`);

export const StatisticDocument = graphql(`
  query Statistic {
    statistic {
      ...StatisticFields
    }
  }
`);

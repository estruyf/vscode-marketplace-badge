export interface ExtensionResults {
  results: Result[];
}

export interface Result {
  extensions: Extension[];
  pagingToken?: any;
  resultMetadata: ResultMetadatum[];
}

export interface ResultMetadatum {
  metadataType: string;
  metadataItems: MetadataItem[];
}

export interface MetadataItem {
  name: string;
  count: number;
}

export interface Extension {
  publisher: Publisher;
  extensionId: string;
  extensionName: string;
  displayName: string;
  flags: string;
  lastUpdated: string;
  publishedDate: string;
  releaseDate: string;
  shortDescription: string;
  versions: Version[];
  categories: string[];
  tags: string[];
  statistics: Statistic[];
  installationTargets: InstallationTarget[];
  deploymentType: number;
}

export interface InstallationTarget {
  target: string;
  targetVersion: string;
}

export interface Statistic {
  statisticName: string;
  value: number;
}

export interface Version {
  version: string;
  flags: string;
  lastUpdated: string;
  files: File[];
  assetUri: string;
  fallbackAssetUri: string;
}

export interface File {
  assetType: string;
  source: string;
}

export interface Publisher {
  publisherId: string;
  publisherName: string;
  displayName: string;
  flags: string;
  domain: string;
  isDomainVerified: boolean;
}

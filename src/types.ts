export interface Dict<T> {
  [key: string]: T;
}

export interface RepositoriesPage {
  totalCount: number;
  pageInfo: {
    hasNextPage: boolean;
    endCursor: string;
  };
  nodes: {
    owner: {
      login: string;
    };
    name: string;
  }[];
}

export interface RepositoriesPageResponse {
  user: {
    repositories: RepositoriesPage;
  };
}

export interface BranchesPageResponse {
  repository: {
    refs: BranchesPage;
  };
}

export interface BranchesPage {
  totalCount: number;
  pageInfo: {
    hasNextPage: boolean;
    endCursor: string;
  };
  nodes: {
    name: string;
  }[];
}

export interface ViewerResponse {
  viewer: Viewer;
}

export interface Viewer {
  id: string;
  login: string;
}

export interface Repository {
  owner: string;
  name: string;
  branches: string[];
}


export class Organization {
    login: string;
    id: number;
    node_id: string;
    url: string;
    repos_url: string;
    events_url: string;
    hooks_url: string;
    issues_url: string;
    members_url: string;
    public_members_url: string;
    avatar_url: string;
    description: string;
    name: string;
    company: string;
    blog: string;
    location: string;
    email: string;
    twitter_username: string;
    is_verified: boolean;
    has_organization_projects: boolean;
    has_repository_projects: boolean;
    public_repos: number;
    public_gists: number;
    followers: number;
    following: number;
    html_url: string;
    created_at: Date;
    updated_at: Date;
    type: string;
}

export class SearchCriteria {

    constructor() {
        this.q = '';
        this.search = '';
        this.type = 'public';
        this.sort = 'updated';
        this.direction = 'desc';
        this.language = '';
        this.page = 1;
        this.per_page = 30;
    }

    public q: string;
    public search: string;
    public type: string;
    public sort: string;
    public direction: string;
    public page: number;
    public language: string;
    public per_page: number;
}

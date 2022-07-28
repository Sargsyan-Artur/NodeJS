// export type Permissions = 'READ' | 'WRITE' | 'DELETE' | 'SHARE' | 'UPLOAD_FILES';

export enum Permissions {
    READ = 'READ',
    WRITE = 'WRITE' ,
    DELETE = 'DELETE' ,
    SHARE = 'SHARE' ,
    UPLOAD_FILES = 'UPLOAD_FILES'
}

export type TGroup = {
    id: string;
    name: string;
    permissions: Array<Permissions>;
};

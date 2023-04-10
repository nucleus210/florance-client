
export default class Storage{
    constructor(resourceId: number, fileName: string, fileUrl:string, size:number) {
        this.resourceId = resourceId;
        this.fileName = fileName;
        this.fileUrl = fileUrl;
        this.size = size;
    }
    resourceId: number;
    fileName: string;
    fileUrl: string;
    size: number;
}

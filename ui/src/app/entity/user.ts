export class User {
    id: number
    username: string

    static fromObject(data: Object): User {
        let u = new User();
        for (var key in data) {
            u[key] = data[key];
        }
        return u 
    }
}
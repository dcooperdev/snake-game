import jwt_decode from "jwt-decode";

class Session {
    constructor(session) {
        this.token = session.token;
        this.name = this.getName();
        this.role = this.getRole();
    }

    getName() {
        const { name } = jwt_decode(this.token);
        return name;
    }

    getRole() {
        const { role } = jwt_decode(this.token);
        return role;
    }

    getData() {
        const data = jwt_decode(this.token);
        return data;
    }
}

export default Session;

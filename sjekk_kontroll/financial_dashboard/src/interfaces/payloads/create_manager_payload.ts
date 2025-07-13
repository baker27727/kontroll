interface CreateManagerPayload {
    name: string;
    username: string;
    linked_email: string;
    password: string;
    role: string;
    authorizations: string[];
}

export default CreateManagerPayload
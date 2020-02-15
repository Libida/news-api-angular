export class User {
  user: {
    email?: string,
    _id?: string,
    local?: {
      email: string,
      password?: string
    }
  };
  errorMessages?: string[];
  successMessages?: string[];
}
